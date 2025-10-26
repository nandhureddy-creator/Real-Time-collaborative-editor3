const socket = io();
const editor = document.getElementById('editor');

// Send text changes to server
editor.addEventListener('input', () => {
    const content = editor.value;
    socket.emit('text-update', content);
});

// Receive updates from others
socket.on('receive-text', (data) => {
    editor.value = data;
});

