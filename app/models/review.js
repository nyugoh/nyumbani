import DS from 'ember-data';
const {
  attr,
  belongsTo
} = DS;

export default DS.Model.extend({
  name: attr('string'),
  comment: attr('string'),
  stars: attr('number'),
  rental: belongsTo()
});
