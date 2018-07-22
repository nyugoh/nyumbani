import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  rentalsTotal: computed('rentals', function () {
    return this.get('rentals').length;
  }),
  locationsTotal: computed('locations', function () {
    return this.get('locations').length;
  }),
  landlordsTotal: computed('landlords', function () {
    return this.get('landlords').length;
  }),
});
