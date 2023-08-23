fx_version 'cerulean'
games { 'gta5' }
author 'xayibogantr'
server_only 'yes'
name 'xayibogantr-db'

server_scripts {
     '@mysql-async/lib/MySQL.lua',
     'server.lua',
     'bot.js'
} 