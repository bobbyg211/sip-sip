import dotenv from "dotenv";
dotenv.config();
import express, { urlencoded, json } from "express";
import { WebSocketServer } from "ws";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import cors from "cors";
import helmet from "helmet";
import databaseRouter from "./routes/database.js";
import pool from "./sql/connection.js";

// Express

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(cors({ origin: process.env.CLIENT_ORIGIN_URL }));
app.use(urlencoded({ extended: true }));
app.use(json());

app.use(express.static(resolve(__dirname, "../client/build")));

app.use("/database", databaseRouter);

app.get("*", (req, res) => {
  res.sendFile(resolve(__dirname + "/../client/build/index.html"));
});

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`server started on port ${process.env.PORT || 5000}`);
});

// Websocket

let clients = {};
let games = {};

setupWebSocket(server);

function setupWebSocket(server) {
  const wss = new WebSocketServer({ noServer: true });

  server.on("upgrade", function upgrade(request, socket, head) {
    try {
      wss.handleUpgrade(request, socket, head, function done(ws) {
        wss.emit("connection", ws, request);
      });
    } catch (err) {
      console.log("upgrade exception", err);
      socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
      socket.destroy();
      return;
    }
  });

  wss.on("connection", (ctx) => {
    const clientId = guid();
    clients[clientId] = { connection: ctx };
    ctx.send(JSON.stringify({ method: "connect", clientId: clientId }));

    console.log("connected", wss.clients.size);

    ctx.on("message", async (message) => {
      message = JSON.parse(message);

      // Create game
      if (message.method === "create") {
        games[message.gameId] = {
          players: [],
          questionsRef: [],
          currIndex: 0,
        };

        games[message.gameId].players = [
          ...games[message.gameId].players,
          { clientId: message.clientId, username: message.username },
        ];

        const sql = "SELECT id FROM sipsip.questions ORDER BY RAND();";
        const refs = await sqlQueryProm(sql);
        games[message.gameId].questionsRef = refs;

        ctx.send(JSON.stringify({ method: "create", game: games[message.gameId] }));
      }

      // Join game
      if (message.method === "join") {
        games[message.gameId].players = [
          ...games[message.gameId].players,
          { clientId: message.clientId, username: message.username },
        ];

        games[message.gameId].players.forEach((player) => {
          clients[`${player.clientId}`].connection.send(
            JSON.stringify({ method: "join", game: games[message.gameId] })
          );
        });
      }

      // Update game
      if (message.method === "update") {
        // put in a check here to loop back around if index is greater than array size
        games[message.gameId].currIndex = currIndex + 1;

        games[message.gameId].players.forEach((player) => {
          clients[`${player.clientId}`].connection.send(
            JSON.stringify({ method: "update", game: games[message.gameId] })
          );
        });
      }
    });

    ctx.on("close", () => {
      console.log("closed", wss.clients.size);
    });

    ctx.send(JSON.stringify({ sys: "Connection established." }));
  });
}

const sqlQueryProm = (sql) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

function guid() {
  return Math.floor(Math.random() * 0x10000).toString(16);
}
