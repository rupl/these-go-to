const { EleventyRenderPlugin } = require('@11ty/eleventy');
const EleventyWebcPlugin = require('@11ty/eleventy-plugin-webc');

module.exports = eleventyConfig => {
  //
  // Pass through
  //
  eleventyConfig.addPassthroughCopy('./src/img/');
  eleventyConfig.addPassthroughCopy('./src/manifest.json');
  eleventyConfig.addPassthroughCopy('./src/service-worker.js');

  //
  // Layouts
  //
  // All paths relative to _includes. To set default layout:
  // @see src/_data/layout.js
  //
  eleventyConfig.addLayoutAlias('page', 'layouts/page.webc');

  //
  // WebC: globally register components dir (for DX)
  //
  eleventyConfig.addPlugin(EleventyWebcPlugin, {
    components: 'src/_includes/components/**/*.webc',
  });

  //
  // To render WebC in Markdown we need the `renderTemplate` block.
  //
  eleventyConfig.addPlugin(EleventyRenderPlugin);

  // Collections
  // eleventyConfig.addCollection('COLLECTION', collection =>
  //   collection.getFilteredByGlob('src/DIR/_posts/*.md')
  //     .sort((a, b) => a.data.order - b.data.order));

  return {
    dir: {
      input: 'src',
      output: '_site'
    },
    htmlTemplateEngine: 'webc',
    markdownTemplateEngine: 'liquid',
  };
};

