var ImageAnalyzer = require('./image-analyzer');
var Rewrite = require('broccoli-asset-rewrite');

function ImageSizer(inputTree, options) {
  if (!(this instanceof ImageSizer)) {
    return new ImageSizer(inputTree, options);
  }

  options = options || {};

  this.assetMap = {};
  this.inputTree = inputTree;
  this.extensions = options.extensions || ['bmp', 'gif', 'jpg', 'png', 'tif', 'webp'];
  this.replaceExtensions = options.replaceExtensions || ['html', 'css', 'js'];
  this.exclude = options.exclude || [];
  this.generateAssetMap = options.generateAssetMap;
  this.generateRailsManifest = options.generateRailsManifest;
  this.prepend = options.prepend || '';
  this.description = options.description;

  var imageTree = ImageAnalyzer(inputTree, this);

  return Rewrite(imageTree, this);
}

module.exports = ImageSizer;
