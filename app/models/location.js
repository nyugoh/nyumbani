import DS from 'ember-data';
const {
  attr,
  belongsTo,
  hasMany
} = DS;

export default DS.Model.extend({
  county: attr('string'),
  subCounty: attr('string'),
  town: attr('string'),
  rentals: hasMany()
});
