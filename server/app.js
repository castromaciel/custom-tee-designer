const dotenv = require('dotenv')
const Server = require('./src/server.js')

dotenv.config()
const server = new Server()

server.listen()
