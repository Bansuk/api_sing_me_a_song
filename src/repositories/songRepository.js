import connection from '../database/database.js';

const insertSong = async ({ name, youtubeLink, score }) => {
  const result = await connection.query(
    'INSERT INTO song (name, link, score) VALUES ($1, $2, $3) RETURNING *;',
    [name, youtubeLink, score],
  );

  return result.rows[0];
};

const findSongByName = async ({ name }) => {
  const result = await connection.query('SELECT * FROM song WHERE name = $1;', [
    name,
  ]);

  return result.rowCount;
};

const findSongByLink = async ({ youtubeLink }) => {
  const result = await connection.query('SELECT * FROM song WHERE link = $1;', [
    youtubeLink,
  ]);

  return result.rowCount;
};

const findSongById = async ({ id }) => {
  const result = await connection.query('SELECT * FROM song WHERE id = $1;', [
    id,
  ]);

  return result.rows[0];
};

const updateSong = async ({ id, newScore }) => {
  const result = await connection.query(
    'UPDATE song SET score = $1 WHERE id = $2 RETURNING *',
    [newScore, id],
  );

  return result.rows[0];
};

const deleteSong = async ({ id }) => {
  const result = await connection.query('DELETE FROM song WHERE id = $1', [id]);

  return result.rows[0];
};

const selectTopSongs = async ({ amount }) => {
  const result = await connection.query(
    'SELECT * FROM song ORDER BY score DESC LIMIT $1;',
    [amount],
  );

  return result.rows;
};

export {
  insertSong,
  findSongByName,
  findSongByLink,
  findSongById,
  updateSong,
  deleteSong,
  selectTopSongs,
};
