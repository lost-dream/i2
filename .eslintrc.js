module.exports = {
  root: true,
  env: {
    node: true,
    jquery: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard',
    'plugin:prettier/recommended',
  ],
  plugins: ['vue', 'prettier'],
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    semi: 0,
    'no-tabs': 'off',
    eqeqeq: 'off',
    'vue/no-side-effects-in-computed-properties': 'off',
    'no-unused-expressions': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
}
