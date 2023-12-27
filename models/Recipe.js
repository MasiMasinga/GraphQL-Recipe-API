const { model, Schema } = require('mongoose');

const recipeSchema = new Schema({
    name: String,
    category: String,
    createdAt: String,
    thumbsUp: Number,
    thumbsDown: Number,
});

module.exports = model('Recipe', recipeSchema);