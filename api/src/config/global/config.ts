import { URL } from 'url';

type getUri = (name: string) => string;

export interface IGlobalConfig {
  services: any;
  internalServices: string[];
  getServiceUri: getUri;
}
const services = (): string[] => {
  const allowedServices: any = {};
  const internal: string[] = process.env.ALLOWED_INTERNAL_SERVICES
    ? process.env.ALLOWED_INTERNAL_SERVICES.split(',')
    : [];
  for (const service of internal) {
    allowedServices[service] = process.env[service];
  }

  const external: string[] = process.env.ALLOWED_EXTERNAL_SERVICES
    ? process.env.ALLOWED_EXTERNAL_SERVICES.split(',')
    : [];
  for (const service of external) {
    allowedServices[service] = process.env[service];
  }

  return allowedServices;
};

const internalServices = (): string[] => {
  const internalServices: string[] = [];
  const internal: string[] = process.env.ALLOWED_INTERNAL_SERVICES
    ? process.env.ALLOWED_INTERNAL_SERVICES.split(',')
    : [];

  for (const service of internal) {
    const url = new URL(process.env[service] as string);
    internalServices.push(url.origin);
  }
  return internalServices;
};

const getServiceUri: getUri = (name: string): string =>
  `${globalConfig.services[`${name}`]}`;

const globalConfig: IGlobalConfig = {
  services: services(),
  getServiceUri,
  internalServices: internalServices(),
};

export default globalConfig;
