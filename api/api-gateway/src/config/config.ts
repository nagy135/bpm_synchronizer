export interface IConfig {
  service: string;
  userRole: string;
  adminRole: string;
  port: number;
}

const config: IConfig = {
  service: 'api-gateway',
  userRole: 'cbae4f81-a1df-4ef3-9a48-9ad28a21af3a',
  adminRole: '7c70e397-45c0-47e7-a5f1-b220b21fe55d',
  port: 7000,
};

export default config;
