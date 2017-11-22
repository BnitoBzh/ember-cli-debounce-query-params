import DebounceQueryParams from './mixins/debounce-query-params';

/**
 * ## Installation
 * ```shell
 * ember install ember-cli-debounce-query-params
 * ```
 *
 * ## Looking for help?
 * If it is a bug [please open an issue on GitHub](https://github.com/BnitoBzh/ember-cli-debounce-query-params/issues).
 *
 * @module Usage
 */

 /**
 * ## Mixin implementation
 *
 * In your route-driven controller include the mixin and add the `debounceQueryParamsMixin` object, like in the following example
 *
 * ```javascript
 * // controllers/application.js
 * import DebounceQueryParamsMixin from 'ember-cli-debounce-query-params';
 *
 * export default Controller.extend(DebounceQueryParamsMixin, {
 *   queryParams: ['search'],
 *   debounceQueryParams: {
 *     search: 500
 *   },
 *   search: ''
 * });
 * ```
 *
 * ```javascript
 * // routes/application.js
 * import Route from '@ember/routing/route';
 *
 * export default Route.extend({
 *   // ...
 *   queryParams: {
 *     search: {
 *       refreshModel: true
 *     }
 *   },
 *   // ...
 * });
 * ```
 *
 * ```handlebars
 * {{! templates/application.hbs}}
 * <h2 id="title">Welcome to Ember.js</h2>
 * <div>
 *   <label>search: {{input value\=debounceSearch}}</label>
 * </div>
 * ```
 *
 * @module Usage
 * @submodule Basic
 */

 /**
 * ## Direct Access
 *
 * When search param is typed directly from URL, the debounce param will not be correctly updated, because the `search` property is set in the route handler's `setupController` hook.
 * In order to prevent this, you can set the debounce param in the same route handle
 *
 * ```javascript
 * // routes/application.js
 * import Route from '@ember/routing/route';
 *
 * export default Route.extend({
 *   // ...
 *   queryParams: {
 *     search: {
 *       refreshModel: true
 *     }
 *   },
 *   // ...
 *   setupController(controller) {
 *     this._super(...arguments);
 *     controller.set('debounceSearch', controller.get('search'));
 *   }
 *   // ...
 * });
 * ```
 *
 * @module Usage
 * @submodule Advanced
 */

export default DebounceQueryParams;
