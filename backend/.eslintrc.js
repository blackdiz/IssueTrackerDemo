module.exports = {
  extends: ['airbnb-base', 'prettier'],
  parserOptions: {
    sourceType: 'script'
  },
  env: {
    node: true,
    mocha: true
  },
  rules: {
    'no-use-before-define': ['warn', { functions: false }]
  }
};
