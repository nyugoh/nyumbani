import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { isEmpty } from '@ember/utils';
// import { filterBy } from '@ember/array';

export default Controller.extend({
  type: '',
  price: '',
  bedrooms: '',
  rentals: computed('model.[]', 'type', 'bedrooms', 'price', function () {
    let model = this.get('model');
    let type = this.get('type');
    let bedrooms = this.get('bedrooms');
    let price = this.get('price');
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

        if(!isEmpty(type) && rental.get('type') === type){
          if(parseInt(rental.get('monthlyRent')) > 0)
            rentals.pushObject(rental);
        }
        if(!isEmpty(bedrooms) && rental.get('bedrooms') == bedrooms){
          rentals.pushObject(rental);
        }
        if(!isEmpty(price)){
          if(this._comparePriceRange(price, rental.get('monthlyRent')))
            rentals.pushObject(rental);
        }
        if(isEmpty(type) && isEmpty(bedrooms) && isEmpty(price)){
          if(parseInt(rental.get('monthlyRent')) > 0)
            rentals.pushObject(rental);
        }
      });
    });
    return rentals;
  }),

  actions: {
    setType(type){
      this.set("type", type);
    },
    setRooms(rooms){
      this.set("bedrooms", rooms);
    },
    searchRental(query) {
      if(query.length > 2){
        this._searchRental(query)
      }
    },
    setPrice(price) {
      this.set('price', price);
    }
  },

  _comparePriceRange(range, price) {
    let priceRange = [5000, 10000, 15000, 20000, 50000];
    let status = false;
    range = parseInt(range);
    price = parseInt(price);
    switch (range) {
      case 0:
        status = price <= priceRange[range];
        break;
      case 1:
      case 2:
      case 3:
      case 4:
        status = price > priceRange[range-1] && price < priceRange[range];
        break;
      case 5:
        status = price > priceRange[range];
        break;
      default:
        status = false;
    }
    return status;
  },
  _searchRental(query) {
    let rental = this.get('rentals').mapBy('buildingName');
    let dropdown = $('.results');
    let results = '';
    rental.map((location, index) => {
      if(location.toLowerCase().indexOf(query.trim().toLowerCase()) > -1)
        results += `<li><a href="index.html">${location}</span></a></li>`;
    });
    dropdown.empty(); // Clear previous results if any
    dropdown.append(results);
  }
});
