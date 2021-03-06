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

const newVote = async (req, res, next) => {
  const { id } = req.params;
  const voteType = req.path.slice(req.path.lastIndexOf('/') + 1);

  try {
    const updatedSong = await songService.voteForSong({ id, voteType });
    return res.status(200).send(updatedSong);
  } catch (error) {
    if (error instanceof SongError) return res.status(404).send(error.message);
    next(error);
  }
};

const getTopSongs = async (req, res, next) => {
  const { amount } = req.params;

  try {
    const topSongs = await songService.topSongs({ amount });
    return res.status(200).send(topSongs);
  } catch (error) {
    if (error instanceof SongError) return res.status(404).send(error.message);
    next(error);
  }
};

const getRandomSong = async (req, res, next) => {
  try {
    const randomSong = await songService.randomSong();
    return res.status(200).send(randomSong);
  } catch (error) {
    if (error instanceof SongError) return res.status(404).send(error.message);
    next(error);
  }
};

export {
  newSong, newVote, getTopSongs, getRandomSong,
};
