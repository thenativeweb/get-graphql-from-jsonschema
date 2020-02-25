import { Direction } from './Direction';
import { errors } from './errors';
import { JSONSchema4 } from 'json-schema';
import { parseAnyOf } from './parseAnyOf';
import { parseType } from './parseType';
import { toBreadcrumb } from './toBreadcrumb';

const parseSchema = function ({ path, schema, direction }: {
  path: string[];
  schema: JSONSchema4;
  direction: Direction;
}): { typeName: string; typeDefinitions: string[] } {
  if (schema.type) {
    return parseType({ path, schema, direction });
  }
  if (schema.anyOf) {
    return parseAnyOf({ path, schema, direction });
  }
  throw new errors.SchemaInvalid(`Structure at '${toBreadcrumb(path)}' not recognized.`);
};

export { parseSchema };
