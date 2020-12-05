const express = require("express");
const router = express.Router();

//////////////////////    GET    /////////////////////
router.get("/", (req, res) => {
    res.send("express request receive acknowledgement");

});

router.get("/:year/:day", (req, res) => {
    res.send(`params: ${JSON.stringify(req.params)} and query params are ${JSON.stringify(req.query)}`);

});

module.exports = router;