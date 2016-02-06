import DS from 'ember-data';

export default DS.Model.extend({
  sender: DS.attr('enc-string'),
  subject: DS.attr('enc-string'),
  body: DS.attr('enc-string')
});
