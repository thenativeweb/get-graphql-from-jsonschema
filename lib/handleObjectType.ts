import { Direction } from './Direction';
import { errors } from './errors';
import { JSONSchema4 } from 'json-schema';
import { parseSchema } from './parseSchema';
import { toBreadcrumb } from './toBreadcrumb';
import { toPascalCase } from './toPascalCase';

const handleObjectType = function ({ path, schema, direction }: {
  path: string[];
  schema: JSONSchema4;
  direction: Direction;
}): { typeName: string; typeDefinitions: string[] } {
  if (!schema.properties) {
    throw new errors.SchemaInvalid(`Property 'properties' at '${toBreadcrumb(path)}' is missing.`);
  }
  if (schema.additionalProperties) {
    throw new errors.SchemaInvalid(`Property 'additionalProperties' at '${toBreadcrumb(path)}' must not be true.`);
  }

  const graphqlTypeName = toPascalCase(path);
  const graphqlTypeDefinitions: string[] = [];

  let currentGraphqlTypeDefinition = '';

  if (direction === 'input') {
    currentGraphqlTypeDefinition += 'input';
  } else {
    currentGraphqlTypeDefinition += 'type';
  }

  currentGraphqlTypeDefinition += ` ${graphqlTypeName} {\n`;

  for (const [ propertyName, propertySchema ] of Object.entries(schema.properties)) {
    const isRequired = (
      schema.required && schema.required.includes(propertyName)
    ) || false;

    const {
      typeName: propertyGraphqlTypeName,
      typeDefinitions: propertyGraphqlTypeDefinitions
    } = parseSchema({
      path: [ ...path, propertyName ],
      schema: propertySchema,
      direction
    });

    currentGraphqlTypeDefinition += `  ${propertyName}: ${propertyGraphqlTypeName}`;

    if (isRequired) {
      currentGraphqlTypeDefinition += '!\n';
    } else {
      currentGraphqlTypeDefinition += '\n';
    }

    graphqlTypeDefinitions.push(...propertyGraphqlTypeDefinitions);
  }

  currentGraphqlTypeDefinition += '}';

  graphqlTypeDefinitions.push(currentGraphqlTypeDefinition);

  return {
    typeName: graphqlTypeName,
    typeDefinitions: graphqlTypeDefinitions
  };
};

export { handleObjectType };
