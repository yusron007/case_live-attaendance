const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TipePresensi = sequelize.define('TipePresensi', {
    nik: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    }, {
    timestamps: false,
    tableName: 'tipe_presensi'
});

module.exports = TipePresensi;
