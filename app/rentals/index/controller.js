import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  rentals: computed('model.[]', function () {
    let model = this.get('model');
    let rentals = [];
    model.forEach((rental, index) => {
      let rating = parseInt(rental.get('monthlyRent'))/5000;
      rental.set('rating', rating);
      rental.get('location').then(location => {
        let town;
        if (location)
          town = location.get('town');
        else
          town = 'Unknown';
        rental.set('town', town);
        if(parseInt(rental.get('monthlyRent')) > 0)
          rentals.pushObject(rental);
      });
    });
    return rentals;
  })
});
