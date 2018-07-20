import Route from '@ember/routing/route';
// import { hash } from '@ember/RSVP';
import Ember from 'ember';

export default Route.extend({
  model() {
    const store = this.get('store');
    return Ember.RSVP.hash({
      locations: store.findAll('location'),
      landlords: store.findAll('landlord')
    });
  },
  setupController(controller, model) {
    controller.set('rental', this.store.createRecord('rental'));
    controller.set('locations', model.locations);
    controller.set('landlords', model.landlords);
  }
});
