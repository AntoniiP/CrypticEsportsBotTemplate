const fetch = require('node-fetch')
module.exports = {
    name: "final",
    description: "Final data of a tournament",
    async run(client, message, args, Discord, send, embed) {
        if (!message.member.permissions.has('ADMINISTRATOR')) return send(embed.setDescription(`You don't have permission to use this command!`).setColor('RED').setTitle('Invalid Permissions'))
        if (!args[ 0 ]) return send(embed.setDescription(`You must provide a tournament ID`).setColor('RED').setTitle('Invalid Arguments'))
        fetch(`https://api.challonge.com/v1/tournaments/${args[ 0 ]}/finalize.json?api_key=${client.config.API}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(a => a.json().then(res => {
            if (res.errors?.length) return send(embed.setDescription(res.errors[ 0 ]).setColor('RED').setTitle('Error'))
            console.log(res)
        }, console.log))
    }
}