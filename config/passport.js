const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {User} = require('../database/models');
const bcrypt = require('bcrypt');
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    function (email, password, cb) {
        //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
        return User.findOne({ where : {email : email}})
            .then(user => {
                if (!user) {
                    return cb(null, false, { message: 'Incorrect email or password.' });
                }
                bcrypt.compare(password, user.get("password"), function(err, res) {
                    if(res) {
                        let data = {"id" : user.get("id"), "email" : user.get('email')}
                        return cb(null, data, { message: 'Logged In Successfully' });
                    } else {
                        return cb(null, false, { message: 'Incorrect password.' });
                    } 
                });
            })
            .catch(err => cb(err));
    }
)
);

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : 'your_jwt_secret'
    },
    function (jwtPayload, cb) {
        return cb(null,jwtPayload);
        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        /*return User.findOneById(jwtPayload.id)
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });*/
    }
));