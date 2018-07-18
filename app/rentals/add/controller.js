import Controller from '@ember/controller';
import { A } from '@ember/array';

export default Controller.extend({
  queryParams: ['page'],
  page: 1,
  rentalTypes: A([
    { id: 1, name: 'Single room'},
    { id: 2, name: 'Bedsitter'},
    { id: 3, name: '1 Bedroom'},
    { id: 4, name: '2 Bedroom'},
    { id: 5, name: 'Office'},
  ]),

  showInstructions(e) {

  },

  actions: {
    validateBasic() {
      this.set('page', 2);
    },

    validatePage(page) {
      this.set('page', page);
    }
  }
});
