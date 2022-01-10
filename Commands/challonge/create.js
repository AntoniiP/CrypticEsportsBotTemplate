const challonge = require('challonge')
module.exports = {
    name: 'create',
    description: 'Create a tournament',
    run(client, message, args, Discord, send, embed) {
        const api = challonge.createClient({
            apiKey: client.config.API
        })
        if (!message.member.permissions.has('ADMINISTRATOR')) return send(embed.setDescription('You do not have permission to use this command.').setColor('RED').setTitle('Invalid Permissions'))
        embed.setDescription('You need to provide a tournament name.').setColor('RED').setTitle('Invalid Arguments')
        if (!args[0]) return send(embed)
        embed.setDescription('You need to provide a tournament type (Single elimination, double elemination, Round Robin or Swiss).')
        if (!args[1]) return send(embed)
        api.tournaments.create({
            tournament: {
                name: args[0],
                tournamentType: args.slice(1).join(' ')
            },
            callback: async (err, data) => {
                if (err) {
                    embed.setDescription('En error occured, make sure you entered a correct tournament type').setTitle('Error')
                    console.log(err)
                    return send(embed)
                }
                embed.setDescription(`Tournament ${data.tournament.name} has been created. ID: ${data.tournament.id}`).setTitle('Success').setColor('GREEN')
                return send(embed)
            }
        })
    }
}
