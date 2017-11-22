// BEGIN-SNIPPET index-controller
import Controller from '@ember/controller';
import DebounceQueryParamsMixin from 'ember-cli-debounce-query-params';

export default Controller.extend(DebounceQueryParamsMixin, {

  queryParams: ['search'],
  search: null,

  debounceQueryParams: {
    search: 500
  }
});
// END-SNIPPET
