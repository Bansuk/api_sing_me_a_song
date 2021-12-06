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

const voteForSong = async ({ id, voteType }) => {
  const song = await songRepository.findSongById({ id });

  if (!song) throw new SongError('This song does not exist.');

  let newScore;

  if (voteType === 'upvote') newScore = song.score + 1;
  else if (voteType === 'downvote') {
    newScore = song.score - 1;
  }

  let updatedSong;

  if (newScore >= -5) updatedSong = await songRepository.updateSong({ id, newScore });
  else updatedSong = await songRepository.deleteSong({ id });

  return updatedSong;
};

const topSongs = async ({ amount }) => {
  const songs = await songRepository.selectTopSongs({ amount });

  if (!songs.length) throw new SongError('There are no songs available.');

  return songs;
};

export { createSong, voteForSong, topSongs };
