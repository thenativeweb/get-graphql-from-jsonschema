import { scalarTypes } from './scalarTypes';

const isScalarType = function ({ type }: {
  type: string;
}): boolean {
  return Boolean(scalarTypes[type]);
};

export { isScalarType };
