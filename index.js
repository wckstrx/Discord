const Discord = require('discord.js-selfbot-v13');
const client = new Discord.Client({
  readyStatus: false,
  checkUpdate: false
});

const keepAlive = require('./server.js');
keepAlive();

function formatTime() { //Credits to himika#0001 and never#0001
  const date = new Date();
  const options = {
    timeZone: 'America/New_York', //https://www.zeitverschiebung.net/en/ and find your city and enter here
    hour12: true,
    hour: 'numeric',
    minute: 'numeric'
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

client.on('ready', async () => {
  console.clear();
  console.log(`${client.user.tag} - rich presence started!`);

  const r = new Discord.RichPresence()
    .setApplicationId('1203254646651752509')
    .setType('STREAMING')
    .setURL('https://twitch.tv/wckstrx') //Must be a youtube video link 
    .setName('kys')
    .setDetails(`xx [${formatTime()}]`)
    .setStartTimestamp(Date.now())
 .setAssetsLargeImage('https://i.pinimg.com/564x/db/19/62/db1962fcfcaa310d2e3b078ee1c6041a.jpg') //You can put links in tenor or discord and etc.
    .setAssetsLargeText('xo') //Text when you hover the Large image
    .setAssetsSmallImage('https://i.pinimg.com/originals/c3/d2/2f/c3d22f62f84cef0172158c4cad2345cb.gif') //You can put links in tenor or discord and etc.
    .setAssetsSmallText('smd') //Text when you hover the Small image
    .addButton('♡', 'https://youtu.be/fZzz9UIZvRA')
    .addButton('Join', 'https://discord.com/hurry');

  client.user.setActivity(r);
  client.user.setPresence({ status: "dnd" }); //dnd, online, idle, offline

  let prevTime = null;
  setInterval(() => {
    const newTime = formatTime();
    if (newTime !== prevTime) {
      const newDetails = ` [${newTime}]`;
      r.setDetails(newDetails);
      client.user.setActivity(r);
      prevTime = newTime;
    }
  }, 1000); // Update every second
});

const mySecret = process.env['TOKEN'];
client.login(mySecret);
