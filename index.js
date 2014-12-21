var path = require('path');

var assetRev = require('./lib/asset-rev');

module.exports = {
  name: 'broccoli-image-size',
  initializeOptions: function() {
    var defaultOptions = {
      enabled: this.app.env === 'production',
      exclude: [],
      extensions: ['bmp', 'gif', 'jpg', 'png', 'tif', 'webp', 'svg'],
      prepend: '',
      replaceExtensions: ['html', 'css', 'js']
    };

    for (var option in defaultOptions) {
      if (!this.options.hasOwnProperty(option)) {
        this.options[option] = defaultOptions[option];
      }
    }
  },

  postprocessTree: function (type, tree) {
    if (type === 'all' && this.options.enabled) {
      tree = assetRev(tree, this.options);
    }
    return tree;
  },

  included: function (app) {
    this.app = app;
    this.initializeOptions();
  },

  treeFor: function() {}
};
