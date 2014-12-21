var ImageAnalyzer = require('./image-analyzer');
var UseRev = require('broccoli-asset-rewrite');

function AssetRev(inputTree, options) {
  if (!(this instanceof AssetRev)) {
    return new AssetRev(inputTree, options);
  }

  options = options || {};

  this.assetMap = {};
  this.inputTree = inputTree;
  this.extensions = options.extensions || ['bmp', 'gif', 'jpg', 'png', 'tif', 'webp', 'svg'];
  this.replaceExtensions = options.replaceExtensions || ['html', 'css', 'js'];
  this.exclude = options.exclude || [];
  this.generateAssetMap = options.generateAssetMap;
  this.generateRailsManifest = options.generateRailsManifest;
  this.prepend = options.prepend || '';
  this.description = options.description;

  var imageTree = ImageAnalyzer(inputTree, this);

  return UseRev(imageTree, this);
}

module.exports = AssetRev;
