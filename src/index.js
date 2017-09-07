const express = require('express');

// This package automatically parses JSON requests.
const bodyParser =  require('body-parser');

// This package will handle GraphQL server requests and responses
// for you, based on your schema.
const {graphqlExpress, graphiqlExpress} = require('apollo-server-express');

const schema =  require('./schema');
const connectMongo = require('./mongo-connector');
const {authenticate} = require('./authentication');

const start = async () => {
    const mongo = await connectMongo();
    const PORT = 3000;
    var app = express();

    const buildOptions = async (req, res) => {
        // console.log(req);
        // console.log(mongo);
        const user = await authenticate(req, mongo.Users);
        // console.log(user);
        return {
            context: {mongo, user},
            schema
        };
    };

    app.use('/graphql', bodyParser.json(), graphqlExpress(buildOptions));

    app.use('/graphiql', graphiqlExpress({
        endpointURL: '/graphql',
        passHeader: `'Authorization': 'bearer token-bhagat.ali@gmail.com'`,
    }));    

    app.listen(
        PORT, () => {
            console.log(`Hackernews GraphQL server running on port ${PORT}.`)
        });    
};

start();