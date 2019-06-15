
const passport = require("passport");
const config = require('../config');
const { RefreshTokens } = require('../database/models');
const sequelize = require('sequelize');
const { User } = require('../database/models');
const { validationResult } = require('express-validator/check');
const AuthHandler = require('../core/auth');
const logger = require('../utilities/logger');

module.exports = {
    login: function (req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        passport.authenticate('local', { session: false }, (err, user, info) => {
            if (err || !user) {
                return res.status(400).json({
                    message: info.message,
                });
            }
            req.login(user, { session: false }, (err) => {
                if (err) {
                    res.send(err);
                }

                // generate a signed json web token with the contents of user object and return it in the response
                let authHandler = new AuthHandler();
                authHandler.user = user;
                authHandler.generateAuthTokenPair().then((payload) => {
                    res.status(200);
                    RefreshTokens.create({ userId: user.get('id'), refreshToken: payload.refreshToken, expiresIn: (Math.floor(new Date() / 1000) + config.auth.refresh_token_expiration_time), name: user.get('firstName') + '_computer' }).then(_ => { }).catch(_ => { });
                    return res.json(payload);
                }).catch((err) => {
                    console.log(err.message);
                    res.status(500);
                    res.json({ "error": "We are facing some trouble" });
                });
            });
        })(req, res);
    },
    refreshToken: function (req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        RefreshTokens.findOne({ where: { refreshToken: req.body.refreshToken, expiresIn: { [sequelize.Op.gte]: Math.floor(new Date() / 1000) } } }).then(token => {
            if (!token) {
                throw new Error('invalid token error');
            }
            return User.findOne({ where: { id: token.userId } })
        }).then(user => {
            if (!user) {
                throw new Error('invalid user error');
            }

            let authHandler = new AuthHandler();
            authHandler.user = user;
            authHandler.generateAuthTokenPair().then((payload) => {
                res.status(200);
                RefreshTokens.update({ refreshToken: payload.refreshToken, expiresIn: (Math.floor(new Date() / 1000) + config.auth.refresh_token_expiration_time) }, { where: { userId: user.get('id'), refreshToken: req.body.refreshToken } }).then(_ => { }).catch(_ => { });
                return res.json(payload);
            }).catch((err) => {
                res.status(500);
                res.json({ "error": "We are facing some trouble" });
            });
        }).catch(err => {
            res.status(400);
            res.json({ error: err.message });
        });
    }
}