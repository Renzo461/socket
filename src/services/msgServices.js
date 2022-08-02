const msg = require('./msg.json')

const readMsg = () => {
  return msg
}
const createMsg = (data) => {
  msg.push(data)
}
module.exports = {
  readMsg,
  createMsg
}
