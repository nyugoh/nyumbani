import Controller from '@ember/controller';
import { inject as controller } from '@ember/controller';
import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';

export default Controller.extend({
  rentalAddController: controller('rentals.add'),
  rentalTypes: alias('rentalAddController.rentalTypes'),
  locationTown: alias('rentalAddController.locationTown'),
  town: computed('rental.location', function () {
    this.get('rental').get('location').then(location => {
      return location.get('id');
    })
  }),
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
    saveRental() {
      let model = this.get('rental');
      model.save().then(rental => {
        this.transitionToRoute('backend.rentals');
      }).catch(error => {

      });
    }
  }
});
