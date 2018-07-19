import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | backend/landlords/add', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:backend/landlords/add');
    assert.ok(route);
  });
});
