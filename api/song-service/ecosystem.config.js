module.exports = {
  apps: [
    {
      name: 'song-service-api',
      script: 'src/index.ts',
      node_args: '-r tsconfig-paths/register -T',
      watch: true,
      ignore_watch: ['node_modules', 'tests'],
      env: {
        NODE_OPTIONS: '--inspect=0.0.0.0:9229',
      },
    },
  ],
};
