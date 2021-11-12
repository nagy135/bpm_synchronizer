import axios from 'axios';

import { buildSongServiceUrl } from '@utils/common';

export default async (data: Record<string, any>): Promise<any> => {
  return (
    await axios.get(buildSongServiceUrl('/songs'), {
      params: data,
    })
  ).data.data;
};
