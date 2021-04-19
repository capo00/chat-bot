# ChatBot for searching info about uu5 library

You can send a code of the library and chat bot return to you basic information and some specific data about the library.

## For Users
* You can start with chat by **Hi** or **Hello**
* ChatBot ask to you about the code of the library which are you looking for.
* Write a code of existing library e.g. UU5.Imaging or you can close the conversation with **bye**
* ChatBot ask to you about specific info about the library.
* You can choose one of these possibilities: **Find documentation**, **Send issue**, **Get source code**,
**Get dependencies**.
* ChatBot give you the information if it understands to your answer or say to you, it does not know, what you want to.
Then ChatBot ask you the same question again.
* You can anytime close the conversation by **bye**.

## For Develoopers

### Start
* https://github.com/snopedom/facebook-bot/blob/master/article.md#facebook-dev-panel-time
* https://developers.facebook.com/ -> MyApps -> ChatBot
* In left menu, there is Messenger > Settings -> Section Access Tokens - button Generate Token -> copy to config/default.json to ACCESS_TOKEN
* In left menu, there is Settings > Basic -> App Secret -> Show -> cop to default.json to APP_SECRET
* In console: yarn startTunnel
* In another console: yarn startDev
* Copy Webhook url and Verify token from startTunnel terminal to developers.facebook.com -> Messenger -> Settings -> Section Webhooks - Edit callback url
* In terminal startDev there will be a message "Validation Succeded"
* Go to your FB page with chatbot (https://www.facebook.com/Chat-Bot-105976891540050) -> show as visitor -> using chat
* BootBot API: https://github.com/Charca/bootbot

### Heroku
* https://heroku.com/ -> Sign In
* New -> Create new App
* ...
* After App creation, go to tab Deploy -> download Heroku CLI
* In current git repository (e.g. on github) in console there enter "heroku git:remote -a chat-bot-2021"
* add Procfile, which contains
`web: yarn start`
* push to masteru
* push to heroku
`git push heroku master
// or
git push heroku master --force`
* Last step also deploy it to production, then it is necessary to connect it with FB:
* In heroku there go to tab Settings -> section Domains -> copy url to developers.facebook.com -> Messenger -> Settings -> section Webhooks - Edit callback url
* Verify Token is the same one as in config/default.json 