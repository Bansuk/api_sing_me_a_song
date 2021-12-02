import * as songService from '../services/songServices.js';
import SongError from '../errors/SongError';

const newSong = async (req, res) => {
  const { name, youtubeLink } = req.body;

  try {
    const song = await songService.createSong({ name, youtubeLink });
    return song;
  } catch (error) {
    if (error instanceof SongError) return res.status(409).send(error.message);
    throw error;
  }
};

export { newSong };
