import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return this.get('store').find('rental', params.rental_id);
  }
});
