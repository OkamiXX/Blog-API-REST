// Deconstructs Schema and model from mongoose.
const { Schema, model } = require('mongoose');

// Creates and defines the new model/Schema dataTypes.
const ArticlesSchema = Schema({
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    img: {
        type: String,
        default: 'default.png'
    }
});

// Exports the ArticleSchema as the Articles model using the -> 'articles' collection from the DB.
module.exports = model('Articles', ArticlesSchema, 'articles');