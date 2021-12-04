import * as songService from '../../src/services/songServices.js';
import * as songRepository from '../../src/repositories/songRepository.js';
import SongError from '../../src/errors/SongError.js';

describe('Song Service', () => {
  test('Should throw a SongError when name is already in use', async () => {
    jest
      .spyOn(songRepository, 'findSongByName')
      .mockImplementationOnce(() => 1);

    const name = 'test';
    const promise = songService.createSong({ name });
    await expect(promise).rejects.toThrowError(SongError);
  });

  test('Should return new song for valid name', async () => {
    jest
      .spyOn(songRepository, 'findSongByName')
      .mockImplementationOnce(() => 0);

    jest
      .spyOn(songRepository, 'findSongByLink')
      .mockImplementationOnce(() => 0);

    jest.spyOn(songRepository, 'insertSong').mockImplementationOnce(() => [
      {
        id: 1,
        name: 'test',
        youtubeLink: 'test',
        score: 0,
      },
    ]);

    const result = await songService.createSong({
      name: 'test',
      youtubeLink: 'test',
    });

    expect(result.length).toBe(1);
  });

  test('Should throw a SongError when link is already in use', async () => {
    jest
      .spyOn(songRepository, 'findSongByName')
      .mockImplementationOnce(() => 0);

    jest
      .spyOn(songRepository, 'findSongByLink')
      .mockImplementationOnce(() => 1);

    const youtubeLink = 'test';
    const promise = songService.createSong({ youtubeLink });
    await expect(promise).rejects.toThrowError(SongError);
  });
});
