# get-graphql-from-jsonschema

get-graphql-from-jsonschema gets a GraphQL schema from a JSON schema.

## Status

| Category         | Status                                                                                                                                                                             |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Version          | [![npm](https://img.shields.io/npm/v/get-graphql-from-jsonschema)](https://www.npmjs.com/package/get-graphql-from-jsonschema)                                                      |
| Dependencies     | ![David](https://img.shields.io/david/thenativeweb/get-graphql-from-jsonschema)                                                                                                    |
| Dev dependencies | ![David](https://img.shields.io/david/dev/thenativeweb/get-graphql-from-jsonschema)                                                                                                |
| Build            | [![CircleCI](https://img.shields.io/circleci/build/github/thenativeweb/get-graphql-from-jsonschema)](https://circleci.com/gh/thenativeweb/get-graphql-from-jsonschema/tree/master) |
| License          | ![GitHub](https://img.shields.io/github/license/thenativeweb/get-graphql-from-jsonschema)                                                                                          |

## Installation

```shell
$ npm install get-graphql-from-jsonschema
```

## Quick Start

First you need to add a reference to get-graphql-from-jsonschema to your application:

```javascript
const getGraphqlFromJsonSchema = require('get-graphql-from-jsonschema').default;
```

If you use TypeScript, use the following code instead:

```typescript
import getGraphqlFromJsonSchema from 'get-graphql-from-jsonschema';
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
// => Person

console.log(typeDefinitions);
// => [
//      'type PersonCoordinates {
//        latitude: Float!
//        longitude: Float!
//      }',
//      'type PersonTags {
//        key: String!
//        value: String!
//      }',
//      'type Person {
//        firstName: String!
//        lastName: String
//        coordinates: PersonCoordinates
//        tags: [PersonTags]!
//      }'
//    ]
```

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

## Running the build

To build this module use [roboter](https://www.npmjs.com/package/roboter).

```shell
$ npx roboter
```
