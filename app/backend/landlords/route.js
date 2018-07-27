import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.get('store').findAll('landlord');
  },
  actions: {
    saveLandlord() {
      let controller = this.controllerFor('backend.landlords.add');
      let model = controller.get('model');
      model.save().then(landlord => {
        controller.transitionToRoute('backend.landlords');
      }).catch(error => {
        controller.set('errorMessage', 'Error saving user');
      });
    }
  }
});
