const Discord = require('discord.js');
const client = new Discord.Client;
const config = require('./config.json');
let CurrentChannel = false;
let changedMember = [];

client.on('ready', () => {
     console.log('^1 [xayibogantr] Bot hazir!')
     exports['xayibogantr-db'].GetConfig(config);
     if (config.discord_whitelist.active) {
          on('playerConnecting', (name, setCallback, deferrals) => {
               memberList = client.guilds.members
               const guild = client.guilds.get(config.discord_whitelist.server_id);
               const src = global.source;
               deferrals.defer();
               const player = exports['xayibogantr-db'].GetDiscordFromId(src)
               deferrals.update('Discord whitelist kontrol ediliyor, lütfen bekleyiniz.')
               setTimeout(() => {
                    const discordId = player[0]
                    if (!discordId) return deferrals.done('Discord tespit edilemedi. Discordunuzu bağlayınız.');
                    const existMember = guild.members.get(discordId)
                    if (!existMember) return deferrals.done(`Lütfen discordumuza katılın.! ${config.discord_link}`);
                    const existWhitelistRole = existMember.roles.get(config.discord_whitelist.role_id)
                    const checkChangedMember = changedMember.find(member => member === discordId)
                    if (!existWhitelistRole && !checkChangedMember?.exist) return deferrals.done('Whitelist rolü bulunamadı.');
                    return deferrals.done();
               }, 1000)
          })
     }
})

client.on('guildMemberUpdate', (oldMember, newMember) => { 
     const existWhitelist = newMember.roles.has(config.discord_whitelist.role_id)
     const existChangedMember = changedMember.find(member => member.id === newMember.user.id)
     if (existChangedMember) return existChangedMember.exist = existWhitelist;
     changedMember.push({
          id: newMember.user.id,
          exist: existWhitelist
     })
})