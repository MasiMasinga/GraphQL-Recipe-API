const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const dotenv = require("dotenv");

dotenv.config();

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
        console.log('MongoDB Connected');
        return server.listen({ port: 5001 });
    }).then((res) => {
        console.log(`Server running at ${res.url}`);
    })