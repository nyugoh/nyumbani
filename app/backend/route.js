import Route from '@ember/routing/route';

export default Route.extend({
  actions: {
    saveLocation() {
      let controller = this.controllerFor('backend.locations.add');
      let model = controller.get('model');
      model.save().then(location => {
        controller.transitionToRoute('backend.locations');
      }).catch(error => {
        console.log(error);
      });
    },
    saveLandlord() {
      let controller = this.controllerFor('backend.landlords.add');
      let model = controller.get('model');
      model.save().then(landlord => {
        controller.transitionToRoute('backend.landlords');
      }).catch(error => {
        console.log(error);
      });
    }
  }
});
