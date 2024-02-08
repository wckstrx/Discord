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
    .setURL('https://www.twitch.tv/wckstrx') //Must be a youtube video link 
    .setState('Recording')
    .setName('')
    .setDetails(`xx [${formatTime()}]`)
    .setStartTimestamp(Date.now())
 .setAssetsLargeImage('https://media.discordapp.net/attachments/1160972654455570574/1204810321554837504/image.png?ex=65d6160c&is=65c3a10c&hm=6ba127819bc0e9435b503fbe7043152e02b670f3b1e9befca552a9352170f361&=&format=webp&quality=lossless') //You can put links in tenor or discord and etc.
    .setAssetsLargeText('vibing') //Text when you hover the Large image
    .setAssetsSmallImage('https://i.pinimg.com/originals/c3/d2/2f/c3d22f62f84cef0172158c4cad2345cb.gif') //You can put links in tenor or discord and etc.
    .setAssetsSmallText('Kitty') //Text when you hover the Small image
    .addButton('Watch', 'https://youtu.be/fZzz9UIZvRA')
    .addButton('Join', 'https://discord.com/invite/hurry');

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

const mySecret = process.env[''];
client.login(mySecret);
