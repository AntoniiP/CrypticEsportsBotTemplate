module.exports = {
    name: 'help',
    async run(client, message, args, Discord, send, embed) {
        let cmds = client.commands.map(a => a.name != 'help' ? `\`${a.name}\` - \`${a.description}\`` : '')
        embed.setTitle('My commands.')
            .setDescription('Here is a list of all my commands.\n' + cmds.join('\n'))
        send(embed)
    }
}
