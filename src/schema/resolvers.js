const { ObjectID } = require('mongodb')

module.exports = {
    Query: {
        allLinks: async (root, data, {mongo: {Links}}) => {
            return await Links.find({}).toArray();
        },
        allUsers: async (root, data, {mongo: {Users}}) => {
            return await Users.find({}).toArray();
        }
    },
    Mutation: {
        createLink: async (root, data, {mongo: {Links}, user}) => {
            const newLinks = Object.assign({ postedById: user && user._id}, data);         
            const response = await Links.insert(newLinks);
            return Object.assign({ id: response.insertedIds[0] }, newLinks);
        },
        createUser: async (root, data, { mongo: {Users}}) => {
            const newUser = {
                name: data.name,
                email: data.authProvider.email.email,
                password: data.authProvider.email.password
            };
            const response = await Users.insert(newUser);
            return Object.assign({ id: response.insertedIds[0] }, newUser);
        },
        createVote: async (root, data, { mongo: {Votes}, user}) => {
            const newVote = {
                userId: user && user._id,
                linkId: new ObjectID(data.linkId)
            };
            const response = await Votes.insert(newVote);
            return Object.assign({ id: response.insertedIds[0] }, newVote);
        },
        signinUser: async (root, data, {mongo: {Users}}) => {
            const user = await Users.findOne({email: data.email.email});
            if (data.email.password === user.password) {
                return {token: `token-${user.email}`, user}
            }
        }
    },
    Link: {
        id: root => root._id || id,
        postedBy: async (root, data, {mongo: {Users}}) => {
            return await Users.findOne({_id: root.postedById});
        },
        votes: async (root, data, {mongo : {Votes}}) => {
            return await Votes.find({linkId: root._id}).toArray();
        }
    },
    User: {
        id: root => root._id || id
    },
    Vote: {
        id: root => root._id || id,
        user: async (root, data, {mongo: {Users}}) => {
            return await Users.findOne({_id: root.userId});
        },
        link: async ({linkId}, data, {mongo: {Links}}) => {
            return await Links.findOne({_id: linkId});
        }
    }
};