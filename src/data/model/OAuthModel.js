let userDAO;
let accessTokenService;

/**
 *  Returns the model needed for the OAuth server.
 * 
 *  @param {UserDAO}            injectedUserDAO              Data provider for the users.
 *  @param {AccessTokenService} injectedAccessTokenService   Data provider for the tokens.
 */
module.exports = (injectedUserDAO, injectedAccessTokenService) => {
    userDAO = injectedUserDAO;
    accessTokenService = injectedAccessTokenService;
    return {
        getClient: getClient,
        saveAccessToken: saveAccessToken,
        grantTypeAllowed: grantTypeAllowed,
        getAccessToken: getAccessToken,
        getUser: getUser
    }
}

/**
 * Get the OAuth client.
 * 
 * @param {*} clientID      The id of the client that uses OAuth.
 * @param {*} clientSecret  The client secret password. 
 * @param {*} callback      Function to be called after client verification.
 */
function getClient(clientID, clientSecret, callback) {
    // TODO('Add clientID verification')
    const client = {
        clientID,       
        clientSecret,
        grants: null,
        redirectUrl: null
    };
    callback(false, client);
}

/**
 * Saves the token generated in a login.
 * 
 * @param {*} accessToken   Access token to save.
 * @param {*} clientID      Client id associated to the token.
 * @param {*} expires       Expiration of the token.
 * @param {*} user          User associated with the token.
 * @param {*} callback      Function to be called after client the token is saved.
 */
function saveAccessToken(accessToken, clientID, expires, user, callback) {
    accessTokenService.saveAccessToken(user.id, accessToken);
    console.log(`Access token ${accessToken} for user ${user.id} saved`);
    callback(false);
}

/**
 * Grants the client when making a request.
 * 
 * @param {*} clientID   ID of the client to grant access.
 * @param {*} grantType  Grant type.
 * @param {*} callback   Function to be called after grant conceded or denied.
 */
function grantTypeAllowed(clientID, grantType, callback) {
    console.log(`Grant allowed to client: ${clientID}, with type ${grantType}`);
    callback(false, true);
}

/**
 * Gets a token previously generated on login to authorise access 
 * to a protected resource.
 * 
 * @param {*} bearerToken  Token to be obtained.
 * @param {*} callback     Function to be called after getting the token.
 */
function getAccessToken(bearerToken, callback) {
    var userid = accessTokenService.findAccessToken(bearerToken);
    var accessToken = {
        user: {
            id: userid
        },
        expires: null
    };
    var isUseridUndefined = userid === undefined;
    console.log(`Fetched token: ${JSON.stringify(accessToken)}`);
    callback(isUseridUndefined, isUseridUndefined? null : accessToken);
}

/**
 * Gets an user with its name and password.
 * 
 * @param {*} user      User name.
 * @param {*} password  Password
 * @param {*} callback  Function to be called after getting the user.
 */
function getUser(user, password, callback) {
    console.log(`Getting user name: ${user}, password: ${password}`);
    userDAO.getUserByCredentials(user, password, (err, result) => {
        if (err) {
            throw Error("Error finding user");
        }
        callback(false, result[0]);
    });
}