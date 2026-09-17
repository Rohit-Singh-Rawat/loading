"use strict";
const MDX_EXTENSION = /\.mdx$/;

module.exports = function demoDependencies(source, map) {
  this.addDependency(this.resourcePath.replace(MDX_EXTENSION, ".tsx"));
  this.callback(null, source, map);
};
