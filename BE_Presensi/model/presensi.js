const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Karyawan = require('./karyawan');
const TipePresensi = require('./tipePresensi');

const Presensi = sequelize.define('Presensi', {
    presensi_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nik: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Karyawan,
        key: 'nik',
      },
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    check_in: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    check_out: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tipe_presensi_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: TipePresensi,
        key: 'tipe_presensi_id',
      },
    },
    coordinates: {
        type: DataTypes.GEOMETRY('POINT'),
        allowNull: true,
    },
  }, {
    timestamps: false,
    tableName: 'presensi',
  });
  
  Karyawan.hasMany(Presensi, { foreignKey: 'nik' });
  Presensi.belongsTo(Karyawan, { foreignKey: 'nik' });
  
  TipePresensi.hasMany(Presensi, { foreignKey: 'tipe_presensi_id' });
  Presensi.belongsTo(TipePresensi, { foreignKey: 'tipe_presensi_id' });
  
  module.exports = Presensi;