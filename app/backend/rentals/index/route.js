import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.get('store').findAll('rental');
  },
  actions: {
    editRental(id) {
      this.transitionTo('backend.rentals.edit', id);
    },

    deleteRental(id) {
      this.get('store').findRecord('rental', id).then(rental => {
        rental.destroyRecord();
      }).catch(error => {
        alert(error);
      })
    }
  }
});
