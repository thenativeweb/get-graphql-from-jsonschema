import { Direction } from './Direction';
import errors from './errors';
import { JSONSchema4 } from 'json-schema';
import parseSchema from './parseSchema';

const handleArrayType = function ({ name, schema, direction }: {
  name: string;
  schema: JSONSchema4;
  direction: Direction;
}): { typeName: string; typeDefinitions: string[] } {
  if (!schema.items) {
    throw new errors.SchemaInvalid(`Property 'items' is missing.`);
  }
  if (Array.isArray(schema.items)) {
    throw new errors.SchemaInvalid(`Property 'items' must not be an array.`);
  }

  const {
    typeName: graphqlTypeName,
    typeDefinitions: graphqlTypeDefinitions
  } = parseSchema({ name, schema: schema.items, direction });

  return {
    typeName: `[${graphqlTypeName}]`,
    typeDefinitions: graphqlTypeDefinitions
  };
};

export default handleArrayType;
