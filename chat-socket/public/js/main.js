const chatForm = document.getElementById('chat-form');
const messagesContainer = document.querySelector('.chat-messages');
const roomNameContainer = document.getElementById('room-name');
const usersContainer = document.getElementById('users');
const btnLeave = document.getElementById('btn-leave');

const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

const socket = io('http://localhost:3500');

//Join room 

socket.emit('join-room', { username, room });

//get room and users info

socket.on('room-users', ({ room, users }) => {
    outputRoomName(room);
    outputUsers(users);
}
);

socket.on('message', message => {
    console.log(message);
    printMessage(message);

    // scroll down to the bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
);

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get message text  
    const message = e.target.elements.msg.value;

    //emit msg to server
    socket.emit('send-message', message);

    //Clear input 
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});

// print message from DOM

function printMessage(data) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `
	     <p class="meta">${data.username} <span>${data.time}</span></p>
	     <p class="text">${data.text}</p>
         `;

    messagesContainer.append(messageElement);
}

//add room name to DOM

function outputRoomName(room) {
    roomNameContainer.innerText = room;
};

//add users to DOM

function outputUsers(users) {
    usersContainer.innerHTML = `
    ${users.map(user => `<li>${user.username}</li>`).join('')}`;
};

//when user leave

btnLeave.addEventListener('click', () => {
    const confirmation = confirm('Are you sure that you wanna leave a chat?');

    if (confirmation) {
        window.location = '../index.html';
    } else {

    }
});

