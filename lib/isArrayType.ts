const isArrayType = function ({ type }: {
  type: string;
}): boolean {
  return type === 'array';
};

export default isArrayType;
