// Requires moongose from the mongoose package to connect db.
const mongoose = require('mongoose');

// Creates the connection db as an async function to check if it works properly.
const connection = async () => {
    try {
        // connects to the mongo DB via connection string.
        mongoose.connect('mongodb://localhost:27017/blogDB');

        // Parameters inside of the object::::::
        // useNewUrlParser: true
        // useUnifiedTopology: true
        // useCreateIndex: true

        // IN CASE OF WARNINGS //

        console.log(`\n=== Connection to the DB succeded ===`)

    } catch (err) {
        // If there is a new error logs it and throws an exeption.
        console.log(err);
        throw new Error('Connection to the DB failed....');
    };
}


module.exports = {connection};