import DS from 'ember-data';
const {
  attr,
  hasMany
} = DS;

export default DS.Model.extend({
  fullName: attr(),
  email: attr(),
  password: attr(),
  providerId: attr(),
  phoneNumber: attr(),
  position: attr(),
  rentals: hasMany
});
