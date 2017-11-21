import Controller from '@ember/controller';
import EmberError from '@ember/error';
import { run } from '@ember/runloop';
import DebounceQueryParamsMixin from 'ember-cli-debounce-query-params';
import { module, test } from 'qunit';
import sinon from 'sinon';

module('Unit | Mixin | debounce query params');

test('it throws an exception if debouceQueryParams is not present in queryParams', function(assert) {
  assert.expect(3);

  const DebounceQueryParamsController = Controller.extend(DebounceQueryParamsMixin);

  assert.throws(() => DebounceQueryParamsController.create({
    // empty queryParams
    debounceQueryParams: {
      bar: 500
    }
  }), EmberError, 'it throws an exception');

  assert.throws(() => DebounceQueryParamsController.create({
    // queryParams array without needed query param
    queryParams: ['search'],
    search: 'foo',
    debounceQueryParams: {
      bar: 500
    }
  }), EmberError, 'it throws an exception');

  assert.throws(() => DebounceQueryParamsController.create({
    // queryParams object without needed query param
    queryParams: {search: 'term'},
    search: 'foo',
    debounceQueryParams: {
      bar: 500
    }
  }), EmberError, 'it throws an exception');
});

test('it sets debounceSearch to search value', function(assert) {
  assert.expect(1);

  const DebounceQueryParamsController = Controller.extend(DebounceQueryParamsMixin);
  let subject;

  run(function() {
    subject = DebounceQueryParamsController.create({
      queryParams: ['search'],
      search: 'foo',
      debounceQueryParams: {
        search: 500
      }
    });
  });

  assert.equal(subject.get('debounceSearch'), subject.get('search'));
});

test('it calls debounce when update search', function(assert) {
  assert.expect(2);

  const DebounceQueryParamsController = Controller.extend(DebounceQueryParamsMixin);
  run.debounce = sinon.spy();
  let subject;

  run(function() {
    subject = DebounceQueryParamsController.create({
      queryParams: ['search'],
      search: 'foo',
      debounceQueryParams: {
        search: 500
      }
    });
  });

  subject.set('debounceSearch', 'ba');
  subject.set('debounceSearch', 'bar');

  assert.equal(subject.get('search'), 'foo');
  assert.ok(run.debounce.calledTwice);
});
