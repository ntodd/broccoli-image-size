var path = require('path');
var imageSizer = require('./lib/image-sizer');

module.exports = {
  name: 'broccoli-image-size',
  initializeOptions: function() {
    var defaultOptions = {
      enabled: this.app.env === 'production',
      exclude: [],
      extensions: ['bmp', 'gif', 'jpg', 'png', 'tif', 'webp'],
      prepend: '',
      replaceExtensions: ['html', 'css', 'js']
    };

    this.options = this.app.options.imageSize = this.app.options.imageSize || {};

    for (var option in defaultOptions) {
      if (!this.options.hasOwnProperty(option)) {
        this.options[option] = defaultOptions[option];
      }
    }
  },

  postprocessTree: function (type, tree) {
    if (type === 'all' && this.options.enabled) {
      tree = imageSizer(tree, this.options);
    }
    return tree;
  },

  included: function (app) {
    this.app = app;
    this.initializeOptions();
  },

  treeFor: function() {}
};
