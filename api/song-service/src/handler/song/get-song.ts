import { getCustomRepository } from 'typeorm';
import SongEntity from '@entity/song.entity';

export default async (data: any): Promise<void> => {
  const songRepository = getCustomRepository(SongEntity);

  const { songId } = data;
};
