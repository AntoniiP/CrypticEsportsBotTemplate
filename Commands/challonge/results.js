const fetch = require('node-fetch')
module.exports = {
    name: 'results',
    description: 'Report if who wins the match.',
    async run(client, message, args, Discord, send, embed) {
        embed.setColor('RED').setTitle('Invalid Arguments')
        if (!args[0]) return send(embed.setDescription('You must provide a tournament ID'))
        if (!args[1]) return send(embed.setDescription('You must provide a match ID'))
        if (!['one', 'two'].includes(args[2]?.toLowerCase())) return send(embed.setDescription('You must provide a player to vote for. \nEx: `ctourna!resultsreport 123456 654321 one` (use one or two to vote for player one or player two)'))
        let match = {},
            url = `https://api.challonge.com/v1/tournaments/${args[0]}/matches/${args[1]}.json?api_key=${client.config.API}`

        args[2].toLowerCase() == 'one' ? (match.player1_votes = Number(await fetch(url).then((a) => a.json().then((b) => b.match.player1_votes))) + 1) : (match.player2_votes = Number(await fetch(url).then((a) => a.json().then((b) => b.match.player2_votes))) + 1)
        fetch(`https://api.challonge.com/v1/tournaments/${args[0]}/matches/${args[1]}.json?api_key=${client.config.API}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({match})
        }).then(
            (a) =>
                a.json().then((data) => {
                    if (data.errors?.length) return send(embed.setDescription(data.errors[0]))
                    send(
                        embed
                            .setColor('GREEN')
                            .setDescription('Voted for player ' + args[2])
                            .setTitle('Success!')
                    )
                }),
            console.log
        )
    }
}
