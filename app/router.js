import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('rentals', function() {
    this.route('add');
  });
  this.route('admin');
  this.route('backend', function() {
    this.route('locations', function() {
      this.route('add');
    });
    this.route('landlords', function() {
      this.route('add');
    });
  });
});

export default Router;
