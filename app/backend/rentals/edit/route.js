import Route from '@ember/routing/route';
import rental from "../../../models/rental";

export default Route.extend({
  model(params) {
    const store = this.get('store');
    return Ember.RSVP.hash({
      rental: store.findRecord('rental', params.rental_id),
      locations: store.findAll('location'),
      landlords: store.findAll('landlord')
    });
  },
  setupController(controller, model) {
    controller.set('rental', model.rental);
    controller.set('locations', model.locations);
    controller.set('landlords', model.landlords);
    model.rental.get('location').then(location => {
      controller.set('town', location.get('id'));
    });

  }
});
