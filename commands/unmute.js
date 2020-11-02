module.exports = {
  name: "unmute",
  description: "unmute a user",
  execute(message, args) {
    const Discord = require("discord.js")
    const client = new Discord.Client()

    const muteRole = message.guild.roles.cache.find(muteRole => muteRole.name === "Mutado");
    const userMute = message.mentions.members.first()

    if(!message.member.hasPermission("KICK_MEMBERS")) {
      const embed = new Discord.MessageEmbed()
      .setAuthor("Clone do Jerry", "https://i.imgur.com/Xyqa2x4.png")
      .setTitle("ERRO")
      .setDescription("Você não tem permissão")
      .setColor("RED")
      .setTimestamp()

      message.channel.send(embed)

      return
    }

    if(!userMute) {
      const embed = new Discord.MessageEmbed()
      .setAuthor("Clone do Jerry", "https://i.imgur.com/Xyqa2x4.png")
      .setTitle("ERRO")
      .setDescription("Usuário não mencionado ou o usuário não existe")
      .addField("Formato do comando:", "`x!unmute <@usuário>`")
      .setColor("RED")
      .setTimestamp()
      

      message.channel.send(embed)

      return
    }

    if(!userMute.roles.cache.some(role => role.name === "Mutado")) {
      const embed = new Discord.MessageEmbed()
      .setAuthor("Clone do Jerry", "https://i.imgur.com/Xyqa2x4.png")
      .setTitle("ERRO")
      .setDescription("Este usuário não está mutado")
      .addField("Formato do comando:", "`x!unmute <@usuário>`")
      .setColor("RED")
      .setTimestamp()
      

      message.channel.send(embed)

      return
    }
    userMute.roles.remove(muteRole)

    const embed = new Discord.MessageEmbed()
    .setTitle("DESMUTADO")
    .setDescription(`<@${userMute.id}> foi desmutado`)
    .setTimestamp()
    .setAuthor("Clone do Jerry", "https://i.imgur.com/Xyqa2x4.png")
    .setColor("GREEN")

    message.channel.send(embed)
  }
}