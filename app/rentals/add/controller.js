import Controller from '@ember/controller';
import { A } from '@ember/array';

export default Controller.extend({
  queryParams: ['page'],
  page: 1,
  rentalTypes: ['Single room', 'Bedsitter', '1 Bedroom', '2 Bedroom', 'Office'],

  actions: {
    setRentalType(type) {
      this.model.set('type', type)
    },
    validateBasic() {
      this.set('page', 2);
    },
    validatePage(page) {
      this.set('page', page);
    },
    saveRental() {
      let model = this.get('model');
      model.save().then(rental => {
        this.transitionToRoute('rentals');
      }).catch(error => {
        console.log(error);
      });
    }
  }
});
