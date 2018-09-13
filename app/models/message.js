import DS from 'ember-data';
const {
  attr,
  belongsTo
} = DS;

export default DS.Model.extend({
  name: attr('string'),
  rental: belongsTo(),
  email: attr('string'),
  status: attr('string', {default: 'unread'}),
  content: attr('string')
});
