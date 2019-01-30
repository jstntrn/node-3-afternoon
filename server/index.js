const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const session = require('express-session');

const checkForSession = require('./middlewares/checkForSession');

const swag_ctrl = require('./controllers/swag_controller');
const auth_ctrl = require('./controllers/auth_controller');
const cart_ctrl = require('./controllers/cart_controller');
const search_ctrl = require('./controllers/search_controller');

const app = express();

app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(checkForSession)
app.use(express.static(`${__dirname}/../build`));

app.get(`/api/swag`, swag_ctrl.read);

app.post(`/api/login`, auth_ctrl.login);
app.post(`/api/register`, auth_ctrl.register); //username and password passed through body
app.post(`/api/signout`, auth_ctrl.signout);
app.get(`/api/user`, auth_ctrl.getUser);

app.post(`/api/cart`, cart_ctrl.add); //url to add to cart http://localhost:3000/api/cart?id=1
app.post(`/api/cart/checkout`, cart_ctrl.checkout);
app.delete(`/api/cart`, cart_ctrl.delete);

app.get(`/api/search`, search_ctrl.search);

const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => {console.log(`listening on ${PORT}`)});