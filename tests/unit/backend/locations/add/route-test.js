import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | backend/locations/add', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:backend/locations/add');
    assert.ok(route);
  });
});
