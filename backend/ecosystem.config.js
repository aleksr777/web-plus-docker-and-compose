module.exports = {
  apps: [
    {
      name: 'backend',
      script: './dist/main.js',
      env: {
        PORT: process.env.SERVER_PORT,
        NODE_ENV: 'production',
      },
    },
  ],
};
