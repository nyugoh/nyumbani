import Component from '@ember/component';
import { isBlank } from '@ember/utils';
import { inject as service } from '@ember/service'

export default Component.extend({
  store: service(),
  actions: {
    leaveMessage(message) {
      this.store.find('rental', this.get('id')).then(rental => {
        message.set('rental', rental);
        message.set('status', 'unread');
        if (isBlank(message.get('email')) || isBlank(message.get('name')) || isBlank(message.get('content'))) {
          this.set('error', 'All fields are required.');
          return;
        } else {
          this.set('error', ' ');
        }

        message.save().then(()=> {
          this.set('messageSent', true);
          setTimeout(function () {
            $('#contactOwner').modal('hide');
          }, 500);
        });
      });
    }
  },
});
