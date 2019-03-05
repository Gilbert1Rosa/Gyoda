let userDAO;
let accessTokenService;

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

function getClient(clientID, clientSecret, callback) {
    const client = {
        clientID,
        clientSecret,
        grants: null,
        redirectUrl: null
    };
    callback(false, client);
}

function saveAccessToken(accessToken, clientID, expires, user, callback) {
    accessTokenDAO.saveAccessToken(user.userid, accessToken);
    console.log(`Access token ${accessToken} for user ${user.userid} saved`);
    callback(false);
}

function grantTypeAllowed(clientID, grantType, callback) {
    console.log(`Grant allowed to client: ${clientID}, with type ${grantType}`);
    callback(false, true);
}

function getAccessToken(bearerToken, callback) {
    var userid = accessTokenDAO.findAccessToken(bearerToken);
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

function getUser(user, password, callback) {
    console.log(`User id: ${user.userid}, name: ${user.username}, password: ${user.password}`);
    userDAO.getUserByCredentials(user, password, (err, result) => {
        if (err) {
            throw Error("Error finding user");
        }
        callback(false, result[0]);
    });
}