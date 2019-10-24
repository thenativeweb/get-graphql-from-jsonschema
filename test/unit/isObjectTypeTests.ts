import assert from 'assertthat';
import isObjectType from '../../lib/isObjectType';

suite('isObjectType', (): void => {
  test(`returns true if object is given.`, async (): Promise<void> => {
    assert.that(isObjectType({ type: 'object' })).is.true();
  });

  [ 'array', 'boolean', 'integer', 'number', 'string' ].forEach((type): void => {
    test(`returns false if ${type} is given.`, async (): Promise<void> => {
      assert.that(isObjectType({ type })).is.false();
    });
  });
});
