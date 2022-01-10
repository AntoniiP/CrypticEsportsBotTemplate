const axios = require('axios')
const fetch = require('node-fetch')
module.exports = {
    name: 'register',
    description: 'Register ',
    async run(client, message, args, Discord, send, embed) {
        if (!args[ 0 ]) return send(embed.setDescription('Please provide a tournament ID').setColor('RED').setTitle('Invalid Arguments.'))
        fetch(`https://api.challonge.com/v1/tournaments/${args[ 0 ]}/participants.json?api_key=${client.config.API}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                participant: {
                    name: message.author.username
                }
        })
        }).then((a) => a.json().then(res => {
            if (res.errors?.length) return send(embed.setDescription(res.errors[ 0 ]).setColor('RED').setTitle('Error.'))
            send(embed.setDescription('You have entered the tournament as ' + res.participant.name + ' Your ID: ' + res.participant.id + '. Tournament ID: ' + res.participant.tournament_id).setColor('GREEN').setTitle('Success!'))
        })), (a) => {
            console.log(a)
            send(embed.setDescription('Invalid Tournament. Please provide a valid tournament ID.').setColor('RED').setTitle('Invalid Tournament'))
        }
    }
}