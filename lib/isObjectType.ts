const isObjectType = function ({ type }: {
  type: string;
}): boolean {
  return type === 'object';
};

export { isObjectType };
