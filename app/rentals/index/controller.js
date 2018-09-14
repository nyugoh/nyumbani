import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { isEmpty } from '@ember/utils';

export default Controller.extend({
  town: '',
  type: '',
  condition: '',
  monthlyRent: '',
  bedrooms: '',
  filters:  computed('type', 'monthlyRent', 'bedrooms', 'town', 'condition', function () {
    let filters = [];
    let town = this.get('town');
    let type = this.get('type');
    let condition = this.get('condition');
    let monthlyRent = this.get('monthlyRent');
    let bedrooms = this.get('bedrooms');
    let monthlyRentRange = [];
    monthlyRentRange[0] = 'Below 5k';
    monthlyRentRange[1] = '6k - 10k';
    monthlyRentRange[2] = '11k - 15k';
    monthlyRentRange[3] = '16k - 20k';
    monthlyRentRange[4] = '21k - 50k';
    monthlyRentRange[5] = 'Above 50k';
    if(!isEmpty(type))
      filters.push({filter:'type', value: type});
    if(!isEmpty(town))
      filters.push({filter:'town', value: town});
    if(!isEmpty(monthlyRent))
      filters.push({filter:'monthlyRent', value: monthlyRentRange[monthlyRent]});
    if(!isEmpty(bedrooms))
      filters.push({filter:'bedrooms', value: `${bedrooms} Bedroom(s)`});
    if(!isEmpty(condition))
      filters.push({filter:'condition', value: `${condition}`});
    return filters;
  }),
  filteredRentals: computed('rentals.[]', 'type', 'bedrooms', 'monthlyRent', 'town', 'condition', function () {
    let model = this.get('rentals');
    let town = this.get('town');
    let filters = this.get('filters');
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
        let passed = true;
        filters.forEach((filter, index)=> {
          if(passed){
            if(rental.get(filter.filter) === filter.value)
              passed = true;
            else
              passed = false;
            if(filter.filter === 'monthlyRent')
              if(this._comparePriceRange(this.get('monthlyRent'), rental.get('monthlyRent')))
                passed = true;
          }
        });
        if(passed)
          rentals.pushObject(rental);
        /*if(!isEmpty(type) && rental.get('type') === type){
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
        if(!isEmpty(monthlyRent)){
          if(this._comparePriceRange(monthlyRent, rental.get('monthlyRent')))
            rentals.pushObject(rental);
        }
        if(isEmpty(type) && isEmpty(bedrooms) && isEmpty(monthlyRent)){
          if(parseInt(rental.get('monthlyRent')) > 0)
            rentals.pushObject(rental);
        }*/
      });
    });
    if(filters.length == 0)
      return model;
    else
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
    setMonthlyRent(monthlyRent) {
      this.set('monthlyRent', monthlyRent);
    },
    setCondition(condition) {
      this.set('condition', condition.toUpperCase());
    },
    clearFilter(filter){
      this.set(filter, '');
    }
  },

  _comparePriceRange(range, monthlyRent) {
    let monthlyRentRange = [5000, 10000, 15000, 20000, 50000];
    let status = false;
    range = parseInt(range);
    monthlyRent = parseInt(monthlyRent);
    switch (range) {
      case 0:
        status = monthlyRent <= monthlyRentRange[range];
        break;
      case 1:
      case 2:
      case 3:
      case 4:
        status = monthlyRent > monthlyRentRange[range-1] && monthlyRent < monthlyRentRange[range];
        break;
      case 5:
        status = monthlyRent > monthlyRentRange[range];
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
