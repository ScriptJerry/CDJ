module.exports = {
  name: "help",
  description: "executes help command",
  execute(message, args) {
    const Discord = require("discord.js")
    const client = new Discord.Client()

    const embed = new Discord.MessageEmbed()
    .setTitle("Lista de Comandos")
    .setDescription("Lista de comandos do CDJ (Clone do Jerry) e suas funções")
    .setAuthor("Clone do Jerry", "https://i.imgur.com/Xyqa2x4.png")
    .addField("x!ban <@usuário>", "`Bane um usuário`")
    .addField("x!mute <@usuário> <minutos>", "`Silencia um usuário por determinado tempo`")
    .addField("x!unmute <@usuário>", "`Revoga o silenciamento de um usuário`")
    .addField("x!meme", "`Compartilha um meme do subreddit r/meme`")
    .addField("x!help", "`Exibe este painel`")
    .setTimestamp()
    .setColor("PURPLE")

    message.channel.send(embed)
  }
}