import Route from '@ember/routing/route';
import { isEmpty } from '@ember/utils';

export default Route.extend({
  model() {
    return this.get('store').findAll('location');
  },

  actions: {
    saveLocation() {
      let controller = this.controllerFor('backend.locations.add');
      let model = controller.get('model');
      if (isEmpty(model.get('county')) || isEmpty(model.get('subCounty')) || isEmpty(model.get('town')) )
        controller.set('errorMessage', 'All fields are required');
      else
        model.save().then(location => {
          controller.transitionToRoute('backend.locations');
        }).catch(error => {
          controller.set('errorMessage', 'Error saving location');
        });
    },
    deleteLocation(id) {
      let location = this.get('store').peekRecord('location', id);
      location.destroyRecord();
    }
  }
});
