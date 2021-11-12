/**
 * @author Viktor Nagy <viktor.nagy@01people.com>
 */
export const buildSongServiceUrl = (path: string): any => {
  const serviceUrl = process.env.song_service;

  return `${serviceUrl}${path}`;
};

export const getRoomName = (itemId: string): any => `room_${itemId}`;
