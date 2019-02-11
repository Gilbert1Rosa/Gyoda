var express = require('express');
var app = express();


app.get('/', (req, res) => {
    var message = "ASDF";
    res.send(`{"message":${message}}`);
});

app.listen(5000);