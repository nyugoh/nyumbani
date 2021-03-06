import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('rentals', function() {
    this.route('add');
    this.route('rental', { path: "/:rental_id" });
  });
  this.route('admin');
  this.route('backend', function() {
    this.route('locations', function() {
      this.route('add');
      this.route('edit', { path: "/edit/:rental_id" });
    });
    this.route('landlords', function() {
      this.route('add');
    });
    this.route('rentals', function() {
      this.route('edit', { path: "/:rental_id" });
    });
  });
  this.route('loading');
  this.route('register');
  this.route('login');
});

export default Router;
