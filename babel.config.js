module.exports = (api) => {  
  api.cache(true);

  if (process.env.NODE_ENV === 'test') {
    return {
      // Required for Jest https://jestjs.io/docs/en/getting-started.html#using-typescript
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        '@babel/preset-typescript',
      ],
    };
  }
};