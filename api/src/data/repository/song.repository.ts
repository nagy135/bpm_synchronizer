import { EntityRepository, Repository } from 'typeorm';

import SongEntity from '@entity/song.entity';

// import { ERR_APP_SOLD_OUT } from '@utils/app-errors';
// import AppException from '@exception/app.exception';
// import { TOptionalUpdate } from '@ctypes/common';
//
@EntityRepository(SongEntity)

/**
 * Song Entity Repository
 *
 * @author Viktor Nagy <viktor.nagy@01people.com>
 */
export default class SongEntityRepository extends Repository<SongEntity> {}
