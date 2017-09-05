const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');

//Define types
const typeDefs = `
    type Link {
        id: ID!
        url: String!
        description: String!
    }

    type Query {
        allLinks: [Link!]!
        allUsers: [User!]!
    }

    type Mutation {
        createLink(url: String!, description: String!): Link
        createUser(name: String!, authProvider: AuthProviderSignupData!): User
    }

    type User {
        id: ID!
        name: String!
        email: String
    }

    input AuthProviderSignupData {
        email: AUTH_PROVIDER_EMAIL
    }

    input AUTH_PROVIDER_EMAIL {
        email: String!
        password: String!
    }
`;

module.exports = makeExecutableSchema({typeDefs, resolvers});