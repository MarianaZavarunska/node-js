const socket = io('http://localhost:5200');


socket.on('chat-message', data => {
    printMessage(data);
})

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const message = messageInput.value;
    socket.emit('send-message', message);
    messageInput.value = '';
})

function printMessage(data){
    const messageElement = document.createElement('div');
    messageElement.innerHTML = data;
    messageContainer.append(messageElement);
}