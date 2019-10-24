import { Direction } from './Direction';
import errors from './errors';
import handleArrayType from './handleArrayType';
import handleObjectType from './handleObjectType';
import handleScalarType from './handleScalarType';
import isArrayType from './isArrayType';
import isObjectType from './isObjectType';
import isScalarType from './isScalarType';
import { JSONSchema4 } from 'json-schema';
import toBreadcrumb from './toBreadcrumb';

const parseSchema = function ({ path, schema, direction }: {
  path: string[];
  schema: JSONSchema4;
  direction: Direction;
}): { typeName: string; typeDefinitions: string[] } {
  if (!schema.type) {
    throw new errors.SchemaInvalid(`Property 'type' at '${toBreadcrumb(path)}' is missing.`);
  }

  const jsonTypes: string[] = [ schema.type ].flat();

  const graphqlTypeNames: string[] = [];
  const graphqlTypeDefinitions: string[] = [];

  for (const jsonType of jsonTypes) {
    let result;

    if (isScalarType({ type: jsonType })) {
      result = handleScalarType({ type: jsonType });
    } else if (isArrayType({ type: jsonType })) {
      result = handleArrayType({ path, schema, direction });
    } else if (isObjectType({ type: jsonType })) {
      result = handleObjectType({ path, schema, direction });
    } else {
      throw new errors.TypeInvalid(`Type '${jsonType}' at '${path}' is invalid.`);
    }

    graphqlTypeNames.push(result.typeName);
    graphqlTypeDefinitions.push(...result.typeDefinitions);
  }

  const graphqlTypeName = graphqlTypeNames.join(' | ');

  return {
    typeName: graphqlTypeName,
    typeDefinitions: graphqlTypeDefinitions
  };
};

export default parseSchema;
