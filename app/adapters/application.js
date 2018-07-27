import DS from 'ember-data';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.RESTAdapter.extend(DataAdapterMixin, {
  session: service(),
  host: 'http://localhost:8080',
  namespace: 'api/v1',
  authorizer: 'authorizer:oauth2',
});
