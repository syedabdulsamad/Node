const express = require("express");
const Joi = require("joi")

const app = express();
app.use(express.json());


//////////////////////    Data source    /////////////////////
var consents = [{
        "category": "marketing",
        "version": 1
    },
    {
        "category": "top-dk",
        "version": 2
    },
    {
        "category": "email",
        "version": 1
    },
    {
        "category": "push-notifications",
        "version": 1
    },
]


//////////////////////    Schema    /////////////////////
const schema = Joi.object({
    "category": Joi.string().required().min(3).max(50) //,
    //"version": Joi.number().positive().max(100)
});

//////////////////////    GET    /////////////////////
app.get("/express/get", (req, res) => {
    res.send("express request receive acknowledgement");

});

app.get("/express/get/:year/:day", (req, res) => {
    res.send(`params: ${JSON.stringify(req.params)} and query params are ${JSON.stringify(req.query)}`);

});

app.get("/express/consents", (req, res) => {
    res.send(consents);

});

app.get("/express/consents/:category", (req, res) => {

    const found = consents.find((consent) => {
        return (consent.category == req.params.category);
    });
    if (!found) {
        res.status(404).send(`Consent not found with category: ${req.params.category}`);
    } else {
        res.send(found)
    }
});

//////////////////////    POST    /////////////////////
app.post("/express/consents", (req, res) => {

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        res.status(400).send(validationResult.error.details[0].message);
    }

    const foundConsent = findConsent(req.body.category);
    if (foundConsent) {
        res.status(400).send("Consent already exist");
        return;
    }

    let consent = {
        "category": req.body.category,
        "version": 1
    }
    consents.push(consent);
    res.send(consent);

})

//////////////////////    PUT    /////////////////////
app.put("/express/consents/:category", (req, res) => {

    const localSchema = Joi.object({
        "version": Joi.number().positive().max(100).required()
    });

    const validated = localSchema.validate(req.body);
    if (validated.error) {
        res.status(400).send(validated.error.details[0].message);
        return;
    }

    const foundConsent = findConsent(req.params.category);
    if (!foundConsent) {
        res.status(404).send(`No consent found for category ${req.params.category}`);
        return;
    }

    foundConsent.version = req.body.version;
    res.send(foundConsent);
});

//////////////////////    Delete    /////////////////////
app.delete("/express/consents/:category", (req, res) => {

    const foundConsent = findConsent(req.params.category);
    if (!foundConsent) {
        res.status(404).send(`No consent found for category ${req.params.category}`);
        return;
    }

    console.log(`Found consent is ${JSON.stringify(foundConsent)}`);

    const index = consents.indexOf(foundConsent);
    const deletedConsent = consents.splice(index, 1);
    console.log(`Deleted consent is ${JSON.stringify(deletedConsent)}`);
    res.send(`Consent with category: ${req.params.category} deleted successfully`);


});



//////////////////////    Helper    /////////////////////
function findConsent(category) {
    const result = consents.find((con) => {
        return (con.category == category)
    })

    return result;
}


const port = process.env.port || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});




// app.get("/expres/", (req, res) => {
//     res.send("express request receive acknowledgement");

// });