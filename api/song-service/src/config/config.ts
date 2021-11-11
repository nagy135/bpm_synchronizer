export interface IConfig {
  service: string;
  port: number;
}

const config: IConfig = {
  service: 'market-service',
  port: 7000,
};

export default config;
