let counter = 0;

const express = require('express');

const app = express();

const server = app.listen(1337);

const bodyParser = require('body-parser');

const session = require('express-session')({
    secret: 'keyboardkittehMEEEEEEEEEEEOOOOWWWWWWWWWWWWWWWWW',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
});

const io = require('socket.io')(server);

const sharedsession = require("express-socket.io-session");

io.use(sharedsession(session, { autoSave: true }));

app.use(express.static(`${__dirname}/public`));

app.set('views', `${__dirname}/views`);

app.set('view engine', 'ejs');




io.on('connection', function (socket) { //2   
    socket.handshake.session.counter = counter;

    socket.emit('welcome',counter);


    socket.on('incriment', function () {
        socket.handshake.session.counter++;
        counter++;
        socket.emit('update', counter);
    });


    socket.on('reset', function () {
        counter = 0;
        socket.emit('reset_success', counter);
    });

});

app.get('/', function (request, response) {
    response.render('index');
});