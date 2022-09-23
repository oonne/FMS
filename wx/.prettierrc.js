module.exports = {
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  arrowParens: 'always',
  trailingComma: 'all',
  endOfLine: 'auto', // 不检测文件每行结束的格式
  overrides: [
    {
      files: '*.wxss',
      options: {
        parser: 'css',
      },
    },
  ],
};
