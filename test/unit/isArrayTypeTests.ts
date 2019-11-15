import { assert } from 'assertthat';
import { isArrayType } from '../../lib/isArrayType';

suite('isArrayType', (): void => {
  test(`returns true if array is given.`, async (): Promise<void> => {
    assert.that(isArrayType({ type: 'array' })).is.true();
  });

  [ 'boolean', 'integer', 'number', 'object', 'string' ].forEach((type): void => {
    test(`returns false if ${type} is given.`, async (): Promise<void> => {
      assert.that(isArrayType({ type })).is.false();
    });
  });
});
