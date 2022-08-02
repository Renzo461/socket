const socket = io.connect()
const addGame = () => {
  const data = {
    name: document.getElementById('name').value,
    description: document.getElementById('description').value,
    plataform: document.getElementById('plataform').value,
    image: document.getElementById('image').value,
    stock: +document.getElementById('stock').value,
    price: +document.getElementById('price').value,
    state: document.getElementById('state').value
  }
  socket.emit('new-game', data)
  return false
}
const addMsg = () => {
  const data = {
    email: document.getElementById('correo').value,
    message: document.getElementById('mensaje').value
  }
  socket.emit('new-msg', data)
  return false
}
const renderGame = (games) => {
  return fetch('views/game.hbs')
    .then(data => data.text())
    .then(res => {
      // eslint-disable-next-line no-undef
      const template = Handlebars.compile(res)
      const html = template({ juego: games })
      return html
    })
}
const renderMsg = (msg) => {
  return fetch('/views/msg.hbs')
    .then(data => data.text())
    .then(res => {
      // eslint-disable-next-line no-undef
      const template = Handlebars.compile(res)
      const html = (template({ mensaje: msg }))
      return html
    })
}
socket.on('games', games => {
  renderGame(games).then(html => {
    document.getElementById('listaJuegos').innerHTML = html
  })
})
socket.on('msg', msg => {
  renderMsg(msg).then(html => {
    document.getElementById('listaMensajes').innerHTML = html
  })
})
