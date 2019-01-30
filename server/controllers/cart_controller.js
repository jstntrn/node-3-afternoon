const swag = require('./../models/swag');

// swag object sample data:
// { id: 1, title: 'Snapback ( red )', category: 'hats', price: 10 },

module.exports = {
    add: (req, res, next) => {
        const {id} = req.query;
        let {cart} = req.session.user;
        const index = cart.findIndex(item => item.id === id);
        if(index === -1){
            const swagToAdd = swag.find(swag => swag.id === id);
            cart.push(swagToAdd);
            req.session.user.total += swagToAdd.price;
        }
        res.status(200).send(req.session.user)
    },
    delete: (req, res, next) => {
        const id = req.query.id;
        let {cart} = req.session.user;
        const swagToDelete = swag.find(swag => swag.id === id);
        if(swagToDelete){
            const index = cart.findIndex(item => item.id === id);
            cart.splice(index,1)
            req.session.user.total -= swagToDelete.price;
        }
        res.status(200).send(req.session.user)
    },
    checkout: (req, res, next) => {
        const {user} = req.session;
        user.cart = [];
        user.total = 0;
        res.status(200).send(req.session.user)
    },
}