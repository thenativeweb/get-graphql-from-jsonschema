import { assert } from 'assertthat';
import { toPascalCase } from '../../lib/toPascalCase';

suite('toPascalCase', (): void => {
  test('returns a capitalized word.', async (): Promise<void> => {
    assert.that(toPascalCase([ 'jane' ])).is.equalTo('Jane');
  });

  test('returns capitalized and joined words if multiple words are given.', async (): Promise<void> => {
    assert.that(toPascalCase([ 'jane', 'doe' ])).is.equalTo('JaneDoe');
  });

  test('returns an empty string if an empty array is given.', async (): Promise<void> => {
    assert.that(toPascalCase([])).is.equalTo('');
  });
});
