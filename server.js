import express from "express";
import http from "http";
import { Server } from "socket.io";
import Filter from "leo-profanity";
import path from "path";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", socket => {
  console.log("🌊 New connection");

  socket.on("throwBottle", msg => {
    const clean = Filter.clean(msg);
    console.log("🍾 Bottle tossed:", clean);
  });

  socket.on("findBottle", () => {
    const phrases = [
      "🌊 The ocean whispers your name...",
      "📜 A secret floats just for you...",
      "🌴 A driftwood note has arrived...",
      "💌 You’ve found a message at sea...",
      "🚢 A lonely sailor left this behind..."
    ];
    const reply = phrases[Math.floor(Math.random() * phrases.length)];
    socket.emit("bottleFound", reply);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Message in the Ocean running on port ${PORT}`);
});
