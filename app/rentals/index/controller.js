import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { isEmpty } from '@ember/utils';

export default Controller.extend({
  town: '',
  type: '',
  condition: '',
  price: '',
  bedrooms: '',
  filters:  computed('type', 'price', 'bedrooms', 'town', 'condition', function () {
    let filters = [];
    let town = this.get('town');
    let type = this.get('type');
    let condition = this.get('condition');
    let price = this.get('price');
    let bedrooms = this.get('bedrooms');
    let priceRange = [];
    priceRange[0] = 'Below 5k';
    priceRange[1] = '6k -10k';
    priceRange[2] = '11k - 15k';
    priceRange[3] = '16k - 20k';
    priceRange[4] = '21k - 50k';
    priceRange[5] = 'Above 50k';
    if(!isEmpty(type))
      filters.push({filter:'type', value: type});
    if(!isEmpty(town))
      filters.push({filter:'town', value: town});
    if(!isEmpty(price))
      filters.push({filter:'price', value: priceRange[price]});
    if(!isEmpty(bedrooms))
      filters.push({filter:'bedrooms', value: `${bedrooms} Bedroom(s)`});
    if(!isEmpty(condition))
      filters.push({filter:'condition', value: `${condition}`});
    return filters;
  }),
  filteredRentals: computed('rentals.[]', 'type', 'bedrooms', 'price', 'town', 'condition', function () {
    let model = this.get('rentals');
    let town = this.get('town');
    let type = this.get('type');
    let condition = this.get('condition');
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
        if(!isEmpty(town) && rental.get('town') === town){
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
    setTown(town){
      this.set("town", town);
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
    },
    setCondition(condition) {
      this.set('condition', condition);
    },
    clearFilter(filter){
      this.set(filter, '');
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
    let rentalid = this.get('rentals').mapBy('id');
    let dropdown = $('.results');
    let results = '';
    rental.map((location, index) => {
      if(location.toLowerCase().indexOf(query.trim().toLowerCase()) > -1)
        results += `<li><a href="/rentals/${rentalid[index]}">${location}</span></a></li>`;
    });
    dropdown.empty(); // Clear previous results if any
    dropdown.append(results);
  }
});
