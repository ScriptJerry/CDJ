const fs = require("fs");
const Discord = require("discord.js");
const express = require("express");
const ms = require("ms");
const ytdl = require("ytdl-core");

const app = express();
app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200);
});
app.listen(process.env.PORT);

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const config = require("./config.json");


client.on("ready", () => {
  console.log("Bot Iniciado");
  client.user.setActivity("uma transmissão", {
    type: "STREAMING",
    url: "https://www.twitch.tv/jerryscript"
});
});

client.on("message", async message => {
  if(message.author.bot) return
  if(!message.content.startsWith(config.prefix)) return

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(command === "ban"){
    +	client.commands.get("ban").execute(message, args);
  }

  if(command === "mute"){
    +	client.commands.get("mute").execute(message, args);
  }

  if(command === "meme"){
    +	client.commands.get("meme").execute(message, args);
  }

  if(command === "help"){
    +	client.commands.get("help").execute(message, args);
  }

  if(command === "unmute"){
    +	client.commands.get("unmute").execute(message, args);
  }

});


client.login(process.env.TOKEN);