const { Client, Collection, MessageEmbed, DiscordAPIError, Channel } = require("discord.js");
const Discord = require('discord.js');
const osu = require('node-os-utils')
const mem = osu.mem
const drive = osu.drive
const cpu = osu.cpu
const os = osu.os
const botname = "HeaderOfTHeEmbedChangeMe.js"
const color = "#ffff00"
const footer = "FooterOfTheEmbedChangeMe.js"
module.exports.config = {
    name: "stats",
    aliases: ["stats"]
}

module.exports.run = async (client, message, args) => {
    mem.info().then(Ram => {
     drive.info().then(Disk => {
      cpu.usage().then(Cpu => {
         let DeviceIP = os.ip();
         let time = os.uptime();
           let hours = secondsToHms(time);
                let embed = new Discord.MessageEmbed()
                  .setAuthor(botname) 
                  .setFooter(footer)
                  .setColor(color) 
                  .addField("Ram Usage", `${Math.round(Ram.usedMemMb / 1000)} GB / ${Math.round(Ram.totalMemMb / 1000)}GB`)
                  .addField("Disk Usage", `${Disk.usedGb}GB/${Disk.totalGb}GB`)
                  .addField("CPU Usage", `${Cpu}`)
                  .addField("CPU Type", `${cpu.model()}`)
                message.channel.send(embed);
         }) 
       })
     })
function secondsToHms(seconds) {
  if (!seconds) return '';
    let duration = seconds;
      let hours = duration / 3600;
        duration = duration % (3600);
 
  let min = parseInt(duration / 60);
    duration = duration % (60);
      let sec = parseInt(duration);
 
  if (sec < 10) {
    sec = `0${sec}`;
  }
  if (min < 10) {
    min = `0${min}`;
  }
  if (parseInt(hours, 10) > 0) {
    return `${parseInt(hours, 10)}h ${min}m ${sec}s`
  } else if (min == 0) {
    return `${sec}s`
  } else {
    return `${min}m ${sec}s`
  }
}
}