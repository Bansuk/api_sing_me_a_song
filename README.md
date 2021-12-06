# Sing Me a Song

A straightforward tool for youtube songs recommendations. You can randomly get any song or, if you just want to go with the crowd, you can filter the top songs by their scores. Still not happy with the results? Not a problem! You can post a song, upvote or downvote a existing one.

You can try it at: https://sing-me-a-song-bb.herokuapp.com/recommendations/
- /random - randomly selects a song
- /top/[amount] - displays the top amount of your choice songs

## About

This is an web application that uses youtube links to recommend and rank songs. These are the currently implemented features:

- Add a new song informing its name and its youtube URL through an object,
- Upvote/downvote a specific song through its id (if a song score reachs a value below -5, it's removed)
- Get a random song from the database (if there are songs varying from -5 to above 10, 70% of the time it will display a song with a score higher than 10, in the other 30%, scores below or equal to 10,
- Displays a list of the songs with highest scores in descending order, the number of songs displayed can be determined

## Technologies

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

## How to Run

**1. Clone the Repository**

```
$ git clone https://github.com/Bansuk/api_sing_me_a_song
```

**2. Install dependencies**


```
$ npm i
```


**3. Run the apllication**


```
$ npm start
```

**4. Lastly, use a tool like Postman or Thunder Client to interact with the app**
