const AbstractDBHandler = require('./classes/dbhandler');
const Sequelize = require('sequelize');

class MySqlHandler extends AbstractDBHandler {
    constructor(server, username, password, database) {
        super(server, username, password, database);
        this.dbdriver = 'mysql';
    }

    connect() {
        let sequelize = null;
        if (this.connection === null) {
            sequelize = new Sequelize('database', 'username', 'password', {
                host: this.server,
                dialect: 'mysql'
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