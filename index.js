require("dotenv").config();

// Discord
const { Client } = require("discord.js");
const client = new Client({ intents: 2048 });
const token = process.env.DS_TOKEN;

/* 
client.on("ready", () => {
  console.log("Bot Now connected!");
  console.log("Logged In as", client.user.tag);
  client.user.setStatus("online"); // online, idle, invisible, dnd

  console.log(`Bot status: ${client.user.presence.status}`);
});
*/

// Twitter
const Twitter = require("twit");
const twitterConf = {
  consumer_key: process.env.API_KEY,
  consumer_secret: process.env.API_KEY_SECRET,
  access_token: process.env.USER_ACCESS_TOKEN,
  access_token_secret: process.env.USER_ACCESS_TOKEN_SECRET,
  bearer_token: process.env.BEARER_TOKEN,
};
var twitterClient = new Twitter(twitterConf);

client.once("ready", () => {
  console.log("Bot Now connected!");
  console.log("Logged In as", client.user.tag);
  client.user.setStatus("online"); // online, idle, invisible, dnd

  console.log(`Bot status: ${client.user.presence.status}`);

  var stream = twitterClient.stream("statuses/filter", {
    follow: [process.env.TWITTER_USER_ID],
  });

  stream.on("tweet", (tweet) => {
    console.log(tweet);
    const twitterMessage = `${tweet.user.name} (@${tweet.user.screen_name}) tweeted this: https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`;
    client.channels.cache
      .get(process.env.DISCORD_CHANNEL_ID)
      .send(twitterMessage);
  });
});

// error
client.on("error", (err) => {
  console.log(err.message);
});

client.login(token);
