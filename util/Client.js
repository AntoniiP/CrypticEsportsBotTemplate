const {Client, Collection} = require('discord.js')
const {connect} = require('mongoose')
const chalk = require('chalk')

module.exports = class extends Client {
    constructor() {
        super({
            allowedMentions: {parse: []},
            intents: 32767 // All intents
        })
        this.commands = new Collection()
        this.owners = []
        this.config = require('../config.json')
        this.login(this.config.token)
        this.setStatus(['ct!help'])
        this.prefix = 'ct!'
    }
    setStatus(a) {
        setInterval(() => this.user.setActivity(a[Math.floor(Math.random() * a.length)], {type: 'WATCHING'}), 20000)
    }
    log(...args) {
        console.log(chalk.green(`[${new Date().toLocaleString()}] -`, ...args))
    }
    init = require('./handler')(this)
}
