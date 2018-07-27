import Controller from '@ember/controller';
import { inject } from '@ember/service';

export default Controller.extend({
  session: inject('session'),

  actions: {
    logout() {
      this.get('session').invalidate();
      this.transitionToRoute('login');
    },
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
