import Route from '@ember/routing/route';

export default Route.extend({
  actions: {
    editRental(rental) {
      this.transitionTo('backend.rentals.edit', rental);
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
