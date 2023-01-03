const postcss = require('postcss');
const postcssImport = require('postcss-import');
const postcssMin = require('postcss-csso');

module.exports = config => {
  // Pass these paths through to the dist folder.
  config.addPassthroughCopy('./src/img/');
  config.addPassthroughCopy('./src/manifest.json');
  config.addPassthroughCopy('./src/service-worker.js');

  // Define layout aliases. All paths relative to _includes
  config.addLayoutAlias('default', 'layouts/default.html');

  // Collections
  // config.addCollection('COLLECTION', collection =>
  //   collection.getFilteredByGlob('src/DIR/_posts/*.md')
  //     .sort((a, b) => a.data.order - b.data.order));

  // CSS pipeline
  config.addTemplateFormats('css');
  config.addExtension('css', {
    outputFileExtension: 'css',
    compile: async (content, path) => {
      return async () => {
        let output = await postcss([
          postcssImport,
          postcssMin,
        ]).process(content, {
          from: path,
        });

        return output.css;
      }
    }
  });

  return {
    dir: {
      input: 'src',
      output: '_site'
    },
    markdownTemplateEngine: 'liquid',
  };
};

