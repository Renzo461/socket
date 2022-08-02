const games = require('./games.json')

const readGames = () => {
  return games
}

const readGameById = (id) => {
  const game = games.find(g => g.id === id)
  if (game) {
    return game
  }
  throw new Error('Incorrect or missing id')
}

const createGame = (gameInfo) => {
  const newId = Math.max(...games.map(g => g.id)) + 1
  const newGame = {
    id: newId,
    ...gameInfo
  }
  games.push(newGame)
  return newGame
}

const updateGame = (id, newGameData) => {
  const game = games.indexOf(readGameById(id))
  games[game] = {
    id,
    ...newGameData
  }
  return games[game]
}

const deleteGame = (id) => {
  const game = games.indexOf(readGameById(id))

  games.splice(game, 1)
}
module.exports = {
  readGames,
  readGameById,
  createGame,
  updateGame,
  deleteGame
}
