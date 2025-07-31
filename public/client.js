document.addEventListener("DOMContentLoaded", () => {
    const socket = io();

    const msgInput = document.getElementById("m");
    const sendBtn = document.getElementById("sendBtn");
    const throwBtn = document.getElementById("throwBtn");
    const findBtn = document.getElementById("findBtn");
    const messagesList = document.getElementById("messages");

    // ✅ Receive chat messages
    socket.on("chat message", (msg) => {
        const li = document.createElement("li");
        li.textContent = msg;
        messagesList.appendChild(li);
    });

    // ✅ Send chat message
    sendBtn.addEventListener("click", () => {
        if (msgInput.value.trim() !== "") {
            socket.emit("chat message", msgInput.value);
            msgInput.value = "";
        }
    });

    // ✅ Throw bottle
    throwBtn.addEventListener("click", () => {
        if (msgInput.value.trim() !== "") {
            socket.emit("chat message", "🌊 Bottle tossed: " + msgInput.value);
            msgInput.value = "";
        }
    });

    // ✅ Scroll to bottom
    findBtn.addEventListener("click", () => {
        messagesList.scrollTop = messagesList.scrollHeight;
    });
});
