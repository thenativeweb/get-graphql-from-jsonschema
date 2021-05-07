import { assert } from 'assertthat';
import { getGraphqlSchemaFromJsonSchema } from '../../lib';
import { stripIndent } from 'common-tags';

suite('getGraphqlSchemaFromJsonSchema', (): void => {
  suite('schemas for scalar types', (): void => {
    test('returns the GraphQL type name.', async (): Promise<void> => {
      const { typeName, typeDefinitions } = getGraphqlSchemaFromJsonSchema({
        rootName: 'temperature',
        schema: {
          type: 'number',
          minimum: -273,
          maximum: Number.POSITIVE_INFINITY
        }
      });

      assert.that(typeName).is.equalTo('Float');
      assert.that(typeDefinitions).is.equalTo([]);
    });

    test('returns the GraphQL type name for a union type.', async (): Promise<void> => {
      const { typeName, typeDefinitions } = getGraphqlSchemaFromJsonSchema({
        rootName: 'temperature',
        schema: {
          type: [ 'number', 'integer' ],
          minimum: -273,
          maximum: Number.POSITIVE_INFINITY
        }
      });

      assert.that(typeName).is.equalTo('Temperature');
      assert.that(typeDefinitions).is.equalTo([
        stripIndent`
          union Temperature = Float | Int
        `
      ]);
    });
  });

  suite('schemas for array types', (): void => {
    test('returns the GraphQL type name.', async (): Promise<void> => {
      const { typeName, typeDefinitions } = getGraphqlSchemaFromJsonSchema({
        rootName: 'temperatures',
        schema: {
          type: 'array',
          items: {
            type: 'number',
            minimum: -273,
            maximum: Number.POSITIVE_INFINITY
          }
        }
      });

      assert.that(typeName).is.equalTo('[Float]');
      assert.that(typeDefinitions).is.equalTo([]);
    });

    test('returns the GraphQL type name for a union type.', async (): Promise<void> => {
      const { typeName, typeDefinitions } = getGraphqlSchemaFromJsonSchema({
        rootName: 'temperatures',
        schema: {
          type: 'array',
          items: {
            type: [ 'number', 'integer' ],
            minimum: -273,
            maximum: Number.POSITIVE_INFINITY
          }
        }
      });

      assert.that(typeName).is.equalTo('[TemperaturesT0]');
      assert.that(typeDefinitions).is.equalTo([
        stripIndent`
          union TemperaturesT0 = Float | Int
        `
      ]);
    });

    test('returns the GraphQL type name for an outer union type.', async (): Promise<void> => {
      const { typeName, typeDefinitions } = getGraphqlSchemaFromJsonSchema({
        rootName: 'temperatures',
        schema: {
          type: [ 'number', 'integer' ],
          minimum: -273,
          maximum: Number.POSITIVE_INFINITY
        }
      });

      assert.that(typeName).is.equalTo('Temperatures');
      assert.that(typeDefinitions).is.equalTo([
        stripIndent`
          union Temperatures = Float | Int
        `
      ]);
    });

    test('returns the GraphQL type name for an array containing objects.', async (): Promise<void> => {
      const { typeName, typeDefinitions } = getGraphqlSchemaFromJsonSchema({
        rootName: 'temperatures',
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              foo: { type: 'string' }
            },
            required: [ 'foo' ],
            additionalProperties: false
          }
        }
      });

      assert.that(typeName).is.equalTo('[TemperaturesT0T0]');
      assert.that(typeDefinitions).is.equalTo([
        'type TemperaturesT0T0 {\n  foo: String!\n}'
      ]);
    });
  });

  suite('schemas for object types', (): void => {
    test('returns the GraphQL type name and type definitions.', async (): Promise<void> => {
      const { typeName, typeDefinitions } = getGraphqlSchemaFromJsonSchema({
        rootName: 'person',
        schema: {
          type: 'object',
          properties: {
            firstName: { type: 'string' },
            lastName: { type: 'string' }
          },
          required: [ 'firstName' ],
          additionalProperties: false
        }
      });

      assert.that(typeName).is.equalTo('PersonT0');
      assert.that(typeDefinitions).is.equalTo([
        stripIndent`
          type PersonT0 {
            firstName: String!
            lastName: String
          }`
      ]);
    });

    test('returns the GraphQL type name and type definitions for complex types.', async (): Promise<void> => {
      const { typeName, typeDefinitions } = getGraphqlSchemaFromJsonSchema({
        rootName: 'person',
        schema: {
          type: 'object',
          properties: {
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            coordinates: {
              type: 'object',
              properties: {
                latitude: { type: 'number' },
                longitude: { type: 'number' }
              },
              required: [ 'latitude', 'longitude' ],
              additionalProperties: false
            },
            tags: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  key: { type: 'string' },
                  value: { type: 'string' }
                },
                required: [ 'key', 'value' ],
                additionalProperties: false
              }
            }
          },
          required: [ 'firstName', 'tags' ],
          additionalProperties: false
        }
      });

      assert.that(typeName).is.equalTo('PersonT0');
      assert.that(typeDefinitions).is.equalTo([
        stripIndent`
          type PersonT0CoordinatesT0 {
            latitude: Float!
            longitude: Float!
          }`,
        stripIndent`
          type PersonT0TagsT0T0 {
            key: String!
            value: String!
          }`,
        stripIndent`
          type PersonT0 {
            firstName: String!
            lastName: String
            coordinates: PersonT0CoordinatesT0
            tags: [PersonT0TagsT0T0]!
          }`
      ]);
    });

    test('returns the GraphQL input type name and input type definitions for input types.', async (): Promise<void> => {
      const { typeName, typeDefinitions } = getGraphqlSchemaFromJsonSchema({
        rootName: 'person',
        schema: {
          type: 'object',
          properties: {
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            coordinates: {
              type: 'object',
              properties: {
                latitude: { type: 'number' },
                longitude: { type: 'number' }
              },
              required: [ 'latitude', 'longitude' ],
              additionalProperties: false
            },
            tags: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  key: { type: 'string' },
                  value: { type: 'string' }
                },
                required: [ 'key', 'value' ],
                additionalProperties: false
              }
            }
          },
          required: [ 'firstName', 'tags' ],
          additionalProperties: false
        },
        direction: 'input'
      });

      assert.that(typeName).is.equalTo('PersonT0');
      assert.that(typeDefinitions).is.equalTo([
        stripIndent`
          input PersonT0CoordinatesT0 {
            latitude: Float!
            longitude: Float!
          }`,
        stripIndent`
          input PersonT0TagsT0T0 {
            key: String!
            value: String!
          }`,
        stripIndent`
          input PersonT0 {
            firstName: String!
            lastName: String
            coordinates: PersonT0CoordinatesT0
            tags: [PersonT0TagsT0T0]!
          }`
      ]);
    });

    test('returns the GraphQL type name and type definitions for empty types.', async (): Promise<void> => {
      const { typeName, typeDefinitions } = getGraphqlSchemaFromJsonSchema({
        rootName: 'foo',
        schema: {
          type: 'object',
          properties: {},
          additionalProperties: false
        }
      });

      assert.that(typeName).is.equalTo('FooT0');
      assert.that(typeDefinitions).is.equalTo([
        stripIndent`
          type FooT0
        `
      ]);
    });

    test('returns the GraphQL type name and type definitions for multiple types.', async (): Promise<void> => {
      const { typeName, typeDefinitions } = getGraphqlSchemaFromJsonSchema({
        rootName: 'person',
        schema: {
          type: [ 'string', 'integer' ]
        }
      });

      assert.that(typeName).is.equalTo('Person');
      assert.that(typeDefinitions).is.equalTo([
        stripIndent`
          union Person = String | Int
        `
      ]);
    });
  });

  suite('schemas with oneOf or anyOf', (): void => {
    test('returns a union type for oneOf types.', async (): Promise<void> => {
      const { typeName, typeDefinitions } = getGraphqlSchemaFromJsonSchema({
        rootName: 'foobar',
        schema: {
          oneOf: [
            {
              type: 'number'
            },
            {
              type: 'object',
              properties: {
                foo: { type: 'string' },
                bar: { type: 'number' }
              },
              required: [ 'foo' ],
              additionalProperties: false
            }
          ]
        }
      });

      assert.that(typeName).is.equalTo('Foobar');
      assert.that(typeDefinitions).is.equalTo([
        stripIndent`
          type FoobarI1T0 {
            foo: String!
            bar: Float
          }
        `,
        stripIndent`
          union Foobar = Float | FoobarI1T0
        `
      ]);
    });

    test('returns a union type for anyOf types.', async (): Promise<void> => {
      const { typeName, typeDefinitions } = getGraphqlSchemaFromJsonSchema({
        rootName: 'foobar',
        schema: {
          anyOf: [
            {
              type: 'number'
            },
            {
              type: 'object',
              properties: {
                foo: { type: 'string' },
                bar: { type: 'number' }
              },
              required: [ 'foo' ],
              additionalProperties: false
            }
          ]
        }
      });

      assert.that(typeName).is.equalTo('Foobar');
      assert.that(typeDefinitions).is.equalTo([
        stripIndent`
          type FoobarI1T0 {
            foo: String!
            bar: Float
          }
        `,
        stripIndent`
          union Foobar = Float | FoobarI1T0
        `
      ]);
    });
  });
});
