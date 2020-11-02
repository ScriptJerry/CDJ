module.exports = {
  name: "ban",
  description: "Banishment Command",
  execute(message, args) {
    const Discord = require('discord.js')
    const client = new Discord.Client()

    const userBan = message.mentions.users.first()
    const banReason = args.slice(1).join(" ")

    if(!userBan) {
      const embed = new Discord.MessageEmbed()
      .setAuthor("Clone do Jerry", "https://i.imgur.com/Xyqa2x4.png")
      .setTitle("ERRO")
      .setDescription("Usuário não especificado")
      .addField("Formato do comando:", "`x!ban <@usuário>`")
      .setColor("RED")
      .setTimestamp()

      message.channel.send(embed)

      return
    }

    if(userBan === message.author) {
      const embed = new Discord.MessageEmbed()
      .setAuthor("Clone do Jerry", "https://i.imgur.com/Xyqa2x4.png")
      .setTitle("ERRO")
      .setDescription("Você não pode banir você mesmo")
      .addField("Formato do comando:", "`x!ban <@usuário>`")
      .setColor("RED")
      .setTimestamp()

      message.channel.send(embed)

      return
    }

    if(!message.member.hasPermission("BAN_MEMBERS")) {
      const embed = new Discord.MessageEmbed()
      .setAuthor("Clone do Jerry", "https://i.imgur.com/Xyqa2x4.png")
      .setTitle("ERRO")
      .setDescription("Você não tem permissão")
      .setColor("RED")
      .setTimestamp()

      message.channel.send(embed)

      return
    }

    if(!userBan) {
      const embed = new Discord.MessageEmbed()
      .setAuthor("Clone do Jerry", "https://i.imgur.com/Xyqa2x4.png")
      .setTitle("ERRO")
      .setDescription("Usuário não específicado ou o usuário não existe")
      .addField("Formato do comando:", "`x!ban <@usuário>`")
      .setColor("RED")
      .setTimestamp()
      
      message.channel.send(embed)

      return
    }
    
    if(!message.guild.member(userBan).bannable) {
      const embed = new Discord.MessageEmbed()
      .setAuthor("Clone do Jerry", "https://i.imgur.com/Xyqa2x4.png")
      .setTitle("ERRO")
      .setDescription("Não consigo banir este usuário, talvez o cargo do mesmo seja mais alto que o meu, ou ele seja dono do servidor")
      .addField("Formato do comando:", "`x!ban <@usuário>`")
      .setColor("RED")
      .setTimestamp()

      message.channel.send(embed)

      return
    }

  message.guild.members.ban(userBan);

  const embed = new Discord.MessageEmbed()
  .setAuthor("Clone do Jerry", "https://i.imgur.com/Xyqa2x4.png")
  .setTitle("BANIDO")
  .setDescription(`<@${userBan.id}> foi banido`)
  .addField("Motivo:",`${banReason}`)
  .setColor("GREEN")
  .setTimestamp()

  message.channel.send(embed)
}};