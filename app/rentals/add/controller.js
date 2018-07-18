import Controller from '@ember/controller';
import { A } from '@ember/array';

export default Controller.extend({
  queryParams: ['page'],
  page: 1,
  rentalTypes: ['Single room', 'Bedsitter', '1 Bedroom', '2 Bedroom', 'Office'],

  init() {
    // this.model.set('type', );
    // this.set(this.type, this.model.get('type'));
  },

  actions: {
    setRentalType(type) {
      this.model.set('type', type)
    },
    validateBasic() {
      this.set('page', 2);
    },
    validatePage(page) {
      this.set('page', page);
    }
  }
});
