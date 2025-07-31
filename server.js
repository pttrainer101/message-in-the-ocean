import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import Filter from "leo-profanity";

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static("public"));

Filter.loadDictionary();

// ✅ Pre-fill with 300 random bottles (they will never run out)
const starterMessages = Array.from({ length: 300 }, (_, i) => `📜 Bottle #${i+1}: A message drifts across the sea...`);

io.on("connection", socket => {
  console.log("🌊 A user connected");

  // 📥 Throw new bottles
  socket.on("throwBottle", msg => {
    const cleanMsg = Filter.clean(msg);
    starterMessages.push(cleanMsg);
    console.log("🍾 Bottle thrown:", cleanMsg);
  });

  // 🔍 Look for bottles (now bottles remain in the ocean)
  socket.on("lookForBottles", () => {
    if (starterMessages.length > 0) {
      const randomIndex = Math.floor(Math.random() * starterMessages.length);
      const foundMsg = starterMessages[randomIndex];
      socket.emit("foundBottle", foundMsg);
    } else {
      socket.emit("foundBottle", "🌊 The ocean is calm — no bottles right now!");
    }
  });

  socket.on("disconnect", () => {
    console.log("👋 A user disconnected");
  });
});

server.listen(3000, () => {
  console.log("🚀 Message in the Ocean running on http://localhost:3000");
});
