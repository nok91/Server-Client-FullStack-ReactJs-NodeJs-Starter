const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');


//Generate a Token
function tokenForUser(user){
    const timestamp = new Date().getTime();
    return jwt.encode({ sub : user.id, iat: timestamp }, config.secret); // sub: jwt it's a standard convention, 
}

exports.signin = function(req, res, next) {
    // User has already had their email and password auth'd
    // We just need to give them a token
    res.send({ token: tokenForUser(req.user) });
}


exports.signup = function(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password) {
        return res.status(422).send({ error : 'You must provide email and password!' });
    }

    //We search for all user by email and the then call the callback..if they do existingUser will be populated with the founded user otherwise will be null
    User.findOne({ email: email}, function( err, existingUser){

        if (err) {
            return next(err);
        }
        
        // See if a user with the given email exists. (we don't want any duplicates)
        if(existingUser) {
            return res.status(422).send({ error : 'Email is in use!' });
        }

        // If a user wiuth email does NOT exist, create and save user record
        const user = new User ({
            email: email,
            password: password
        });

        //this will save the record to the database
        user.save(function(err) {
            if(err) {
                return next(err);
            }
        }); 

        // Respond to request indicatin the user was created
        // res.json(user)
        res.json({ token: tokenForUser(user) });
    });

}