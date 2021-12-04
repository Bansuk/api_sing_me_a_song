import * as songService from '../services/songService.js';
import { isSongInputValid } from '../validations/songValidation.js';
import SongError from '../errors/SongError.js';

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

const newUpVote = async (req, res, next) => {
  const { id } = req.params;

  try {
    const updatedSong = await songService.upvoteASong({ id });
    return res.status(200).send(updatedSong);
  } catch (error) {
    if (error instanceof SongError) return res.status(404).send(error.message);
    next(error);
  }
};

export { newSong, newUpVote };
