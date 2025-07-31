<script src="/socket.io/socket.io.js"></script>
<script>
  const socket = io();

  function throwBottle() {
    const msg = document.getElementById("messageInput").value;
    if (msg.trim()) {
      socket.emit("throwBottle", msg);
      alert("🍾 Sent into the ocean: " + msg);
    }
  }

  function findBottle() {
    socket.emit("findBottle");
  }

  socket.on("bottleFound", msg => {
    alert("📜 You found a bottle: " + msg);
  });
</script>
