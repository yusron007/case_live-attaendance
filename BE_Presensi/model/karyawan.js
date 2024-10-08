const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Karyawan = sequelize.define('Karyawan', {
    nik: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
        validate: {
            len: {
                args: [16, 16],
                msg: "NIK harus terdiri dari 16 karakter"
            }
        }
    },
    nama: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    unit_kerja: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status_karyawan: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: true
    },
    }, {
    timestamps: false,
    tableName: 'karyawan'
});

module.exports = Karyawan;
