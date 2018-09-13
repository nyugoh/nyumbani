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
    model.set('addedOn', this._getAddedDate(model.get('updatedAt')));
    controller.set('rental', model);
    controller.set('message', this.get('store').createRecord('message'));
  },

  _getAddedDate(date) {
    return 'Yesterday';
  }
});
