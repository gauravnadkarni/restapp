const uuidv4 = require('uuid/v4');
const jwt = require('jsonwebtoken');

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

    generateAccessToken(returnExpirationTime=false) {
        if(returnExpirationTime === true){
            let expiresIn = this.getExpirationTimeForAccessToekn();
            return {expiresIn:expiresIn,accessToken:jwt.sign({sub : this._user.get('email')}, 'your_jwt_secret',{jwtid : this.generateJwtId(),issuer : 'UGC Agent', expiresIn:expiresIn})};
        } else{
            return jwt.sign({sub : this._user.get('email')}, 'your_jwt_secret',{jwtid : this.generateJwtId(),issuer : 'UGC Agent', expiresIn:this.getExpirationTimeForAccessToekn()});
        }
    }

    generateAuthTokenPair(){
        let refreshToken = this.generateRefreshToken();
        let accessToken = this.generateAccessToken(true);
        return {refreshToken : refreshToken, accessToken : accessToken.accessToken, expiresIn : accessToken.expiresIn};
    }

    getExpirationTimeForAccessToekn() {
        return (Math.floor(new Date() / 1000)+300);
    }
}

module.exports = AuthHandler;