import express from 'express'
import cors from 'cors'
import axios from 'axios'
import bodyParser from 'body-parser'

// Constants
const host = process.env.HOST
const port = process.env.PORT
const message = 'pong'

// Server 3 infos
const server_3_host = process.env.SERVER_3_HOST
const server_3_port = process.env.SERVER_3_PORT
const server_3 = `http://${server_3_host}:${server_3_port}`

let sended = false
const FgGreen = "\x1b[32m"

// App
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Axios
const ping = async () => {
  console.log('Request sent to the DNS (server_3) to get server_4 IP.')
  const response = await axios.get(`${server_3}/getIP`, {
    params: {
      sender: 'server_1',
      name: 'server_4',
    }
  })
  const server_4_ip = response.data.ip
  axios.post(server_4_ip, {
    message: message,
    sender: 'server_1',
    recipient: 'server_2',
  })
}

const sendInfos = () => {
  axios.post(`${server_3}/infos`, {
    infos: {
      name: 'server_1',
      host: host,
      port: port,
      address: `http://${host}:${port}`,
    }
  })
}

// Express
app.get('/', (req, res) => {
  res.send(`Node.js server running on port : ${port}`)

  // Start the first call for the master server
  sended = false
  ping()
})

app.post('/', (req, res) => {
  const from = req.body.sender
  const message = req.body.message
  console.log(FgGreen, `Message received from ${from} : ${message}.`)
  res.send(req.body.message)
  if (!sended) ping() // Remove condition to start the infinite loop !
  sended = true
})

sendInfos()
// ping()

app.listen(port)
console.log(`Node.js server running on port : ${port}`)
