module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:vue/essential', 'airbnb-base'],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  globals: {
    // 设置全局变量【变量不需要定义即可使用】
    NodeJS: true,
    defineProps: true,
    defineEmits: true,
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    semi: 0, // 不加分号
    'vue/no-multiple-template-root': 'off', // 允许 template 有多个子节点
    'vue/no-v-model-argument': 'off', // 允许 v-model 携带属性
    'import/extensions': [
      // 导入文件不写后缀名
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
}
