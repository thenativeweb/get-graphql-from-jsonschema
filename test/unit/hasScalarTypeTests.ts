import { assert } from 'assertthat';
import { hasScalarType } from '../../lib/hasScalarType';
import { scalarTypeEnum } from '../../lib/Types/ScalarType';

suite('hasScalarType', (): void => {
  scalarTypeEnum.forEach((type): void => {
    test(`returns true if ${type} is given.`, async (): Promise<void> => {
      assert.that(hasScalarType({ type })).is.true();
    });
  });

  test(`returns true if multiple types are given.`, async (): Promise<void> => {
    assert.that(hasScalarType({ type: [ 'number', 'string' ]})).is.true();
  });

  test(`returns false if object is given.`, async (): Promise<void> => {
    assert.that(hasScalarType({ type: 'object', properties: {}, additionalProperties: false })).is.false();
  });

  test(`returns false if array is given.`, async (): Promise<void> => {
    assert.that(hasScalarType({ type: 'array', items: { type: 'string' }})).is.false();
  });
});
