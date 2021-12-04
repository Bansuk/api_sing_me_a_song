import * as songRepository from '../repositories/songRepository.js';
import SongError from '../errors/SongError.js';

const createSong = async ({ name, youtubeLink }) => {
  const isNameInUse = await songRepository.findSongByName(name);

  if (isNameInUse) throw new SongError('This song is already in use.');

  const isLinkInUse = await songRepository.findSongByLink({ youtubeLink });

  if (isLinkInUse) throw new SongError('This video is already in use.');

  const score = 0;

  const newSong = await songRepository.insertSong({ name, youtubeLink, score });

  return newSong;
};

const upvoteASong = async ({ id }) => {
  const song = await songRepository.findSongById({ id });

  if (!song) throw new SongError('This song does not exist.');

  const newScore = song.score + 1;

  const updatedSong = await songRepository.updateSong({ id, newScore });

  return updatedSong;
};

export { createSong, upvoteASong };
