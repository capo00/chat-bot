const BootBot = require('bootbot');
const config = require('config');
const fetch = require("node-fetch");

var port = process.env.PORT || config.get('PORT');

const MOVIE_API = "http://www.omdbapi.com/?apikey=8df4f6a8";

const bot = new BootBot({
  accessToken: config.get('ACCESS_TOKEN'),
  verifyToken: config.get('VERIFY_TOKEN'),
  appSecret: config.get('APP_SECRET')
});

bot.on('message', (payload, chat) => {
  const text = payload.message.text;
  console.log(`The user said: ${text}`);
});

bot.hear(['hello', 'hi'], (payload, chat) => {
  //console.log('The user said "hello" or "hi"!', payload);
  chat.say("Hi! Tell me 'movie' and the name of the movie.");
});

bot.hear(/movie\s+(.*)/, (payload, chat, data) => {
  chat.conversation(async conversation => {
    console.log(data);
    const movieName = data.match[1];
    console.log(movieName);

    const movie = await fetch(MOVIE_API + "&t=" + movieName).then(res => res.json());

    console.log(movie);

    if (movie.Response === "False") {
      conversation.say(`I coud not find the movie "${movieName}".`);
    } else {
      conversation.say(`The movie "${movieName}" is from ${movie.Year} and was directed by ${movie.Director}.`);
    }

    conversation.end();
  });
});

bot.start(port);