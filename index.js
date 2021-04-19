const BootBot = require('bootbot');
const config = require('config');
const fetch = require("node-fetch");

const port = process.env.PORT || config.get('PORT');

// bot settings
const bot = new BootBot({
  accessToken: config.get('ACCESS_TOKEN'),
  verifyToken: config.get('VERIFY_TOKEN'),
  appSecret: config.get('APP_SECRET')
});

// base uri for call to server
const APP_LIBRARY_REGISTRY_BASE_URI = "https://uuapp.plus4u.net/uu-applibraryregistry-maing01/fe96c133c895434bbd4d5b24831483f3";
// library code regexp
const LIBRARY_CODE_REGEXP = /^[A-Z][A-Za-z0-9]*(?:\.[A-Z][A-Za-z0-9]*)?$/;

// bot.on('message', (payload, chat) => {
//   const text = payload.message.text;
//   console.log(`The user said: ${text}`);
// });

// callbacks and options for ask
const askParams = [null, { typing: true }];

// values for ask with quick answers
const infoReplies = ["Find documentation", "Send issue", "Get source code", "Get dependencies"];

// start of conversation
bot.hear(/[Hh]ello|[Hh]i/, (payload, chat) => {
  chat.conversation(conv => {
    conv.ask(
      "Hello, what library are you looking for?",
      (...args) => answerLibrary(chat, ...args),
      ...askParams
    );
  });
});

// Answer to user, who sent a code of the library
async function answerLibrary(chat, { message: { text } }, conv) {
  // for closing conversation
  if (/bye|nothing/i.test(text)) {
    conv.say("Bye.");
    conv.end();

    // check library code as an answer
  } else if (LIBRARY_CODE_REGEXP.test(text.trim())) {

    // load data about the library
    const data = await fetch(APP_LIBRARY_REGISTRY_BASE_URI + "/library/load?code=" + text)
      .then(res => res.json());

    // library does not exist
    if (data.uuAppErrorMap["uu-applibraryregistry-main/library/load/libraryDoesNotExist"]) {
      conv.ask(`Library ${text} does not exist. Try it again.`,
        (...args) => answerLibrary(chat, ...args));
    } else {

      // set data to be able in another ask in conversation
      conv.set("library", data);

      // show image of the library (content disposition attachment is not displayed)
      chat.say({ attachment: "image", url: data.imageUri });

      conv.say(`The library ${text} is actually released in version ${data.version}.`).then(() => {
        conv.ask(
          { text: "What would you like to do?", quickReplies: infoReplies },
          answerLibraryInfo, ...askParams
        );
      });
    }
  } else {
    conv.ask(`'${text}' is not a code of a library. Try it again.`,
      (...args) => answerLibrary(chat, ...args));
  }
}

// Answer to user, who chose some type of information about library
async function answerLibraryInfo({ message: { text } }, conv) {
  // load data from memory
  const data = conv.get("library");

  // function for next step
  const somethingElse = () => {
    conv.ask(
      { text: "Would you like to know something else?", quickReplies: infoReplies },
      answerLibraryInfo, ...askParams
    );
  };

  // switch of answers
  if (/no|nothing|bye/i.test(text)) {
    conv.say("Ok, bye.");
    conv.end();
  } else if (/doc/i.test(text)) {
    conv.say(`You can see documentation here: ${data.docUri}`);
    conv.sendTypingIndicator(1000).then(() => somethingElse());
  } else if (/issue/i.test(text)) {
    conv.say(`You can send issue here: ${data.flsUri}`);
    conv.sendTypingIndicator(1000).then(() => somethingElse());
  } else if (/source/i.test(text)) {
    conv.say(`You can see the source code here: ${data.sourceUri.replace(/\.min\.js$/, ".js")}`);
    conv.sendTypingIndicator(1000).then(() => somethingElse());
  } else if (/dependenc(y|ies)/i.test(text)) {
    conv.say(`The library ${data.code} requires these dependencies: ${Object.keys(data.dependencyMap).join(", ")}`);
    conv.sendTypingIndicator(1000).then(() => somethingElse());
  } else {
    conv.ask(
      {
        text: "I do not understand what do you need. Choose one of those:",
        quickReplies: infoReplies
      },
      answerLibraryInfo, ...askParams);
  }
}

// key for goodbye
bot.hear(/bye/i, (payload, chat) => {
  chat.say("Bye.");
});

// bot starting
bot.start(port);