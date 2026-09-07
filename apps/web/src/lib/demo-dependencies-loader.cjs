"use strict";
const MDX_EXTENSION = /\.mdx$/;

module.exports = function demoDependencies(source, map) {
  // Each demo fence imports its sibling TSX file. Track that source even though
  // remark-code-import reads it outside the bundler's filesystem API.
  this.addDependency(this.resourcePath.replace(MDX_EXTENSION, ".tsx"));
  this.callback(null, source, map);
};
