const express = require('express');

// This package automatically parses JSON requests.
const bodyParser =  require('body-parser');

// This package will handle GraphQL server requests and responses
// for you, based on your schema.
const {graphqlExpress, graphiqlExpress} = require('apollo-server-express');

const schema =  require('./schema');
const connectMongo = require('./mongo-connector');

const start = async () => {
    const mongo = await connectMongo();
    const PORT = 3000;
    var app = express();

    app.use('/graphql', bodyParser.json(), graphqlExpress({ 
        context: {mongo},
        schema 
    }));

    app.use('/graphiql', graphiqlExpress({ 
        endpointURL: '/graphql' 
    }));

    app.listen(
        PORT, () => {
            console.log(`Hackernews GraphQL server running on port ${PORT}.`)
        });    
};

start();