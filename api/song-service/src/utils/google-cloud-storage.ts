import { Bucket, Storage } from '@google-cloud/storage';
import { File, GetSignedUrlConfig } from '@google-cloud/storage/build/src/file';
import { promises as fsPromises } from 'fs';
import { Writable } from 'stream';

const LINK_VALID_FOR_TIME = 1000 * 60 * 60; // 1 hour

const BUCKET_NAME: string = process.env.GOOGLE_CLOUD_BUCKET_NAME
  ? process.env.GOOGLE_CLOUD_BUCKET_NAME
  : '';
const PROJECT_ID: string = process.env.GOOGLE_CLOUD_PROJECT_ID
  ? process.env.GOOGLE_CLOUD_PROJECT_ID
  : '';
const BUCKET_PREFIX: string = process.env.GOOGLE_CLOUD_BUCKET_PREFIX
  ? process.env.GOOGLE_CLOUD_BUCKET_PREFIX
  : '';
const CLIENT_EMAIL: string = process.env.GOOGLE_CLOUD_CLIENT_EMAIL
  ? process.env.GOOGLE_CLOUD_CLIENT_EMAIL
  : '';
const PRIVATE_KEY: string = process.env.GOOGLE_CLOUD_PRIVATE_KEY
  ? Buffer.from(
      process.env.GOOGLE_CLOUD_PRIVATE_KEY as string,
      'base64'
    ).toString('utf-8')
  : '';

// Set a client
const storage: Storage = new Storage({
  projectId: PROJECT_ID,
  credentials: {
    client_email: CLIENT_EMAIL,
    private_key: PRIVATE_KEY,
  },
});

// Set a bucket
const bucket: Bucket = storage.bucket(BUCKET_NAME);

const applyPrefix = (location: string) => `${BUCKET_PREFIX}${location}`;

/**
 * Checking if file is existing on Bucket.
 *
 * @author viktor.vogl
 */
export const isFileExistingOnGCS = async (
  fileName: string,
  location = ''
): Promise<boolean> => {
  const file: File = bucket.file(applyPrefix(location) + fileName);

  return (await file.exists())[0];
};

export const getPublicThumbnailURL = (filePath: string): string =>
  `https://storage.googleapis.com/${BUCKET_NAME}/${BUCKET_PREFIX}${filePath}`;

export const getPublicLink = async (filePath: string): Promise<string> => {
  const options: GetSignedUrlConfig = {
    action: 'read',
    expires: Date.now() + LINK_VALID_FOR_TIME,
  };

  return (await bucket.file(applyPrefix(filePath)).getSignedUrl(options))[0];
};

/**
 * Just for testing purposes (manual upload), uploads local file to storage
 *
 * @author Viktor Nagy <viktor.nagy@01people.com>
 */
export const uploadLocalFileToGCS = async (
  localPath: string,
  filePath: string
): Promise<any> => {
  const file: Buffer = await fsPromises.readFile(localPath);
  const gcsLocation: string = applyPrefix(filePath);
  console.log(
    '================\n',
    'uploading new file to GCS: ',
    gcsLocation,
    '\n================'
  );
  const gcsFile: File = bucket.file(gcsLocation);

  return new Promise((resolve: any, reject: any): any => {
    const stream: Writable = gcsFile.createWriteStream({
      resumable: false,
    });
    stream.on('error', reject);
    stream.on('finish', async () => {
      // Make private img like user's profile photo, etc
      // await gcsFile.makePrivate();

      resolve(gcsFile.name);
    });
    stream.end(file);
  });
};
