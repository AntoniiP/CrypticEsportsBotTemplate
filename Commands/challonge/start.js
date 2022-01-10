const axios = require('axios')
module.exports = {
    name: 'start',
    description: 'Start a tournament',
    run(client, message, args, Discord, send, embed) {
        embed.setDescription('You need to provide a tournament ID').setColor('RED').setTitle('Invalid Arguments')
        if (!args[0]) return send(embed)
        axios
            .post(`https://api.challonge.com/v1/tournaments/${args[0]}/start.json?api_key=${client.config.API}`, {
                headers: {
                    Authorization: client.config.API,
                    'Content-Type': 'application/json'
                },
                data: {
                    name: args[0]
                }
            })
            .then((res) => send(embed.setDescription('The tournament has started!').setColor('GREEN').setTitle('Tournament Started')), console.log)
    }
}
