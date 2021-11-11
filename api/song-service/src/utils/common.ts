import { SelectQueryBuilder, Repository, BaseEntity } from 'typeorm';
import { TPaginationOptions, TPaginationResult } from '@ctypes/common';
import {
  isFileExistingOnGCS,
  getPublicLink,
} from '@utils/google-cloud-storage';

import { v4 as uuidv4 } from 'uuid';

/**
 * Sum array of numbers
 *
 */
export const sumArray = (arr: number[]) => arr.reduce((a, b) => a + b, 0);

/**
 * Return string[] from Enum with string values
 *
 * @author Viktor Nagy <viktor.nagy@01people.com>
 */
export const enumToStringValues = (myEnum: any): string[] =>
  Object.values(myEnum) as string[];

/**
 * returns new object with same values but keys remapped
 * according to {[key: string]: string} mapping
 *
 * @author Viktor Nagy <viktor.nagy@01people.com>
 */
export const remapKeys = (
  obj: any,
  mapping: { [key: string]: string },
  allowOthers = false
): { [key: string]: string } => {
  let keys = Object.keys(obj);
  if (!allowOthers)
    keys = keys.filter((key) => Object.keys(mapping).includes(key));

  const remappedArray = keys.map((key) => {
    const newKey = mapping[key] || key;
    return { [newKey]: obj[key] };
  });

  return Object.assign({}, ...remappedArray);
};

/**
 * refactor function
 * generate simple SelectQueryBuilder<T> from Repository<T>
 * with chained and/or to avoid some code repetitions
 *
 * pairs = {
 *   entityProperty: value
 * }
 *
 * @author Viktor Nagy <viktor.nagy@01people.com>
 */
export const generateSelectQueryBuilder = <T>(
  repository: Repository<T>,
  pairs: { [key: string]: string },
  type: 'and' | 'or' = 'and'
): SelectQueryBuilder<T> => {
  const queryBuilder = repository.createQueryBuilder('self');
  let first = true;
  Object.entries(pairs).forEach(([key, value]) => {
    const replacementPair: { [key: string]: string } = {};
    const replacementString = `self.${key} = :${key}`;
    replacementPair[key] = value;
    if (first) {
      queryBuilder.where(replacementString, replacementPair);
      first = false;
    } else {
      type === 'and'
        ? queryBuilder.andWhere(replacementString, replacementPair)
        : queryBuilder.orWhere(replacementString, replacementPair);
    }
  });
  return queryBuilder;
};

/**
 * Returns paginates result of passed in query builder
 * Generic over T: Entity
 *
 * @author Viktor Nagy <viktor.nagy@01people.com>
 */
export const getPaginatedResult = async <T extends BaseEntity>(
  builder: SelectQueryBuilder<T>,
  paginationChanges: TPaginationOptions,
  requestData: TPaginationOptions
): Promise<TPaginationResult<T>> => {
  const paginationOptions: TPaginationOptions = {
    page: 1,
    pageSize: 10,
    sortBy: 'createdAt',
    direction: 'DESC',
  };

  Object.assign(paginationOptions, paginationChanges);
  Object.assign(paginationOptions, requestData);

  const { page, pageSize, sortBy, direction } = <TPaginationOptions>(
    paginationOptions
  );

  if (sortBy) {
    builder.orderBy(`self.${sortBy}`, direction);
  }

  const normalizedPageSize = Number(pageSize);
  const normalizedPage = Number(page);

  builder
    .offset((normalizedPage - 1) * normalizedPageSize)
    .limit(normalizedPageSize);

  const [items, total] = await builder.getManyAndCount();
  return {
    items,
    pagination: {
      total,
      pageSize: normalizedPageSize,
      current: normalizedPage,
    },
  };
};

/**
 * https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
 *
 * @author Viktor Nagy <viktor.nagy@01people.com>
 */
export const generateRandomString = (length: number) => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const storageIdToPublicLink = async (
  storageId: string
): Promise<string | null> => {
  return storageId && (await isFileExistingOnGCS(storageId))
    ? await getPublicLink(storageId)
    : null;
};

/**
 * return order as string of issued length
 * (7, 5555) => #0007
 *
 * @author Viktor Nagy <viktor.nagy@01people.com>
 */
export const printableOrder = (order: number, issued: number): string => {
  return '#' + order.toString().padStart(issued.toString().length, '0');
};

export const generateUuid4 = () => uuidv4();
