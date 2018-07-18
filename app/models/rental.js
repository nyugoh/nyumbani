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
  type: attr('number'),
  hasTiles: attr('boolean'),
  hasSink: attr('boolean'),
  hasBalcony: attr('boolean'),
  hasElectricity: attr('boolean'),
  noWindows: attr('number'),
  noSockets: attr('number'),
  condition: attr('string'),
  location: belongsTo(),
  landlord: belongsTo(),
  review: hasMany()
});
