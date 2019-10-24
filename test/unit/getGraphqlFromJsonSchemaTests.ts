import assert from 'assertthat';
import getGraphqlFromJsonSchema from '../../lib/getGraphqlFromJsonSchema';
import { stripIndent } from 'common-tags';

suite('getGraphqlFromJsonSchema', (): void => {
  suite('schemas for scalar types', (): void => {
    test('returns the GraphQL type name.', async (): Promise<void> => {
      const { typeName, typeDefinitions } = getGraphqlFromJsonSchema({
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
      const { typeName, typeDefinitions } = getGraphqlFromJsonSchema({
        rootName: 'temperature',
        schema: {
          type: [ 'number', 'integer' ],
          minimum: -273,
          maximum: Number.POSITIVE_INFINITY
        }
      });

      assert.that(typeName).is.equalTo('Float | Int');
      assert.that(typeDefinitions).is.equalTo([]);
    });
  });

  suite('schemas for array types', (): void => {
    test('returns the GraphQL type name.', async (): Promise<void> => {
      const { typeName, typeDefinitions } = getGraphqlFromJsonSchema({
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
      const { typeName, typeDefinitions } = getGraphqlFromJsonSchema({
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

      assert.that(typeName).is.equalTo('[Float | Int]');
      assert.that(typeDefinitions).is.equalTo([]);
    });

    test('returns the GraphQL type name for an outer union type.', async (): Promise<void> => {
      const { typeName, typeDefinitions } = getGraphqlFromJsonSchema({
        rootName: 'temperatures',
        schema: {
          type: [ 'number', 'integer', 'array' ],
          minimum: -273,
          maximum: Number.POSITIVE_INFINITY,
          items: {
            type: [ 'number', 'integer' ],
            minimum: -273,
            maximum: Number.POSITIVE_INFINITY
          }
        }
      });

      assert.that(typeName).is.equalTo('Float | Int | [Float | Int]');
      assert.that(typeDefinitions).is.equalTo([]);
    });
  });

  suite('schemas for object types', (): void => {
    test('returns the GraphQL type name and type definitions.', async (): Promise<void> => {
      const { typeName, typeDefinitions } = getGraphqlFromJsonSchema({
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

      assert.that(typeName).is.equalTo('Person');
      assert.that(typeDefinitions).is.equalTo([
        stripIndent`
          type Person {
            firstName: String!
            lastName: String
          }`
      ]);
    });

    test('returns the GraphQL type name and type definitions for complex types.', async (): Promise<void> => {
      const { typeName, typeDefinitions } = getGraphqlFromJsonSchema({
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

      assert.that(typeName).is.equalTo('Person');
      assert.that(typeDefinitions).is.equalTo([
        stripIndent`
          type PersonCoordinates {
            latitude: Float!
            longitude: Float!
          }`,
        stripIndent`
          type PersonTags {
            key: String!
            value: String!
          }`,
        stripIndent`
          type Person {
            firstName: String!
            lastName: String
            coordinates: PersonCoordinates
            tags: [PersonTags]!
          }`
      ]);
    });

    test('returns the GraphQL input type name and input type definitions for input types.', async (): Promise<void> => {
      const { typeName, typeDefinitions } = getGraphqlFromJsonSchema({
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

      assert.that(typeName).is.equalTo('Person');
      assert.that(typeDefinitions).is.equalTo([
        stripIndent`
          input PersonCoordinates {
            latitude: Float!
            longitude: Float!
          }`,
        stripIndent`
          input PersonTags {
            key: String!
            value: String!
          }`,
        stripIndent`
          input Person {
            firstName: String!
            lastName: String
            coordinates: PersonCoordinates
            tags: [PersonTags]!
          }`
      ]);
    });
  });

  test('throws an error if the type in a schema is missing.', async (): Promise<void> => {
    assert.that((): void => {
      getGraphqlFromJsonSchema({
        rootName: 'temperature',
        schema: {}
      });
    }).is.throwing(`Property 'type' at 'temperature' is missing.`);
  });

  test('throws an error if an invalid type is used.', async (): Promise<void> => {
    assert.that((): void => {
      getGraphqlFromJsonSchema({
        rootName: 'temperature',
        schema: {
          type: 'null'
        }
      });
    }).is.throwing(`Type 'null' at 'temperature' is invalid.`);
  });

  test('throws an error if items is missing on an array.', async (): Promise<void> => {
    assert.that((): void => {
      getGraphqlFromJsonSchema({
        rootName: 'temperatures',
        schema: {
          type: 'array'
        }
      });
    }).is.throwing(`Property 'items' at 'temperatures' is missing.`);
  });

  test('throws an error if items is an array.', async (): Promise<void> => {
    assert.that((): void => {
      getGraphqlFromJsonSchema({
        rootName: 'temperatures',
        schema: {
          type: 'array',
          items: [
            { type: 'number' }
          ]
        }
      });
    }).is.throwing(`Property 'items' at 'temperatures' must not be an array.`);
  });

  test('throws an error if properties are missing on an object.', async (): Promise<void> => {
    assert.that((): void => {
      getGraphqlFromJsonSchema({
        rootName: 'person',
        schema: {
          type: 'object'
        }
      });
    }).is.throwing(`Property 'properties' at 'person' is missing.`);
  });

  test('throws an error if additionalProperties is set to true.', async (): Promise<void> => {
    assert.that((): void => {
      getGraphqlFromJsonSchema({
        rootName: 'person',
        schema: {
          type: 'object',
          properties: {
            firstName: { type: 'string' },
            lastName: { type: 'string' }
          },
          required: [ 'firstName' ],
          additionalProperties: true
        }
      });
    }).is.throwing(`Property 'additionalProperties' at 'person' must not be true.`);
  });
});
