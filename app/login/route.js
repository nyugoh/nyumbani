import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Route.extend(UnauthenticatedRouteMixin, {
    session: service(),
    loading: false,

    actions: {
        authenticate() {
            let controller = this.get('controller');
            controller.set('loading', true);
            let email = controller.get('email');
            let password = controller.get('password');
            this.get('session').authenticate('authenticator:oauth2', email, password).then(()=> {
              this.transitionTo('backend');
            }).catch(error => {
              controller.set('loading', false);
                controller.set('errorMessage', error.error);
            });
        }
    }
});
