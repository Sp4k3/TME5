import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

// Constants
const port = process.env.PORT

// Servers infos
let dict = []

const getIP = (name) => dict.find(server => server['name'] === name)['address']

// App
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.enable('trust proxy')

// Express
app.get('/', (req, res) => {
  res.send(`Node.js server running on port : ${port}`)
})

app.get('/getIP', (req, res) => {
  const serverName = req.query.name
  const serverIP = getIP(serverName)
  const from = req.query.sender
  console.log(`DNS has sent to ${from} address : ${serverIP}.`)
  res.send({
    ip: serverIP
  })
})

app.post('/infos', (req, res) => {
  const infos = req.body.infos
  console.log(`Infos from ${infos.name} registered !`)
  dict = [
    ...dict,
    infos
  ]
  res.send('Infos registered !')
})

app.listen(port)
console.log(`Node.js server running on port : ${port}`)
