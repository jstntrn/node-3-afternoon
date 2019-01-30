module.exports = function(req, res, next){
    const {session} = req; //destructure session from req

    if(!session.user){ //if no session user, create session
        session.user = {
            username: '',
            cart: [],
            total: 0.00
        };
    }
    next() //must put next
}