import * as songRepository from '../repositories/songRepository.js';
import SongError from '../errors/SongError.js';

const createSong = async ({ name, youtubeLink }) => {
  const isNameInUse = await songRepository.findSongByName(name);

  if (isNameInUse) throw new SongError(`A música ${name} já existe!`);

  const isLinkInUse = await songRepository.findSongByLink({ youtubeLink });

  if (isLinkInUse) throw new SongError('Esse vídeo já está em uso!');

  const score = 0;

  const newSong = await songRepository.insertSong({ name, youtubeLink, score });

  return newSong;
};

export { createSong };
