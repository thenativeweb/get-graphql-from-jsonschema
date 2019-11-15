import { Direction } from './Direction';
import { JSONSchema4 } from 'json-schema';
import { parseSchema } from './parseSchema';

const getGraphqlFromJsonSchema = function ({ rootName, schema, direction = 'output' }: {
  rootName: string;
  schema: JSONSchema4;
  direction?: Direction;
}): { typeName: string; typeDefinitions: string[] } {
  return parseSchema({ path: [ rootName ], schema, direction });
};

export { getGraphqlFromJsonSchema };
