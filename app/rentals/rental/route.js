import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return this.get('store').find('rental', params.rental_id);
  },

  setupController(controller, model) {
    model.get('location').then(location => {
      model.set('town', location.get('town'));
      model.set('subCounty', location.get('subCounty'));
    });
    model.set('rating', model.get('monthlyRent')/5000);
    controller.set('rental', model);
  }
});
