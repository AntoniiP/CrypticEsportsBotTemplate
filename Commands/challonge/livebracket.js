const fetch = require('node-fetch'),
    axios = require('axios')
module.exports = {
    name: 'livebracket',
    description: 'Get the live bracket',
    async run(client, message, args, Discord, send, embed) {
        // get the live bracket
        if (!args[0]) return send(embed.setDescription('Please provide a tournament id').setColor('RED').setTitle('Invalid Arguments'))
        fetch(`https://api.challonge.com/v1/tournaments/${args[0]}.json?api_key=${client.config.API}`).then(
            (a) =>
                a.json().then(async (data) => {
                    let res = data.tournament
                    if (data.errors?.length) return send(embed.setDescription(data.errors[0].message).setColor('RED').setTitle('Error'))

                    send(
                        new Discord.MessageEmbed()
                            .setTimestamp()
                            .setColor('BLUE')
                            .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
                            .setDescription('**Tournament Name:** ' + res.name + '\n**Type:** ' + res.tournament_type + '\n**See live:** ' +  res.live_image_url)
                        // .setImage(res.live_image_url) -- returns a SVG file, discord doesnt accept it in embeds
                    )
                }),
            console.log
        )
    }
}
