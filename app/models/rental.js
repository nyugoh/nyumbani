import DS from 'ember-data';
const {
  attr,
  belongsTo,
  hasMany
} = DS;

export default DS.Model.extend({
  buildingName: attr('string'),
  monthlyRent: attr('number'),
  depositAmount: attr('number'),
  type: attr('string'),
  hasTiles: attr('boolean'),
  hasSink: attr('boolean'),
  hasBalcony: attr('boolean'),
  hasElectricity: attr('boolean'),
  verified: attr('boolean'),
  noWindows: attr('number'),
  bedrooms: attr('number'),
  noSockets: attr('number'),
  noTaps: attr('number'),
  bathrooms: attr('number'),
  condition: attr('string'),
  contactPersonPosition: attr('string'),
  location: belongsTo(),
  landlord: belongsTo(),
  review: hasMany(),
  createdAt: attr('string'),
  fullDescription: attr('string'),
  briefDescription: attr('string')
});
