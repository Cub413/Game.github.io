const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const socket = io();
const joystick = document.getElementById('joystick');
const stick = document.getElementById('stick');
const chatToggle = document.getElementById('chat-toggle');
const chatContainer = document.getElementById('chat-container');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player = { x: 100, y: 100, width: 50, height: 50, moving: false, flip: false };
let joystickPressed = false;

// Movimiento del joystick
joystick.addEventListener('touchstart', () => joystickPressed = true);
joystick.addEventListener('touchend', () => joystickPressed = false);

document.addEventListener('keydown', e => {
    if (e.key === 'Enter' && chatInput.value.trim() !== '') {
        socket.emit('chat message', chatInput.value);
        chatInput.value = '';
    }
});

socket.on('chat message', msg => {
    chatMessages.innerHTML += `<p>${msg}</p>`;
});

chatToggle.addEventListener('click', () => {
    chatContainer.style.display = chatContainer.style.display === 'none' ? 'block' : 'none';
});

// Animación y dibujo del jugador
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (joystickPressed) {
        player.x += 2;
        player.moving = true;
    } else {
        player.moving = false;
    }

    ctx.fillStyle = player.moving ? 'blue' : 'red';
    ctx.fillRect(player.x, player.y, player.width, player.height);

    requestAnimationFrame(draw);
}

draw();
