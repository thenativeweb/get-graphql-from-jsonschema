import { Direction } from './Direction';
import { errors } from './errors';
import { JSONSchema7 } from 'json-schema';
import { parseOneOf } from './parseOneOf';
import { parseType } from './parseType';
import { stripIndent } from 'common-tags';
import { toBreadcrumb } from './toBreadcrumb';
import { toPascalCase } from './toPascalCase';

const parseSchema = function ({ path, schema, direction }: {
  path: string[];
  schema: JSONSchema7;
  direction: Direction;
}): { typeName: string; typeDefinitions: string[] } {
  let result: { typeName: string; typeDefinitions: string[] };

  if (schema.type) {
    result = parseType({ path, schema, direction });
  } else if (schema.oneOf) {
    result = parseOneOf({ path, schema, direction });
  } else {
    throw new errors.SchemaInvalid(`Structure at '${toBreadcrumb(path)}' not recognized.`);
  }

  if (result.typeName.includes('|')) {
    const typeName = toPascalCase(path);

    result.typeDefinitions.push(stripIndent`
      union ${typeName} = ${result.typeName}
    `);
    result.typeName = typeName;
  }

  return result;
};

export { parseSchema };
