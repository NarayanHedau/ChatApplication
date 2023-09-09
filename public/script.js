// script.js
const socket = io();

document.querySelector('#chat-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.querySelector('#m');
  const message = input.value.trim();
  if (message !== '') {
    socket.emit('chat message', message);
    input.value = '';
  }
});

socket.on('chat message', (msg) => {
  const messages = document.querySelector('#messages');
  const li = document.createElement('li');
  li.textContent = msg;
  messages.appendChild(li);
});
