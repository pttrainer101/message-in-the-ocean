import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import filter from "leo-profanity";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static("public"));

// ✅ 300 starter bottles
const bottles = Array.from({ length: 300 }, (_, i) => ({
  id: i + 1,
  message: `📜 Bottle #${i + 1}: A message drifts across the sea...`
}));

io.on("connection", (socket) => {
  console.log("🌊 A new user has connected");

  // 🏖️ Handle tossBottle
  socket.on("tossBottle", (msg) => {
    const cleanMsg = filter.clean(msg);
    bottles.push({ id: bottles.length + 1, message: `📜 Bottle: ${cleanMsg}` });
    io.emit("newBottle", cleanMsg);
  });

  // 🏖️ Handle lookForBottle
  socket.on("lookForBottle", () => {
    if (bottles.length > 0) {
      const randomBottle = bottles.splice(Math.floor(Math.random() * bottles.length), 1)[0];
      socket.emit("foundBottle", randomBottle.message);
    } else {
      socket.emit("foundBottle", "🌊 No bottles floating right now — toss one in!");
    }
  });

  socket.on("disconnect", () => {
    console.log("🚪 User left");
  });
});

httpServer.listen(3000, () => {
  console.log("🚀 Message in the Ocean running on http://localhost:3000");
});
