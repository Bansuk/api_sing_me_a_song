import joi from 'joi';

const songSchema = joi.object({
  name: joi.string().max(255).required(),
  youtubeLink: joi
    .string()
    .pattern(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/),
});

const isSongInputValid = ({ name, youtubeLink }) => {
  if (songSchema.validate({ name, youtubeLink }).error) return false;
  return true;
};

export { isSongInputValid };
