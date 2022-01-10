const fetch = require('node-fetch')
module.exports = {
    name: 'match',
    description: 'See your current match',
    async run(client, message, args, Discord, send, embed) {
        embed.setTitle('Invalid Arguments').setColor('RED')
        if (!args[0]) return send(embed.setDescription('You must provide a tournament ID'))
        if (!args[ 1 ]) return send(embed.setDescription('You must provide a match ID'))
        fetch(`https://api.challonge.com/v1/tournaments/${args[ 0 ]}/matches/${args[ 1 ]}.json?api_key=${client.config.API}`).then(a => a.json().then(res => {
            if (res.errors?.length) return send(embed.setDescription(res.errors[ 0 ]).setColor('RED').setTitle('Error'))
            let data = res.match
            embed.setTitle(`Match ID ${data.id}`).setColor('BLUE').setDescription(`
            **Round:** ${data.round}
            **State:** ${data.state}
            **Player one votes:** ${data.player1_votes ?? 'No votes'} 
            **Player two votes:** ${data.player2_votes ?? 'No votes'}
            
            **Updated At:** ${data.updated_at}. Wait before you can see the updated match.
            `)
            send(embed)
        }, console.log))
    }
}