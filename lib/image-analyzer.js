var fs = require('fs');
var path = require('path');
var imageSize = require('image-size');
var Filter = require('broccoli-filter');
var Promise = require('rsvp').Promise;

function ImageAnalyzer(inputTree, options) {
  if (!(this instanceof ImageAnalyzer)) {
    return new ImageAnalyzer(inputTree, options);
  }

  options = options || {};

  this.inputTree = inputTree;
  this.assetMap = options.assetMap || {};
  this.extensions = options.extensions || [];
  this.exclude = options.exclude || [];
  this.description = options.description;
  this.generateAssetMap = options.generateAssetMap;
  this.generateRailsManifest = options.generateRailsManifest;
  this.prepend = options.prepend;
}

ImageAnalyzer.prototype = Object.create(Filter.prototype);
ImageAnalyzer.prototype.constructor = ImageAnalyzer;

// ImageAnalyzer.prototype.extensions = ['html'];
// ImageAnalyzer.prototype.targetExtension = 'html';

Fingerprint.prototype.canProcessFile = function (relativePath) {
  for (var i = 0; i < this.exclude.length; i++) {
    if (relativePath.indexOf(this.exclude[i]) !== -1) {
      return false;
    }
  }
  return Filter.prototype.getDestFilePath.apply(this, arguments) !== null;
};

ImageAnalyzer.prototype.processFile = function (srcDir, destDir, relativePath) {
  this._srcDir = srcDir;

  var file = fs.readFileSync(srcDir + '/' + relativePath);
  var self = this;

  return Promise.resolve().then(function () {
    var outputPath = self.getDestFilePath(relativePath);
    fs.writeFileSync(destDir + '/' + outputPath, file);
  });
};

ImageAnalyzer.prototype.getDestFilePath = function (relativePath) {
  if (Filter.prototype.getDestFilePath.apply(this, arguments)) {
    if (this.assetMap[relativePath]) {
      return this.assetMap[relativePath];
    }

    var tmpPath = path.join(this._srcDir, relativePath);
    var file = fs.readFileSync(tmpPath, { encoding: 'utf8' });

    var dimensions = imageSize(file);

    var ext = path.extname(relativePath);
    var newPath = relativePath.replace(ext, '-' + dimensions.width + 'x' + dimensions.height + ext);
    this.assetMap[relativePath] = newPath;

    return newPath;
  }
  return null;
};

module.exports = ImageAnalyzer;
