import { scalarTypes } from './scalarTypes';

const handleScalarType = function ({ type }: {
  type: string;
}): { typeName: string; typeDefinitions: string[] } {
  const graphqlTypeName = scalarTypes[type];
  const graphqlTypeDefinitions: string[] = [];

  return {
    typeName: graphqlTypeName,
    typeDefinitions: graphqlTypeDefinitions
  };
};

export { handleScalarType };
