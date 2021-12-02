class SongError extends Error {
  constructor(message) {
    super(message);
    this.name = 'SongError';
  }
}

export default SongError;
