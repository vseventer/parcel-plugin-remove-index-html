// Package modules.
const debug = require('debug')('parcel:remove-index-html');
const posthtml = require('posthtml');

// Constants.
const MATCHER_NODES = [
  { tag: 'a', attrs: { href: true } },
  { tag: 'link', attrs: { href: true } }
];

// Exports.
module.exports = (SuperHTMLPackager) => {
  return class HTMLPackager extends SuperHTMLPackager {
    constructor(...args) {
      super(...args);
      this.publicURL = this.options.publicURL;
      this.removeIndexHTML = this.removeIndexHTML.bind(this);
    }

    async addAsset(asset) {
      const { html } = asset.generated;
      asset.generated = await posthtml(this.removeIndexHTML).process(html);
      return super.addAsset(asset);
    }

    removeIndexHTML(tree) {
      let count = 0;
      tree.match(MATCHER_NODES, (node) => {
        const { href } = node.attrs;
        if (href.indexOf(this.publicURL) === 0 && href.slice(-11) === '/index.html') {
          count += 1;
          node.attrs.href = href.slice(0, -10); // Preserve trailing slash.
        }
        return node;
      });
      debug('Processed %s: removed %d occurrences', this.bundle.getHashedBundleName(), count);
      return tree;
    }
  };
};
