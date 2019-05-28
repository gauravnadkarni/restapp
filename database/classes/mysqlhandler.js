const AbstractDBHandler = require('./dbhandler');
const Sequelize = require('sequelize');

class MySqlHandler extends AbstractDBHandler {
    constructor(host, username, password, database) {
        super(host, username, password, database);
        this.dbdriver = 'mysql';
    }

    connect() {
        let sequelize = null;
        if (this.connection === null) {
            sequelize = new Sequelize('database', 'username', 'password', {
                host: this.host,
                dialect: this.dbdriver
            });
            this.connection = sequelize;
        }
        return this.connection;
    }

    disconnect() {
        this.connection.close();
    }
}

module.exports = MySqlHandler;