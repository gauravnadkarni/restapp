const uuidv4 = require('uuid/v4');
const jwt = require('jsonwebtoken');
const config = require('../config');

class AuthHandler {
    constructor() {
        this._user = null;
    }

    set user(user) {
        this._user = user;
    }

    get user() {
        return this._user;
    }

    generateJwtId() {
        return uuidv4();
    }

    generateRefreshToken() {
        return uuidv4();
    }

    generateAccessToken(returnExpirationTime = false) {
        if (returnExpirationTime === true) {
            let expiresIn = this.getExpirationTimeForAccessToken();
            return { expiresIn: expiresIn, accessToken: jwt.sign({ sub: this._user.get('email') }, config.app.secret, { jwtid: this.generateJwtId(), issuer: config.auth.token_issuer, expiresIn: expiresIn }) };
        } else {
            return jwt.sign({ sub: this._user.get('email') }, config.app.secret, { jwtid: this.generateJwtId(), issuer: config.auth.token_issuer, expiresIn: this.getExpirationTimeForAccessToken() });
        }
    }

    generateAuthTokenPair() {
        let refreshToken = this.generateRefreshToken();
        let accessToken = this.generateAccessToken(true);
        return { refreshToken: refreshToken, accessToken: accessToken.accessToken, expiresIn: accessToken.expiresIn };
    }

    getExpirationTimeForAccessToken() {
        return (Math.floor(new Date() / 1000) + config.auth.access_token_expiration_time);
    }
}

module.exports = AuthHandler;