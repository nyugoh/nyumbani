import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.get('store').findAll('location');
  },
  actions: {
    saveLocation() {
      let controller = this.controllerFor('backend.locations.add');
      let model = controller.get('model');
      model.save().then(rental => {
        controller.transitionToRoute('backend.locations');
      }).catch(error => {
        console.log(error);
      });
    }
  }
});
