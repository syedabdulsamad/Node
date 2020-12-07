const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/testdb", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected to Mongodb"))
    .catch((error) => console.log("Failed to connect to db", error));


const consentSchema = new mongoose.Schema({
    category: String,
    text: String,
    version: {
        type: Number,
        default: 1
    }
});
const Consent = mongoose.model("Consent", consentSchema);

async function createConsent() {

    const consent = new Consent();
    consent.category = "marketing"
    consent.text = "This is marketing consent with version 4"
    consent.version = 4

    console.log(`Created consent is: ${consent}`);
    const result = await consent.save();
    console.log(result);

}
//createConsent();

async function getAllConsents() {
    const allConsents = await Consent.findOne({
            category: "marketing"
        })
        .sort({
            version: -1
        })
        .limit(1);
    console.log(allConsents)

}


getAllConsents();