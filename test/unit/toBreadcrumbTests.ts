import { assert } from 'assertthat';
import { toBreadcrumb } from '../../lib/toBreadcrumb';

suite('toBreadcrumb', (): void => {
  test('returns the path if only a single level is given.', async (): Promise<void> => {
    assert.that(toBreadcrumb([ 'foo' ])).is.equalTo('foo');
  });

  test('returns a path separated by dots if multiple levels are given.', async (): Promise<void> => {
    assert.that(toBreadcrumb([ 'jane', 'doe' ])).is.equalTo('jane.doe');
  });

  test('returns an empty string if no path is given.', async (): Promise<void> => {
    assert.that(toBreadcrumb([])).is.equalTo('');
  });
});
