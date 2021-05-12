# get-graphql-from-jsonschema

get-graphql-from-jsonschema gets a GraphQL schema from a JSON schema.

## Status

| Category         | Status                                                                                                                        |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Version          | [![npm](https://img.shields.io/npm/v/get-graphql-from-jsonschema)](https://www.npmjs.com/package/get-graphql-from-jsonschema) |
| Dependencies     | ![David](https://img.shields.io/david/thenativeweb/get-graphql-from-jsonschema)                                               |
| Dev dependencies | ![David](https://img.shields.io/david/dev/thenativeweb/get-graphql-from-jsonschema)                                           |
| Build            | ![GitHub Actions](https://github.com/thenativeweb/get-graphql-from-jsonschema/workflows/Release/badge.svg?branch=main)      |
| License          | ![GitHub](https://img.shields.io/github/license/thenativeweb/get-graphql-from-jsonschema)                                     |

## Installation

```shell
$ npm install get-graphql-from-jsonschema
```

## Quick Start

First you need to add a reference to get-graphql-from-jsonschema to your application:

```typescript
import { getGraphqlFromJsonSchema } from 'get-graphql-from-jsonschema';
```

To get a GraphQL schema from a JSON schema, call the `getGraphqlFromJsonSchema` function and hand over the root name of the schema you want to convert as well as the schema itself. As a result, you get back the root GraphQL type name and, if needed, additional GraphQL type definitions:

### ⚠️ Disclaimer ⚠️

It is discouraged to use this library without TypeScript. Not the entire json-schema specification can be
translated to graphql and that is why we only support [a really specific subset of json-schema](#knowing-the-limitations).
This subset is enforced at compile time using typescript types and not at run time using checks. This means using
unsupported parts of json-schema can lead to silent misbehaviour in javascript. 

### Example

```typescript
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

console.log(typeName);
// => PersonT0

console.log(typeDefinitions);
// => [
//      'type PersonT0CoordinatesT0 {
//        latitude: Float!
//        longitude: Float!
//      }',
//      'type PersonT0TagsT0T0 {
//        key: String!
//        value: String!
//      }',
//      'type PersonT0 {
//        firstName: String!
//        lastName: String
//        coordinates: PersonT0CoordinatesT0
//        tags: [PersonT0TagsT0T0]!
//      }'
//    ]
```

The `T0` suffixes are due to enumerating the types in each schema. If a schema has multiple types, they are noted with increasing indexes, to differentiate them in resulting union types. This also happens with `oneOf` or `anyOf` constructs.

If you want to use the generated types as input types for a mutation, additionally provide the `direction` option to the call to `getGraphqlFromJsonSchema` and set its value to `input`:

```typescript
const { typeName, typeDefinitions } = getGraphqlFromJsonSchema({
  rootName: 'person',
  schema: {
    // ...
  },
  direction: 'input'
});
```

### Using `oneOf` or `anyOf` to generate union types

The `oneOf` and `anyOf` keywords are supported with a limitation on their usage: There must be no other properties on the same level as either of them.

```typescript
const { typeName, typeDefinitions } = getGraphqlFromJsonSchema({
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

console.log(typeName);
// => Foobar

console.log(typeDefinitions);
// => [
//     'type FoobarI1T0 {
//       foo: String!
//       bar: Float
//     }',
//     'union Foobar = Float | FoobarI1T0'
// ]
```

### Knowing the limitations

Unfortunately, it is not possible to map every aspect of a JSON schema to a GraphQL schema. When using `getGraphqlFromJsonSchema`, the following limitations apply:

- The `null` type is not allowed as there is no type comparable to `null` in GraphQL.
- The keyword `allOf` is not allowed, because it is not possible to construct a GraphQl type that correctly catches the constraints of `allOf` in all cases.
- The keywords `if`, `then`, `else` and `format` are not allowed as well.
- The `patternProperties`, `maxProperties`, `minProperties`, `dependencies` and `propertyNames` fields are not allowed. The `additionalProperties` field must be set to `false` because GraphQL demands precisely defined types.
- Even though the `$ref` and `definitions` properties might be able to be implemented in GraphQl they are currently **NOT** supported.
- Most of the json-schema fields cannot be mapped to GraphQL in the sense that is still possible to store values that do not match the json schema. You will still need to validate the values using this schema before interacting with GraphQL. It just means that any value that matches this schema will fit the generated GraphQL type.

## Running quality assurance

To run quality assurance for this module use [roboter](https://www.npmjs.com/package/roboter):

```shell
$ npx roboter
```
