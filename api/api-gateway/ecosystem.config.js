module.exports = {
  apps: [
    {
      name: 'api-gateway',
      script: 'src/index.ts',
      node_args: '-r tsconfig-paths/register -T',
      watch: true,
      ignore_watch: ['node_modules', 'tests'],
    },
  ],
};
