const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: Socket } = require('socket.io')
const { readGames, createGame } = require('./services/gamesServices')
const { createMsg, readMsg } = require('./services/msgServices')

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.get('/', (req, res) => res.redirect('/index.html'))

const PORT = 4040
httpServer.listen(PORT, () => console.log(`Server runnig at port ${PORT}`))
io.on('connection', socket => {
  console.log('Un cliente se ha conectado')
  socket.emit('games', readGames())
  socket.on('new-game', data => {
    createGame(data)
    io.sockets.emit('games', readGames())
  })
  socket.emit('msg', readMsg())
  socket.on('new-msg', data => {
    data.date = new Date().toLocaleString()
    console.log(data)
    createMsg(data)
    io.sockets.emit('msg', readMsg())
  })
})
