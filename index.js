// @see https://parceljs.org/plugins.html

// Local modules.
const HTMLPackager = require('./HTMLPackager');

// Exports.
module.exports = (bundler) => {
  // Extend the current parent HTMLPackager.
  const SuperHTMLPackager = bundler.packagers.get('html');
  bundler.addPackager('html', HTMLPackager(SuperHTMLPackager));
};
