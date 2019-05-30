const jwt = require('jsonwebtoken');
const passport = require("passport");
const uuidv4 = require('uuid/v4');
const {RefreshTokens} = require('../database/models');
const sequelize = require('sequelize'); 
const {User} = require('../database/models');

module.exports = {
    login : function (req, res, next) {
        passport.authenticate('local', {session: false}, (err, user, info) => {
            if (err || !user) {
                return res.status(400).json({
                    message: 'Something is not right',
                    user   : user
                });
            }
           req.login(user, {session: false}, (err) => {
               if (err) {
                   res.send(err);
               }
               // generate a signed json web token with the contents of user object and return it in the response
               const expiresIn = (Math.floor(new Date() / 1000)+300);
               const accessToken = jwt.sign({sub : user.get('email')}, 'your_jwt_secret',{jwtid : uuidv4(),issuer : 'UGC Agent', expiresIn:expiresIn});
               const refreshToken = uuidv4();
               RefreshTokens.create({userId:user.get('id'),refreshToken:refreshToken,expiresIn:expiresIn,name:user.get('firstName')+'_computer'}).then(_ =>{}).catch(_=>{});
               return res.json({refreshToken,accessToken,expiresIn:expiresIn});
            });
        })(req, res);
    },
    refreshToken : function (req, res, next) {
        RefreshTokens.findOne({ where : {refreshToken : req.body.refreshToken,expiresIn:{[sequelize.Op.gte]: Math.floor(new Date() / 1000)}}}).then(token => {
            if (!token) {
                throw new Error('invalid token error');
            }
            return User.findOne({ where : {id : token.userId}})
        }).then(user => {
            if (!user) {
                throw new Error('invalid user error');
            }
            console.log(user.toJSON());
            const expiresIn = (Math.floor(new Date() / 1000)+300);
            const accessToken = jwt.sign({sub : user.get('email')}, 'your_jwt_secret',{jwtid : uuidv4(),issuer : 'UGC Agent', expiresIn:expiresIn});
            const refreshToken = uuidv4();
            RefreshTokens.update({refreshToken:refreshToken,expiresIn:expiresIn},{where:{userId : user.get('id')}}).then(_ =>{}).catch(_=>{});
            return res.json({refreshToken,accessToken,expiresIn:expiresIn});
        }).catch(err => {
            res.status(400);
            res.json({error:err.message});
        });
    }
}