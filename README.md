# Ember CLI Debounce Query Parameters

[![Build Status](https://travis-ci.org/BnitoBzh/ember-cli-debounce-query-params.svg)](https://travis-ci.org/BnitoBzh/ember-cli-debounce-query-params)

This addon allows for updating queryParams with a defined debounce.
It has been specifically designed to solve the following issue:
1. You have a model you want to update when a query param changes;
2. You don't want to update the history if the users is changing the param in a certain time interval;

A good example for this is a search input field, when you would like to update the results after the users have finished typing.

## Installation

```shell
$ ember install ember-cli-debounce-query-params
```

## Usage
In your route-driven controller include the mixin and add the the `debounceQueryParams` property, like in the following example

```javascript
// controllers/application.js
import Controller from '@ember/controller';
import DebounceQueryParamsMixin from 'ember-cli-debounce-query-params';

export default Controller.extend(DebounceQueryParamsMixin, {
  queryParams: ['search', 'filter'],

  search: null,
  filter: null,

  debounceQueryParams: {
    search: 500
  }
});
```

If you want to update the model the underneath model when the search param changes:

```javascript
// controllers/application.js
import Route from '@ember/routing/route';

export default Route.extend({
  queryParams: {
    search: {
      refreshModel: true
    },
    filter: {
      replace: true
    }
  },

  model: function() {
    // retrieve your model here
  }
});

```

Then in your templates reference the debounced variables by prepending the *debounce* keyword, like in the following example

```html
<h2>Welcome to Ember.js</h2>
<div>
  <label>search: {{input type='text' value=debounceSearch}}</label>
</div>
```

## Api Documentation
This addon consists only of a mixin that you can include in your route-driven controllers.

## Running Tests

* `ember t`
* `ember t -s`

## TODO

- [ ] Add Documentation
