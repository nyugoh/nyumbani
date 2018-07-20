import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  queryParams: ['page'],
  page: 1,
  rentalTypes: ['Single room', 'Bedsitter', '1 Bedroom', '2 Bedroom', 'Office'],
  locationTown: computed('locations', function () {
    return this.locations.mapBy('town');
  }),
  town: '',

  actions: {
    setRentalType(type) {
      this.rental.set('type', type)
    },
    setLocation(location) {
      this.store.findRecord('location', location).then(town => {
        this.rental.set('location', town);
        this.set('town', location);
      });
    },
    validateBasic() {
      this.set('page', 2);
    },
    validatePage(page) {
      this.set('page', page);
    },
    saveRental() {
      let model = this.get('rental');
      model.save().then(rental => {
        this.transitionToRoute('rentals');
      }).catch(error => {
        console.log(error);
      });
    }
  }
});
