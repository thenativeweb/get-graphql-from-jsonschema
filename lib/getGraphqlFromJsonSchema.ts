import { Direction } from './Direction';
import { JSONSchema4 } from 'json-schema';
import parseSchema from './parseSchema';

const getGraphqlFromJsonSchema = function ({ name, schema, direction = 'output' }: {
  name: string;
  schema: JSONSchema4;
  direction?: Direction;
}): { typeName: string; typeDefinitions: string[] } {
  return parseSchema({ name, schema, direction });
};

export default getGraphqlFromJsonSchema;
