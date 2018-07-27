import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | backend/login', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:backend/login');
    assert.ok(route);
  });
});
