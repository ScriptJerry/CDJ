module.exports = {
  name: "mute",
  description: "Tempmute command",
  execute(message, args) {
    const Discord = require("discord.js");
    const client = new Discord.Client()
    const ms = require("ms")

    const muteRole = message.guild.roles.cache.find(muteRole => muteRole.name === "Mutado");
    const userMute = message.mentions.members.first() 
    const timeMute = args.slice(1).join(" ")

    if(!muteRole) {
      try{
        muteRole = message.guild.roles.create({
          data: {
           name: "Mutado",
           color: "#080808",
           permissions: [0]
          }
        })
      } catch(e) {
        console.log(e.stack);
      } 
    }

    if(!message.member.hasPermission("KICK_MEMBERS")) {
      const embed = new Discord.MessageEmbed()
      .setAuthor("Clone do Jerry", "https://i.imgur.com/Xyqa2x4.png")
      .setTitle("ERRO")
      .setDescription("Você não tem permissão")
      .setColor("RED")
      .setTimestamp()

      message.channel.send(embed);

      return
    }

    if(!userMute) {
      const embed = new Discord.MessageEmbed()
      .setAuthor("Clone do Jerry", "https://i.imgur.com/Xyqa2x4.png")
      .setTitle("ERRO")
      .setDescription("Usuário não mencionado ou o usuário não existe")
      .addField("Formato do comando:", "`x!mute <@usuário> <tempo>`")
      .setColor("RED")
      .setTimestamp()

      message.channel.send(embed)
      
      return
    }
    
    if(!userMute.bannable) {
      const embed = new Discord.MessageEmbed()
      .setAuthor("Clone do Jerry", "https://i.imgur.com/Xyqa2x4.png")
      .setTitle("ERRO")
      .setDescription("Este usuário não pode ser mutado pois seu cargo é elevado ou eu não tenho permissões")
      .addField("Formato do comando:", "`x!mute <@usuário> <tempo>`")
      .setColor("RED")
      .setTimestamp()
      
      message.channel.send(embed)

      return
    }

    if(!timeMute) {
      const embed = new Discord.MessageEmbed()
      .setAuthor("Clone do Jerry", "https://i.imgur.com/Xyqa2x4.png")
      .setTitle("ERRO")
      .setDescription("Mencione o tempo para o mute")
      .addField("Formato do comando:", "`x!mute <@usuário> <tempo>`")
      .setColor("RED")
      .setTimestamp()
    
      message.channel.send(embed)

      return
    }

    if(userMute.roles.cache.some(role => role.name === "Mutado")) {
      const embed = new Discord.MessageEmbed()
      .setAuthor("Clone do Jerry", "https://i.imgur.com/Xyqa2x4.png")
      .setTitle("ERRO")
      .setDescription("Este usuário já está mutado, utilize `x!unmute` para desmutar")
      .addField("Formato do comando:", "`x!ban <@usuário>`")
      .setColor("RED")
      .setTimestamp()

      message.channel.send(embed)

      return
    }

    if(userMute === message.author) {
      const embed = new Discord.MessageEmbed()
      .setAuthor("Clone do Jerry", "https://i.imgur.com/Xyqa2x4.png")
      .setTitle("ERRO")
      .setDescription("Você não pode mutar você mesmo")
      .addField("Formato do comando:", "`x!ban <@usuário>`")
      .setColor("RED")
      .setTimestamp()
    
      message.channel.send(embed)

      return
    }

    userMute.roles.add(muteRole.id);
    const embed = new Discord.MessageEmbed()
    .setAuthor("Clone do Jerry", "https://i.imgur.com/Xyqa2x4.png")
    .setTitle("MUTADO")
    .setDescription(`${userMute} foi mutado`)
    .addField("Duração", `${timeMute} minutos`)
    .addField("OBSERVAÇÃO:", `Talvez seja nescessário usar o comando mais de uma vez caso seja a primeira vez usando para o cargo ser gerado, e também ir nas opções de canais e desabilitar a permissão de fala para o cargo <@&${muteRole.id}>`)
    .setColor("GREEN")
    .setTimestamp()
    
    message.channel.send(embed);

    setTimeout(() => {
    userMute.roles.remove(muteRole)
    const embed = new Discord.MessageEmbed()
    .setAuthor("Clone do Jerry", "https://i.imgur.com/Xyqa2x4.png")
    .setTitle("DESMUTADO")
    .setDescription(`${userMute} foi desmutado após ${timeMute} minutos`)
    .setColor("GREEN")
    .setTimestamp()

    message.channel.send(embed)
  }, timeMute * 60000);
  }
}