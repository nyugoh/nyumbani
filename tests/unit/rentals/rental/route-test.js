import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | rentals/rental', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:rentals/rental');
    assert.ok(route);
  });
});
