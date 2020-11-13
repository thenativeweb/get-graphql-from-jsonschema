import { Direction } from './Direction';
import { errors } from './errors';
import { JSONSchema7 } from 'json-schema';
import { parseSchema } from './parseSchema';
import { toBreadcrumb } from './toBreadcrumb';

const parseOneOf = function ({ path, schema, direction }: {
  path: string[];
  schema: JSONSchema7;
  direction: Direction;
}): { typeName: string; typeDefinitions: string[] } {
  if (!schema.oneOf) {
    throw new errors.SchemaInvalid(`Property 'oneOf' at '${toBreadcrumb(path)}' is missing.`);
  }
  if (!Array.isArray(schema.oneOf)) {
    throw new errors.SchemaInvalid(`Property 'oneOf' at '${toBreadcrumb(path)}' should be an array.`);
  }

  const graphqlTypeDefinitions: string[] = [],
        graphqlTypeNames: string[] = [];

  schema.oneOf.forEach((subSchema, index): void => {
    const result = parseSchema({ schema: subSchema as JSONSchema7, direction, path: [ ...path, `I${index}` ]});

    graphqlTypeNames.push(result.typeName);
    graphqlTypeDefinitions.push(...result.typeDefinitions);
  });

  const graphqlTypeName = graphqlTypeNames.
    filter((name): boolean => name.trim() !== '').
    join(' | ');

  return {
    typeName: graphqlTypeName,
    typeDefinitions: graphqlTypeDefinitions
  };
};

export { parseOneOf };
