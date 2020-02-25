import { Direction } from './Direction';
import { errors } from './errors';
import { JSONSchema4 } from 'json-schema';
import { parseSchema } from './parseSchema';
import { toBreadcrumb } from './toBreadcrumb';

const parseAnyOf = function ({ path, schema, direction }: {
  path: string[];
  schema: JSONSchema4;
  direction: Direction;
}): { typeName: string; typeDefinitions: string[] } {
  if (!schema.anyOf) {
    throw new errors.SchemaInvalid(`Property 'anyOf' at '${toBreadcrumb(path)}' is missing.`);
  }
  if (!Array.isArray(schema.anyOf)) {
    throw new errors.SchemaInvalid(`Property 'anyOf' at '${toBreadcrumb(path)}' should be an array.`);
  }

  const graphqlTypeDefinitions: string[] = [],
        graphqlTypeNames: string[] = [];

  schema.anyOf.forEach((subSchema, index): void => {
    const result = parseSchema({ schema: subSchema, direction, path: [ ...path, `I${index}` ]});

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

export { parseAnyOf };
