import Route from '@ember/routing/route';
import Ember from 'ember';

export default Route.extend({
  model() {
    const store = this.get('store');
    return Ember.RSVP.hash({
      locations: store.findAll('location'),
      rentals: store.findAll('rental')
    });
  },
  setupController(controller, model) {
    controller.set('locations', model.locations);
    controller.set('rentals', model.rentals);
  }
});
