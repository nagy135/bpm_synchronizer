import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

import {
  RESPONSE_STATUS_OK,
  STATUS_HTTP_OK,
  STATUS_HTTP_BAD_REQUEST,
  RESPONSE_STATUS_NOK,
} from '@utils/http-codes';
import { TApplicationError } from '@utils/app-errors';

import SongHandler from '@handler/songs';

/**
 * lists all songs, paginated
 *
 * @author Viktor Nagy <viktor.nagy@01people.com>
 */
export const getSongs = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | TApplicationError | undefined> => {
  try {
    const data = await SongHandler.getSongs(req.query);

    return res.status(STATUS_HTTP_OK).send({
      status: RESPONSE_STATUS_OK,
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Uploads single file original
 *
 * @author Viktor Nagy <viktor.nagy@01people.com>
 */
export const uploadSong = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | TApplicationError | undefined> => {
  try {
    const file = req.file;
    if (!file)
      return res.status(STATUS_HTTP_BAD_REQUEST).send({
        status: RESPONSE_STATUS_NOK,
      });

    const rootDirectory = path.resolve('./');
    const tmpFile = path.join(rootDirectory, file.path);
    console.log(
      '================\n',
      'tmpFile: ',
      tmpFile,
      '\n================'
    );
    fs.rename(
      tmpFile,
      `${rootDirectory}/uploaded/songs/${file.originalname}`,
      function () {
        console.log(
          `MOVED TO: ${rootDirectory}/uploaded/songs/${file.originalname}`
        );
      }
    );

    return res.status(STATUS_HTTP_OK).send({
      status: RESPONSE_STATUS_OK,
    });
  } catch (error) {
    next(error);
  }
};
