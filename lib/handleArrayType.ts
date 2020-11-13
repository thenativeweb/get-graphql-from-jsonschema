import { Direction } from './Direction';
import { errors } from './errors';
import { JSONSchema7 } from 'json-schema';
import { parseSchema } from './parseSchema';
import { toBreadcrumb } from './toBreadcrumb';

const handleArrayType = function ({ path, schema, direction }: {
  path: string[];
  schema: JSONSchema7;
  direction: Direction;
}): { typeName: string; typeDefinitions: string[] } {
  if (!schema.items) {
    throw new errors.SchemaInvalid(`Property 'items' at '${toBreadcrumb(path)}' is missing.`);
  }
  if (Array.isArray(schema.items)) {
    throw new errors.SchemaInvalid(`Property 'items' at '${toBreadcrumb(path)}' must not be an array.`);
  }

  const {
    typeName: graphqlTypeName,
    typeDefinitions: graphqlTypeDefinitions
  } = parseSchema({ path, schema: schema.items as JSONSchema7, direction });

  return {
    typeName: `[${graphqlTypeName}]`,
    typeDefinitions: graphqlTypeDefinitions
  };
};

export { handleArrayType };
