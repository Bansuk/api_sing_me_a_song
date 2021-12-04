import * as songService from '../../src/services/songServices.js';
import * as songRepository from '../../src/repositories/songRepository.js';
import SongError from '../../src/errors/SongError.js';

describe('Song Service', () => {
  test('Should throw a SongError', async () => {
    jest
      .spyOn(songRepository, 'findSongByName')
      .mockImplementationOnce(() => 1);

    const name = 'test';
    const promise = songService.createSong({ name });
    await expect(promise).rejects.toThrowError(SongError);
  });
});
