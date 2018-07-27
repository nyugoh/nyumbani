import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return this.get('store').find('location', params.rental_id);
  },
  actions: {
    updateLocation(location) {
      location.save().then(()=> {
        this.transitionTo('backend.locations');
      }).catch(error => {
        this.get('controller').set('errorMessage', 'Error saving record');
      });
    },
  }
});
