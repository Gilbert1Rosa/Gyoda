var accessTokens = [];

module.exports = () => {
    return accessTokens;
}

/**
 *  Find the given token, saved for a user.
 * 
 *  @param {string} token  The token to find.
 */
module.exports.findAccessToken = (token) => {
    var accessToken = accessTokens.find((actualToken) => {
        return  actualToken.bearer === token;
    });
    return accessToken !== null && accessToken !== undefined? accessToken.userid : undefined;
}

/**
 *  Saves the given token, saved for a client.
 * 
 *  @param {int}    userid  The user id associated with the token.
 *  @param {string} bearer  The token to find.
 */
module.exports.saveAccessToken = (userid, bearer) => {
    accessTokens.push({bearer: bearer, userid: userid});
}