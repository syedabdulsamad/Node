const EventsEmitter = require("events");

class Logger extends EventsEmitter {

    log(message) {
        console.log(message);
        this.emit("newMessage", "new message logged");   
    }
}

module.exports = Logger;

