import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  rentals: computed('model.[]', function () {
    let model = this.get('model');
    let rentals = [];
    model.forEach((rental, index) => {
      rental.get('location').then(location => {
        let town;
        if (location)
          town = location.get('town');
        else
          town = 'Unknown';
        rental.set('town', town);
        rentals.pushObject(rental);
      });
    });
    return rentals;
  })
});
