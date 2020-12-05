const express = require("express");
const config = require("config");
const responseTime = require("response-time");
const logger = require("./middleware/logging");

const consentsRouter = require("./routers/consentRouter")
const homeRouter = require("./routers/homeRouter");
const app = express();

//////////////////////    Middlewares   /////////////////////
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(logger);
app.use((req, res, next) => {
    console.log(`Auth middleware...`);
    next();
});
////////////// Routers //////////////////////
app.use("/express/consents", consentsRouter);
app.use("/express/home", homeRouter);


console.log(`Process Env: ${process.env.NODE_ENV}`);
console.log(`App Env: ${app.get("env")}`);
console.log(`Config getting : ${config.get("name")}`);
console.log(`Env variable: ${config.get("pass")}`);

if (app.get("env") === "dev") {
    app.use(responseTime({
        "digits": 5,
        "header": "response-time"
    }));
    console.log("Response time enabled")
}

const port = process.env.port || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});