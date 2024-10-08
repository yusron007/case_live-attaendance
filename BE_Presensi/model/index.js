const sequelize = require('../config/database');
const Karyawan = require('./karyawan');
const TipePresensi = require('./tipePresensi');
const Presensi =  require('./presensi');

const syncDatabase = async () => {
  try {
    await sequelize.sync();
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Failed to synchronize models:', error);
  }
};

syncDatabase();

module.exports = {
  Karyawan,
  TipePresensi,
  Presensi
};
