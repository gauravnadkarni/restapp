module.exports = class AbstractDBHandler {
    constructor(server, username, password, database) {
        this.dbdriver = null;
        this.connection = null;
        this.server = server;
        this.username = username;
        this.password = password;
        this.database = database;
    }

    connect() {
        let err = new Error('Method not implemented error');
        err.code = 405;
        throw err;
    }

    disconnect() {
        let err = new Error('Method not implemented error');
        err.code = 405;
        throw err;
    }
}