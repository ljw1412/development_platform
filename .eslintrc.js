module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/prettier'],
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'prettier/prettier': 0,
    'no-unused-vars': 0,
    'vue/use-v-on-exact': 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  globals: {
    moment: true,
    Store: true,
    Cookies: true
  }
}
