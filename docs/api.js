YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "DebounceQueryParamsMixin"
    ],
    "modules": [
        "Advanced",
        "Basic",
        "Usage"
    ],
    "allModules": [
        {
            "displayName": "Advanced",
            "name": "Advanced",
            "description": "## Direct Access\n\nWhen search param is typed directly from URL, the debounce param will not be correctly updated, because the `search` property is set in the route handler's `setupController` hook.\nIn order to prevent this, you can set the debounce param in the same route handle\n\n```javascript\n// routes/application.js\nimport Route from '@ember/routing/route';\n\nexport default Route.extend({\n  // ...\n  queryParams: {\n    search: {\n      refreshModel: true\n    }\n  },\n  // ...\n  setupController(controller) {\n    this._super(...arguments);\n    controller.set('debounceSearch', controller.get('search'));\n  }\n  // ...\n});\n```"
        },
        {
            "displayName": "Basic",
            "name": "Basic",
            "description": "## Mixin implementation\n\nIn your route-driven controller include the mixin and add the `debounceQueryParamsMixin` object, like in the following example\n\n```javascript\n// controllers/application.js\nimport DebounceQueryParamsMixin from 'ember-cli-debounce-query-params';\n\nexport default Controller.extend(DebounceQueryParamsMixin, {\n  queryParams: ['search'],\n  debounceQueryParams: {\n    search: 500\n  },\n  search: ''\n});\n```\n\n```javascript\n// routes/application.js\nimport Route from '@ember/routing/route';\n\nexport default Route.extend({\n  // ...\n  queryParams: {\n    search: {\n      refreshModel: true\n    }\n  },\n  // ...\n});\n```\n\n```handlebars\n{{! templates/application.hbs}}\n<h2 id=\"title\">Welcome to Ember.js</h2>\n<div>\n  <label>search: {{input value\\=debounceSearch}}</label>\n</div>\n```"
        },
        {
            "displayName": "Usage",
            "name": "Usage",
            "description": "## Installation\n```shell\nember install ember-cli-debounce-query-params\n```\n\n## Looking for help?\nIf it is a bug [please open an issue on GitHub](https://github.com/BnitoBzh/ember-cli-debounce-query-params/issues)."
        }
    ],
    "elements": []
} };
});