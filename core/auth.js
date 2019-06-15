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

    async generateAccessToken(returnExpirationTime = false) {
        let roles = await this._user.getUserRoles();
        if (returnExpirationTime === true) {
            let expiresIn = this.getExpirationTimeForAccessToken();
            return { expiresIn: expiresIn, accessToken: jwt.sign({ sub: this._user.get('email'), roles: roles }, config.app.SECRET, { jwtid: this.generateJwtId(), issuer: config.auth.token_issuer, expiresIn: config.auth.access_token_expiration_time }) };
        } else {
            return jwt.sign({ sub: this._user.get('email'), roles: "" }, config.app.SECRET, { jwtid: this.generateJwtId(), issuer: config.auth.token_issuer, expiresIn: this.getExpirationTimeForAccessToken() });
        }
    }

    generateAuthTokenPair() {
        return this.generateAccessToken(true).then((payload) => {
            let refreshToken = this.generateRefreshToken();
            return { refreshToken: refreshToken, accessToken: payload.accessToken, expiresIn: payload.expiresIn };
        });
    }

    getExpirationTimeForAccessToken() {
        return (Math.floor(new Date() / 1000) + config.auth.access_token_expiration_time);
    }
}

module.exports = AuthHandler;