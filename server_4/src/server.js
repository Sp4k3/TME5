import express from 'express'
import cors from 'cors'
import axios from 'axios'
import bodyParser from 'body-parser'

// Constants
const host = process.env.HOST
const port = process.env.PORT

// Server 3 infos
const server_3_host = process.env.SERVER_3_HOST
const server_3_port = process.env.SERVER_3_PORT
const server_3 = `http://${server_3_host}:${server_3_port}`

// App
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.enable('trust proxy')

// Axios
const sendInfos = () => {
  axios.post(`${server_3}/infos`, {
    infos: {
      name: 'server_4',
      host: host,
      port: port,
      address: `http://${host}:${port}`,
    }
  })
}

// Express
app.get('/', (req, res) => {
  res.send(`Node.js server running on port : ${port}`)
})

app.post('/', async (req, res) => {
  const message = req.body.message
  const fromIP = req.body.sender
  const toIP = req.body.recipient


  console.log(`Request sent to the DNS (server_3) to get ${toIP} IP.`)
  const response = await axios.get(`${server_3}/getIP`, {
    params: {
      sender: 'server_4',
      name: toIP,
    }
  })
  const server_recipient_ip = response.data.ip

  console.log(`Broker redirect message '${message}' from '${fromIP}' to '${toIP}'.`)
  res.redirect(307, server_recipient_ip)
})

sendInfos()

app.listen(port)
console.log(`Node.js server running on port : ${port}`)
