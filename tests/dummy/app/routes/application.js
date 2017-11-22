import Route from '@ember/routing/route';
import { A } from '@ember/array';
import EmberObject from '@ember/object';

export default Route.extend({
  model() {
    return new A([EmberObject.create({
      name: 'JavaScript',
      firstVersion: 1995
    }), EmberObject.create({
      name: 'Ruby',
      firstVersion: 1995
    }), EmberObject.create({
      name: 'PHP',
      firstVersion: 1994
    }), EmberObject.create({
      name: 'Java',
      firstVersion: 1995
    }), EmberObject.create({
      name: 'Python',
      firstVersion: 1990
    })]);
  }
});
