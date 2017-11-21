import Mixin from '@ember/object/mixin';
import { assert } from '@ember/debug';
import { run } from '@ember/runloop';
import { capitalize } from '@ember/string';

/**
Inject this mixin in a route-driven controller in order to be able
to update query params with a debounce.

@class DebounceQueryParams
@property {String} debounceParamNameSuffix - The default debounce name suffix
*/
export default Mixin.create({
  /**
  Setup the controller for debouncing query param by calling
  setupDebounceQueryParams

  @method init
  */
  init: function() {
    this._super(...arguments);
    this.setupDebounceQueryParams();
  },

  /**
  Update the underneath property hence the query param

  @method updateQueryParam
  @param {String} param - the name of the property to update
  @param {String} value - the new value of the property to update
  */
  updateQueryParam: function(param, value) {
    this.set(param, value);
  },

  debounceParamNameSuffix: 'debounce',

  /**
  Return the debounce param name from an original param name

  @method debounceParamName
  @param {String} originalParamName - the name of the property to update
  @returns {String}
  */
  debounceParamName: function(originalParamName) {
    originalParamName = capitalize(originalParamName);
    return `${this.get('debounceParamNameSuffix')}${originalParamName}`;
  },

  /**
  Return the original param name from the debounce param name

  @method originalParamName
  @param {String} debounceParamName - the name of the property to update
  @returns {String}
  */
  originalParamName: function(debounceParamName) {
    const capitalizedOriginalName = debounceParamName.substr(
      this.get('debounceParamNameSuffix.length'),
      debounceParamName.length);

    return capitalizedOriginalName.charAt(0).toLowerCase()
      + capitalizedOriginalName.substr(1);
  },

  /**
  Decounce the query param update

  @method paramUpdate
  @param {Object} context - the name of the property to update
  @param {String} debounceParamName - the name of the property to update
  in the format debounce_paramName
  */
  paramUpdate: function(context, debounceParamName) {
    const originalParamName = this.originalParamName(debounceParamName);
    const newOriginalParamValue = this.get(debounceParamName);

    run.debounce(this, this.updateQueryParam, originalParamName,
      newOriginalParamValue, this.get(`debounceQueryParams.${originalParamName}`));
  },

  /**
  Create an observer for each of the properties in the debounceQueryParams object
  Note : Use setupController in route to force debounce param update when param
  is set derectly from the URI
  @method setupDebounceQueryParams
  */
  setupDebounceQueryParams: function() {
    const debounceQueryParams = this.get('debounceQueryParams');

    for (let param in debounceQueryParams) {
      assert(`${param} must be in queryParams`, this._checkQueryParamsPresence(param));

      run.schedule('actions', this, function() {
        const debounceParamName = this.debounceParamName(param);
        this.set(debounceParamName, this.get(param));
        this.addObserver(debounceParamName, this, 'paramUpdate');
      });
    }
  },

  /**
  Check if the provided debounce param is an existing query param
  @method _checkQueryParamsPresence
  @param {String} param - the name of the query param
  @returns {Boolean}
  */
  _checkQueryParamsPresence: function(param) {
    const queryParams = this.get('queryParams');

    return queryParams.indexOf(param) !== -1
      || queryParams.reduce(
        (result, item) => result = Object.keys(item).indexOf(param) !== -1,
        false);
  }
});
