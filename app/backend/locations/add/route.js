import Route from '@ember/routing/route';

export default Route.extend({
  setupController(controller, model) {
    controller.set('model', this.store.createRecord('location'));
  },

  actions: {
    saveLocation() {
      let model = this.get('model');
      model.save().then(rental => {
        this.transitionToRoute('backend.locations');
      }).catch(error => {
        console.log(error);
      });
    }
  }
});
