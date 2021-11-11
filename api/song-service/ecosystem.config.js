module.exports = {
  apps: [
    {
      name: 'market-service-api',
      script: 'src/index.ts',
      node_args: '-r tsconfig-paths/register -T',
      watch: true,
      ignore_watch: ['node_modules', 'tests'],
      env: {
        NODE_OPTIONS: '--inspect=0.0.0.0:9229',
      },
    },
    {
      name: 'market-service-jobs',
      script: 'src/job/index.ts',
      node_args: '-r tsconfig-paths/register -T',
      watch: true,
      ignore_watch: ['node_modules', 'tests'],
    },
  ],
};
