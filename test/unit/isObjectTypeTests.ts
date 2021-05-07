import { assert } from 'assertthat';
import { hasObjectType } from '../../lib/hasObjectType';
import { scalarTypeEnum } from '../../lib/Types/ScalarType';

suite('isObjectType', (): void => {
  test(`returns true if object is given.`, async (): Promise<void> => {
    assert.that(hasObjectType({ type: 'object', properties: {}, additionalProperties: false })).is.true();
  });

  scalarTypeEnum.forEach((type): void => {
    test(`returns false if ${type} is given.`, async (): Promise<void> => {
      assert.that(hasObjectType({ type })).is.false();
    });
  });

  test(`returns false if array is given.`, async (): Promise<void> => {
    assert.that(hasObjectType({ type: 'array', items: { type: 'string' }})).is.false();
  });

  test(`returns false if multiple types are given.`, async (): Promise<void> => {
    assert.that(hasObjectType({ type: [ 'number', 'string' ]})).is.false();
  });
});
