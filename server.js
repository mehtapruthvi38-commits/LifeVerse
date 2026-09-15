
import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3000;
app.use(express.static("public"));

const players = new Map();
const jobs = {
  "Software Engineer": 50,
  "Doctor": 60,
  "Police Officer": 55,
  "Thief": 70
};

function publicPlayers() {
  return [...players.values()];
}

io.on("connection", (socket) => {
  socket.on("join", ({ name, gender }) => {
    if (players.size >= 4) {
      socket.emit("full");
      return;
    }
    players.set(socket.id, {
      id: socket.id,
      name: String(name || "Player").slice(0, 16),
      gender: gender === "female" ? "female" : "male",
      x: Math.random() * 8 - 4,
      z: Math.random() * 8 - 4,
      money: 1000,
      job: "Unemployed"
    });
    socket.emit("joined", players.get(socket.id));
    io.emit("players", publicPlayers());
  });

  socket.on("move", ({ x, z }) => {
    const p = players.get(socket.id);
    if (!p) return;
    p.x = Math.max(-48, Math.min(48, Number(x) || 0));
    p.z = Math.max(-48, Math.min(48, Number(z) || 0));
    socket.broadcast.emit("playerMoved", { id: socket.id, x: p.x, z: p.z });
  });

  socket.on("chooseJob", (job) => {
    const p = players.get(socket.id);
    if (!p || !jobs[job]) return;
    p.job = job;
    io.emit("players", publicPlayers());
    socket.emit("jobChanged", { job, pay: jobs[job] });
  });

  socket.on("work", () => {
    const p = players.get(socket.id);
    if (!p || !jobs[p.job]) return;
    p.money += jobs[p.job];
    socket.emit("money", p.money);
    io.emit("players", publicPlayers());
  });

  socket.on("chat", (text) => {
    const p = players.get(socket.id);
    if (!p) return;
    const message = String(text || "").trim().slice(0, 120);
    if (message) io.emit("chat", { name: p.name, message });
  });

  socket.on("disconnect", () => {
    players.delete(socket.id);
    io.emit("players", publicPlayers());
  });
});

server.listen(PORT, () => console.log(`LifeVerse running on http://localhost:${PORT}`));
