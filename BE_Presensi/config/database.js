const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('db_presensi', 'postgres', 'salawe82', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

testConnection();

module.exports = sequelize;