import Route from '@ember/routing/route';
// import { hash } from '@ember/object';
import Ember from 'ember';
export default Route.extend({
  model() {
    const store = this.get('store');
    return Ember.RSVP.hash({
      rentals: store.findAll('rental'),
      locations: store.findAll('location'),
      landlords: store.findAll('landlord'),
    });
  },
  setupController(controller, model) {
    controller.set('rentals', model.rentals);
    controller.set('locations', model.locations);
    controller.set('landlords', model.landlords);
  }
});
