const fetch = require('node-fetch')
module.exports = {
    name: 'matches',
    description: 'See all the matches.',
    async run(client, message, args, Discord, send, embed) {
        embed.setTitle('Invalid Arguments').setColor('RED')
        if (!args[0]) return send(embed.setDescription('You must provide a tournament ID'))
        fetch(`https://api.challonge.com/v1/tournaments/${args[0]}/matches.json?api_key=${client.config.API}`).then(a => a.json().then(res => {
            if (res.errors?.length) return send(embed.setDescription(res.errors[ 0 ]).setTitle('Error').setColor('RED'))
            if (!res.length) return send(embed.setDescription('No matches found').setTitle('Error').setColor('RED'))
            let matches = res.map(({match}) => `**Match ID**: ${match.id} - **Player 1 ID:** ${match.player1_id} vs **Player 2 ID**: ${match.player2_id}`)
            send(embed.setDescription(matches.join('\n')).setColor('BLUE').setTitle('Matches'))
        }), console.log)
    }
}
