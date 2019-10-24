import assert from 'assertthat';
import isScalarType from '../../lib/isScalarType';

suite('isScalarType', (): void => {
  [ 'boolean', 'integer', 'number', 'string' ].forEach((type): void => {
    test(`returns true if ${type} is given.`, async (): Promise<void> => {
      assert.that(isScalarType({ type })).is.true();
    });
  });

  [ 'array', 'object' ].forEach((type): void => {
    test(`returns false if ${type} is given.`, async (): Promise<void> => {
      assert.that(isScalarType({ type })).is.false();
    });
  });
});
