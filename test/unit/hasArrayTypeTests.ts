import { assert } from 'assertthat';
import { hasArrayType } from '../../lib/hasArrayType';
import { scalarTypeEnum } from '../../lib/Types/ScalarType';

suite('hasArrayType', (): void => {
  test(`returns true if array is given.`, async (): Promise<void> => {
    assert.that(hasArrayType({ type: 'array', items: { type: 'string' }})).is.true();
  });

  scalarTypeEnum.forEach((type): void => {
    test(`returns false if ${type} is given.`, async (): Promise<void> => {
      assert.that(hasArrayType({ type })).is.false();
    });
  });

  test(`returns false if object is given.`, async (): Promise<void> => {
    assert.that(hasArrayType({ type: 'object', properties: {}, additionalProperties: false })).is.false();
  });

  test(`returns false if multiple types are given.`, async (): Promise<void> => {
    assert.that(hasArrayType({ type: [ 'number', 'string' ]})).is.false();
  });
});
