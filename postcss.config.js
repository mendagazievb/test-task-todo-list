const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
  plugins: [
    postcssPresetEnv({
      features: { 'nesting-rules': true },
      importFrom: './src/styles/variables.css'
    })
  ]
};
