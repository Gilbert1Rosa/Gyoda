const express = require('express')
const app = express()
const cookieParser = require('cookie-parser');
const session = require('express-session')
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

let userDAO;

mongoose.connect("mongodb://127.0.0.1:27017/my_db", { useNewUrlParser: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;

module.exports = (app, injectedUserDAO) => {
    userDAO = injectedUserDAO;
    app.use(cookieParser());
    app.use(session({
        secret: 'my-secret',
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({ mongooseConnection: db})
    }));
}