import * as songService from '../services/songServices.js';
import { isSongInputValid } from '../validations/songValidation.js';
import SongError from '../errors/SongError';

const newSong = async (req, res, next) => {
  if (!isSongInputValid(req.body)) return res.sendStatus(400);

  const { name, youtubeLink } = req.body;

  try {
    const song = await songService.createSong({ name, youtubeLink });
    return res.status(201).send(song);
  } catch (error) {
    if (error instanceof SongError) return res.status(409).send(error.message);
    next(error);
  }
};

export { newSong };
