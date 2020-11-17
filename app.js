const Logger  = require("./logger")


const logger = new Logger();

logger.on("newMessage", (arg) => {
    console.log(arg)

})

logger.log("test message");
