import * as songService from '../../src/services/songService.js';
import * as songRepository from '../../src/repositories/songRepository.js';
import SongError from '../../src/errors/SongError.js';

describe('Song Service', () => {
  test('Should throw a SongError when name is already in use', async () => {
    jest
      .spyOn(songRepository, 'findSongByName')
      .mockImplementationOnce(() => 1);

    const promise = songService.createSong({ name: 'test' });
    await expect(promise).rejects.toThrowError(SongError);
  });

  test('Should throw a SongError when link is already in use', async () => {
    jest
      .spyOn(songRepository, 'findSongByName')
      .mockImplementationOnce(() => 0);

    jest
      .spyOn(songRepository, 'findSongByLink')
      .mockImplementationOnce(() => 1);

    const promise = songService.createSong({ youtubeLink: 'test' });
    await expect(promise).rejects.toThrowError(SongError);
  });

  test('Should return new song for valid name and valid link', async () => {
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

  test('Should throw a SongError when id is from a song that does not exist', async () => {
    jest
      .spyOn(songRepository, 'findSongById')
      .mockImplementationOnce(() => undefined);

    const promise = songService.voteForSong({ id: 9999 });
    await expect(promise).rejects.toThrowError(SongError);
  });

  test('Should return the song from id with score increased by 1', async () => {
    jest.spyOn(songRepository, 'findSongById').mockImplementationOnce(() => ({
      id: 1,
      name: 'test',
      youtubeLink: 'test',
      score: 0,
    }));

    jest.spyOn(songRepository, 'updateSong').mockImplementationOnce(() => ({
      id: 1,
      name: 'test',
      youtubeLink: 'test',
      score: 1,
    }));

    const result = await songService.voteForSong({
      id: 1,
      voteType: 'upvote',
    });

    expect(result).toEqual({
      id: 1,
      name: 'test',
      youtubeLink: 'test',
      score: 1,
    });
  });

  test('Should return nothing when song is downvoted below -5', async () => {
    jest.spyOn(songRepository, 'findSongById').mockImplementationOnce(() => ({
      id: 1,
      name: 'test',
      youtubeLink: 'test',
      score: -5,
    }));

    jest.spyOn(songRepository, 'deleteSong').mockImplementationOnce(() => ({}));

    const result = await songService.voteForSong({
      id: 1,
      voteType: 'downvote',
    });

    expect(result).toEqual({});
  });

  test('Should return a song with a score of -5', async () => {
    jest.spyOn(songRepository, 'findSongById').mockImplementationOnce(() => ({
      id: 1,
      name: 'test',
      youtubeLink: 'test',
      score: -4,
    }));

    jest.spyOn(songRepository, 'updateSong').mockImplementationOnce(() => ({
      id: 1,
      name: 'test',
      youtubeLink: 'test',
      score: -5,
    }));

    const result = await songService.voteForSong({
      id: 1,
      voteType: 'downvote',
    });

    expect(result).toEqual({
      id: 1,
      name: 'test',
      youtubeLink: 'test',
      score: -5,
    });
  });

  test('Should return a song with a score of -4', async () => {
    jest.spyOn(songRepository, 'findSongById').mockImplementationOnce(() => ({
      id: 1,
      name: 'test',
      youtubeLink: 'test',
      score: -3,
    }));

    jest.spyOn(songRepository, 'updateSong').mockImplementationOnce(() => ({
      id: 1,
      name: 'test',
      youtubeLink: 'test',
      score: -4,
    }));

    const result = await songService.voteForSong({
      id: 1,
      voteType: 'downvote',
    });

    expect(result).toEqual({
      id: 1,
      name: 'test',
      youtubeLink: 'test',
      score: -4,
    });
  });

  test('Should throw a SongError when there are no songs available', async () => {
    jest
      .spyOn(songRepository, 'selectTopSongs')
      .mockImplementationOnce(() => []);

    const promise = songService.topSongs({ amount: 100 });
    await expect(promise).rejects.toThrowError(SongError);
  });

  test('Should return 3 in descending order of score', async () => {
    jest.spyOn(songRepository, 'selectTopSongs').mockImplementationOnce(() => [
      {
        id: 2,
        name: 'test1',
        youtubeLink: 'test1',
        score: 5,
      },
      {
        id: 1,
        name: 'test2',
        youtubeLink: 'test2',
        score: 4,
      },
      {
        id: 3,
        name: 'test3',
        youtubeLink: 'test3',
        score: 3,
      },
    ]);

    const result = await songService.topSongs({ amount: 3 });

    expect(result.length).toBe(3);
    expect(result).toEqual([
      {
        id: 2,
        name: 'test1',
        youtubeLink: 'test1',
        score: 5,
      },
      {
        id: 1,
        name: 'test2',
        youtubeLink: 'test2',
        score: 4,
      },
      {
        id: 3,
        name: 'test3',
        youtubeLink: 'test3',
        score: 3,
      },
    ]);
  });

  test('Should throw a SongError when there are no songs available', async () => {
    jest
      .spyOn(songRepository, 'selectAllSongs')
      .mockImplementationOnce(() => []);

    const promise = songService.randomSong();
    await expect(promise).rejects.toThrowError(SongError);
  });

  test('Should return a song with score above 10', async () => {
    jest.spyOn(songRepository, 'selectAllSongs').mockImplementationOnce(() => [
      {
        id: 2,
        name: 'test1',
        youtubeLink: 'test1',
        score: 11,
      },
      {
        id: 3,
        name: 'test3',
        youtubeLink: 'test3',
        score: 12,
      },
      {
        id: 1,
        name: 'test2',
        youtubeLink: 'test2',
        score: 13,
      },
    ]);

    const result = await songService.randomSong();
    expect(result.score).toBeGreaterThan(10);
  });
});
