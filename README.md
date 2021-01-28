# Lesson 4 : Containerization

People that worked on this project :

- Laurène BIDAUX
- Willyan LIN
- Alicia MINET
- Antoine CORDIER
- Sergio DA SILVA PINTO
- Ruben DE MACEDO
- Thibault COLIN

## Run the project

Clone this project :

```sh
git clone https://github.com/tobi-colin/TME5.git
```

Install dependancies :

```sh
cd server_1 && npm install \
  && cd ../server_2 && npm install \
  && cd ../server_3 && npm install \
  && cd ../server_4 && npm install \
  && cd ..
```

Run the project inside Docker :

```sh
docker-compose up
```

<a href="http://localhost:4567/">Go to  `http://localhost:4567` </a> to launch the first `pong` message from `server_1`.

Then, watch the console to see messages.
