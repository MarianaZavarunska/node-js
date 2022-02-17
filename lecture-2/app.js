const {EventEmitter} = require("events");

const ev = new EventEmitter();

ev.on("Log", (name) => {
    console.log(`${name} is working`);
})
 
ev.once("Test", () => {
    console.log("Text is working");
})
ev.emit('Test');
ev.emit('Test');
ev.emit('Test');


ev.emit('Log', 'Pavlo');
ev.emit('Log', 'Pavlo');
ev.emit('Log', 'Pavlo');
ev.emit('Log', 'Pavlo');