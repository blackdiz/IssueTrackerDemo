'use strict';

module.exports = {
  apps: [
    {
      name: 'issue-tracker-demo',
      script: './src/app.js',
      env: {
        watch: 'src',
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
};
