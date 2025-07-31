const express = require('express');
const Filter = require('bad-words');
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const filter = new Filter();
filter.addWords('sex', 'porn', 'fuck', 'bitch', 'asshole', 'dick', 'pussy', 'cunt', 'slut');

let bottles = []; // in-memory pool of bottles
let autoCount = 0;
const autoReplies = [
  "?? A seashell whispers your name",
  "?? The tide carried your words",
  "?? A stranger far away replied",
  "? A ship passed and heard you",
  "?? The starfish listened quietly",
  "?? The ocean breeze says hi",
  "?? A dolphin splashed near your bottle",
  "?? A fish nudged your message",
  "?? Moonlight carried the secret",
  "?? Sunlight warmed your note",
  "?? A petal floated above your words",
  "?? A coconut echoed your thought",
  "?? A palm tree witnessed your message",
  "?? A leaf drifted beside your voice",
  "?? A bunny hopped across the beach",
  "?? A breeze chime sang your words",
  "??? A dove carried your note",
  "?? A butterfly landed near your message",
  "?? A spark of warmth replied",
  "?? A stone held your secret",
  "?? Driftwood whispered your text",
  "?? Sea grasses rustled softly",
  "?? You heard the ocean hum",
  "??? A shell listened patiently",
  "? Your words glimmer like light",
  "?? A shooting star heard you",
  "?? A snowflake melted upon reading",
  "?? A distant echo replied",
  "?? An old scroll replied softly",
  "?? A book sighed your message",
  "?? A melody answered back",
  "?? A paint stroke mirrored your note",
  "?? A bottle found its way to you",
  "?? A chime rang your sentiment",
  "?? A balloon carried your note",
  "?? A rocket sped towards your message",
  "?? A rowboat delivered the reply",
  "?? A gift unwrapped the thought",
  "?? A leaf carried your secret",
  "??? Sand between toes responded",
  "?? A puzzle piece fit your words",
  "?? A sunray warmed your message",
  "??? A raindrop whispered back",
  "?? A distant island replied",
  "?? A palm frond swayed your words",
  "?? A drop mirrored your feeling",
  "?? A glint of light smiled your thought",
  "??? Fog carried your secret",
  "?? A signal echoed your note"
];

function getRandomReply(){
  const idx = autoCount < autoReplies.length ? autoCount : Math.floor(Math.random()*autoReplies.length);
  autoCount++;
  return autoReplies[idx % autoReplies.length];
}

let onlineUsers = 300;
function randomOnline(){
  setInterval(() => {
    onlineUsers += (Math.random() > 0.5 ? 5 : -20);
  }, 180000);
}

io.on('connection', (socket) => {
  randomOnline();
  socket.emit('users-online', onlineUsers);

  socket.on('throw-bottle', (msg) => {
    if (typeof msg !== 'string' || msg.split(' ').length > 5) {
      socket.emit('throw-error', 'Please send up to 5 words.');
    } else if (filter.isProfane(msg)) {
      socket.emit('throw-error', 'Profanity detected. Keep it clean.');
    } else {
      bottles.push(msg);
      socket.emit('throw-success', 'Bottle thrown!');
    }
  });

  socket.on('find-bottle', () => {
    if (bottles.length > 0) {
      const msg = bottles.splice(Math.floor(Math.random()* bottles.length),1)[0];
      socket.emit('found-bottle', msg);
    } else {
      const reply = getRandomReply();
      setTimeout(() => {
        socket.emit('found-bottle', reply);
      }, [3000,4000,5000,6000,7000][Math.floor(Math.random()*5)]);
    }
  });
});

app.use(express.static('.'));

const PORT = process.env.PORT || 3000;
server.listen(PORT, ()=>console.log('Server running on port', PORT));
