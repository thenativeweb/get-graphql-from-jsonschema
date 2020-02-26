# get-graphql-from-jsonschema

get-graphql-from-jsonschema gets a GraphQL schema from a JSON schema.

## Status

| Category         | Status                                                                                                                        |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Version          | [![npm](https://img.shields.io/npm/v/get-graphql-from-jsonschema)](https://www.npmjs.com/package/get-graphql-from-jsonschema) |
| Dependencies     | ![David](https://img.shields.io/david/thenativeweb/get-graphql-from-jsonschema)                                               |
| Dev dependencies | ![David](https://img.shields.io/david/dev/thenativeweb/get-graphql-from-jsonschema)                                           |
| Build            | ![GitHub Actions](https://github.com/thenativeweb/get-graphql-from-jsonschema/workflows/Release/badge.svg?branch=master)      |
| License          | ![GitHub](https://img.shields.io/github/license/thenativeweb/get-graphql-from-jsonschema)                                     |

## Installation

```shell
$ npm install get-graphql-from-jsonschema
```

## Quick Start

First you need to add a reference to get-graphql-from-jsonschema to your application:

```javascript
const { getGraphqlFromJsonSchema } = require('get-graphql-from-jsonschema');
```

If you use TypeScript, use the following code instead:

```typescript
import { getGraphqlFromJsonSchema } from 'get-graphql-from-jsonschema';
```

To get a GraphQL schema from a JSON schema, call the `getGraphqlFromJsonSchema` function and hand over the root name of the schema you want to convert as well as the schema itself. As a result, you get back the root GraphQL type name and, if needed, additional GraphQL type definitions:

```javascript
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

The `T0` suffixes are due to enumerating the types in each schema. If a schema has multiple types, they are noted with increasing indexes, to differentiate them in resulting union types. This also happens with `anyOf` constructs.

If you want to use the generated types as input types for a mutation, additionally provide the `direction` option to the call to `getGraphqlFromJsonSchema` and set its value to `input`:

```javascript
const { typeName, typeDefinitions } = getGraphqlFromJsonSchema({
  rootName: 'person',
  schema: {
    // ...
  },
  direction: 'input'
});
```

### Knowing the limitations

Unfortunately, it is not possible to map every aspect of a JSON schema to a GraphQL schema. When using `getGraphqlFromJsonSchema`, the following limitations apply:

- The `null` type gets ignored, since it can not be mapped to GraphQL directly.
- The keywords `allOf` and `oneOf` get ignored, since their logic can not be mapped to GraphQL. However, the `anyOf` keyword is supported.

## Running the build

To build this module use [roboter](https://www.npmjs.com/package/roboter).

```shell
$ npx roboter
```
