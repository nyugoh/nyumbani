import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  session: service(),
  setupController(controller, model) {
    controller.set('agreeToTerms', false);
    controller.set('loading', false);
    controller.set('user', this.get('store').createRecord('landlord'));
  },
  events: {
    error: function(error, transition) {
      // handle the error
      console.log(error);
    }
  },
  actions: {
    addUser() {
      let controller = this.get('controller');
      controller.set('loading', true);
      let user = controller.get('user');
      if(!controller.get('agreeToTerms')){
        controller.set('loading', false);
        controller.set('errorMessage', 'You must agree with the terms and conditions');
      } else {
        user.save().then(()=>{
          /*this.get('session').authenticate('authenticator:oauth2', user.get('email'), user.get('password')).then(()=> {
            this.transitionTo('backend');
          }).catch(error => {
            console.log(error)
            controller.set('loading', false);
            controller.set('errorMessage', error.error);
          });*/
        }).catch(error => {
          console.log(error)
          console.log(error.error)
          controller.set('loading', false);
          controller.set('errorMessage', error.message);
        });
      }
    }
  }
});
