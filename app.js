require('dotenv').config()
const express = require('express');
const app = express();
const db = require('./db');
const user = require('./controllers/usercontroller');
const game = require('./controllers/gamecontroller');
const { User, Game } = require('./db');

User.sync({ force: true }).then(() => console.log('DB Connected'));
Game.sync({ force: true }).then(() => console.log('DB Game connected'));

app.use(require('body-parser').urlencoded({ extended: false }));
app.use(require('body-parser').json);
app.use('/api/auth', user);
app.use(require('./middleware/validate-session'))
app.use('/api/game', game);
app.listen(function() {
    console.log("App is listening on 4000");
})