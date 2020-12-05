const Joi = require("joi")
const express = require("express");
const router = express.Router()



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
});

///////////////////////////

router.get("/", (req, res) => {
    res.send(consents);
});

router.get("/:category", (req, res) => {

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
router.post("/", (req, res) => {

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        return res.status(400).send(validationResult.error.details[0].message);
    }

    const foundConsent = findConsent(req.body.category);
    if (foundConsent) {
        return res.status(400).send("Consent already exists");
    }

    let consent = {
        "category": req.body.category,
        "version": 1
    }
    consents.push(consent);
    res.send(consent);

})

//////////////////////    PUT    /////////////////////
router.put("/:category", (req, res) => {

    const localSchema = Joi.object({
        "version": Joi.number().positive().max(100).required()
    });

    const validated = localSchema.validate(req.body);
    if (validated.error) {
        return res.status(400).send(validated.error.details[0].message);
    }

    const foundConsent = findConsent(req.params.category);
    if (!foundConsent) {
        return res.status(404).send(`No consent found for category ${req.params.category}`);
    }

    foundConsent.version = req.body.version;
    res.send(foundConsent);
});

//////////////////////    Delete    /////////////////////
router.delete("/:category", (req, res) => {

    const foundConsent = findConsent(req.params.category);
    if (!foundConsent) {
        return res.status(404).send(`No consent found for category ${req.params.category}`);
    }
    const index = consents.indexOf(foundConsent);
    const deletedConsent = consents.splice(index, 1);
    res.send(`Consent with category: ${req.params.category} deleted successfully`);
});



//////////////////////    Helper    /////////////////////
function findConsent(category) {
    const result = consents.find((con) => {
        return (con.category == category)
    })

    return result;
}



module.exports = router;