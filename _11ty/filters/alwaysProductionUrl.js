const moduleName = require('../helpers/moduleName');
const siteConfig = require('../../content/_data/siteConfig');
const path = require('path');

const body = (p) => {
  const path_with_prefix = path.join(siteConfig.site.pathPrefix, p);
  const result = new URL(path_with_prefix, siteConfig.site.url);
  return result;
};

module.exports = {
  name: moduleName(__filename),
  body,
};
