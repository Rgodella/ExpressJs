const knex = require('knex');
const knexConfig = require('../ExpressProject/Database/knexfile');

const environment = process.env.NODE_ENV || 'development';
const knexInstance = knex(knexConfig[environment]);

module.exports = knexInstance;