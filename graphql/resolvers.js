const Recipe = require('../models/Recipe');

module.exports = {
    Query: {
        async recipe(_, { ID }) {
            try {
                const recipe = await Recipe.findById(ID);
                return recipe;
            } catch (err) {
                throw new Error(err);
            }
        },
        async getRecipes(_, { amount }) {
            try {
                const recipes = await Recipe.find().sort({ createdAt: -1 }).limit(amount);
                return recipes;
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async createRecipe(_, { recipeInput: { name, description } }) {

            const createdRecipe = new Recipe({
                name: name,
                description: description,
                createdAt: new Date().toISOString(),
                thumbsUp: 0,
                thumbsDown: 0,
            });

            const result = await createdRecipe.save();

            return {
                id: result.id,
                ...result._doc
            }
        },
        async deleteRecipe(_, { ID }) {
            try {
                await Recipe.findByIdAndDelete(ID);
                return true;
            } catch (err) {
                throw new Error(err);
            }
        },
        async editRecipe(_, { ID, recipeInput: { name, description } }) {
            try {
                await Recipe.findByIdAndUpdate(ID, { name: name, description: description });
                return true;
            } catch (err) {
                throw new Error(err);
            }
        }
    }
}