import Mixin from '@ember/object/mixin';
import { assert } from '@ember/debug';
import { run } from '@ember/runloop';
import { capitalize } from '@ember/string';

/**
 * Inject this mixin in a route-driven controller in order to
 be able to update query params with a debounce.
 * @class DebounceQueryParamsMixin
 * @extends Mixin
 */
export default Mixin.create({

  /**
   * Setup the controller for debouncing query param
   by calling `_setupDebounceQueryParams`
   * @method init
   * @inherit
   */
  init: function() {
    this._super(...arguments);
    this._setupDebounceQueryParams();
  },

  /**
   * Update the underneath property hence the query param
   * @method _updateQueryParam
   * @protected
   * @param {String} param - the name of the property to update
   * @param {String} value - the new value of the property to update
   */
  _updateQueryParam: function(param, value) {
    this.set(param, value);
  },

  /**
   * The default debounce name suffix
   *
   * *__Example__ : `search` param will generate `debounceSearch` attribute*
   * @property _debounceParamNameSuffix
   * @protected
   * @type {String}
   * @default "debounce"
   */
  _debounceParamNameSuffix: 'debounce',

  /**
   * Return the original param name from the debounce param name
   * @method _debounceParamName
   * @protected
   * @param {String} originalParamName - the name of the property to update
   * @returns {String}
   */
  _debounceParamName: function(originalParamName) {
    originalParamName = capitalize(originalParamName);
    return `${this.get('_debounceParamNameSuffix')}${originalParamName}`;
  },

  /**
   * Return the original param name from the debounce param name
   * @method _originalParamName
   * @protected
   * @param {String} debounceParamName - the name of the property to update
   * @returns {String}
   */
  _originalParamName: function(debounceParamName) {
    const capitalizedOriginalName = debounceParamName.substr(
      this.get('_debounceParamNameSuffix.length'),
      debounceParamName.length);

    return capitalizedOriginalName.charAt(0).toLowerCase()
      + capitalizedOriginalName.substr(1);
  },

  /**
   * Decounce the query param update
   * @method _paramUpdate
   * @protected
   * @param {Object} context - the name of the property to update
   * @param {String} debounceParamName - the name of the property to update
   in the format _debounceParamNameSuffix + ParamName
   */
  _paramUpdate: function(context, debounceParamName) {
    const originalParamName = this._originalParamName(debounceParamName);
    const newOriginalParamValue = this.get(debounceParamName);

    run.debounce(this, this._updateQueryParam, originalParamName,
      newOriginalParamValue,
      this.get(`debounceQueryParams.${originalParamName}`));
  },

  /**
   * Create an observer for each of the properties in debounceQueryParams
   * Note : Use setupController in route to force debounce param update
   when param is set derectly from the URI
   * @method _setupDebounceQueryParams
   * @protected
   * @throws {Error} An Ember Error with Ember.debug.assert
   */
  _setupDebounceQueryParams: function() {
    const debounceQueryParams = this.get('debounceQueryParams');

    for (let param in debounceQueryParams) {
      assert(`${param} must be in queryParams`,
        this._checkQueryParamsPresence(param));

      run.schedule('actions', this, function() {
        const debounceParamName = this._debounceParamName(param);
        this.set(debounceParamName, this.get(param));
        this.addObserver(debounceParamName, this, '_paramUpdate');
      });
    }
  },

  /**
   * Check if the provided debounce param is an existing query param
   * @method _checkQueryParamsPresence
   * @protected
   * @param {String} param - the name of the original query param
   * @return {Boolean}
   */
  _checkQueryParamsPresence: function(param) {
    const queryParams = this.get('queryParams');

    return queryParams.indexOf(param) !== -1
      || queryParams.reduce(
        (result, item) => result = Object.keys(item).indexOf(param) !== -1,
        false);
  }
});
