const HEADER_REGEX = /bearer token-(.*)$/;

// module.exports.authenticate = async ({ headers: { Authorization }}, Users) => {
module.exports.authenticate = async ({ headers: { Authorization }}, Users) => {
    // console.log(Authorization);
    const email = Authorization && HEADER_REGEX.exec(Authorization)[1];
    return email && await Users.findOne({ email });
}