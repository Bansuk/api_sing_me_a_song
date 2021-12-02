import connection from '../database/database.js';

const insertSong = async ({ name, youtubeLink, score }) => {
  const result = await connection.query(
    'INSERT INTO song (name, link, score) VALUES ($1, $2, $3)',
    [name, youtubeLink, score],
  );

  return result.rowCount;
};

export { insertSong };
