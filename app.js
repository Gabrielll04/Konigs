//dependencies
const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const handlebars = require('express-handlebars')
const path = require('path')
const io = new Server(server)
const pages = require('./routes/routes.js')

//variables
var userCount = 0

//server's port
const port = process.env.PORT || 8080;

//public path
app.use(express.static(path.join(__dirname, 'public')))

//view engine
app.engine('handlebars', handlebars.engine({DefaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//using routes
app.use('/', pages)

//socket.io
io.on('connection', (socket) =>{
    userCount++ 

    socket.on('disconnect', function(){
        userCount--
    })
    socket.on('chat message', (nickname, msg) => {
        io.emit('chat message', nickname + ': ' + msg)
    })
})

//starting server http
server.listen(port, () => {
    console.log('Listening server at port 8080')
})