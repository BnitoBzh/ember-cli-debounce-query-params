// BEGIN-SNIPPET index-route
import Route from '@ember/routing/route';
import { isEmpty } from '@ember/utils';

export default Route.extend({
  queryParams: {
    search: {
      refreshModel: true
    }
  },

  model(params) {
    const languages = this.modelFor('application');
    if (!isEmpty(params.search)) {
      return languages.filter((language) => language.get('name')
      .toLowerCase().indexOf(params.search.toLowerCase()) !== -1);
    }
    return languages;
  },

  setupController(controller) {
    this._super(...arguments);
    controller.set('debounceSearch', controller.get('search'));
  }
});
// END-SNIPPET
