import connection from '../database/database.js';

const insertSong = async ({ name, youtubeLink, score }) => {
  const result = await connection.query(
    'INSERT INTO song (name, link, score) VALUES ($1, $2, $3) RETURNING *',
    [name, youtubeLink, score],
  );

  return result.rowCount[0];
};

const findSongByName = async ({ name }) => {
  const result = await connection.query('SELECT * FROM song WHERE name = $1', [
    name,
  ]);

  return result.rowCount;
};

const findSongByLink = async ({ youtubeLink }) => {
  const result = await connection.query('SELECT * FROM song WHERE link = $1', [
    youtubeLink,
  ]);

  return result.rowCount;
};

export { insertSong, findSongByName, findSongByLink };
