const { Karyawan } = require('../model');
const { successResponse, errorResponse } = require('../utils/respon');
const { StatusCodes } = require('http-status-codes');

const getAllKaryawan = async (req, res) => {
  try {
    const karyawans = await Karyawan.findAll();
    successResponse(res, 'Data karyawan berhasil diambil', karyawans);
  } catch (error) {
    errorResponse(res, 'Terjadi kesalahan pada server', StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

const getKaryawanByNik = async (req, res) => {
    try {
      const karyawan = await Karyawan.findByPk(req.params.nik);
      if (karyawan) {
        successResponse(res, 'Data karyawan berhasil diambil', [karyawan]);
      } else {
        errorResponse(res, 'Karyawan tidak ditemukan', StatusCodes.NOT_FOUND);
      }
    } catch (error) {
      errorResponse(res, 'Terjadi kesalahan pada server', StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
  };
  
  const createKaryawan = async (req, res) => {
    try {
      const karyawan = await Karyawan.create({
        ...req.body,
        status_karyawan: true
      });
      successResponse(res, 'Karyawan berhasil ditambahkan', [karyawan], StatusCodes.CREATED);
    } catch (error) {
      errorResponse(res, 'Terjadi kesalahan pada server', StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
  };
  
  const updateKaryawan = async (req, res) => {
    try {
      const karyawan = await Karyawan.findByPk(req.params.nik);
      if (karyawan) {
        await karyawan.update(req.body);
        successResponse(res, 'Data karyawan berhasil diperbarui', [karyawan]);
      } else {
        errorResponse(res, 'Karyawan tidak ditemukan', StatusCodes.NOT_FOUND);
      }
    } catch (error) {
      errorResponse(res, 'Terjadi kesalahan pada server', StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
  };
  
  const deleteKaryawan = async (req, res) => {
    try {
      const karyawan = await Karyawan.findByPk(req.params.nik);
      if (karyawan) {
        await karyawan.destroy();
        successResponse(res, 'Karyawan berhasil dihapus', null, StatusCodes.NO_CONTENT);
      } else {
        errorResponse(res, 'Karyawan tidak ditemukan', StatusCodes.NOT_FOUND);
      }
    } catch (error) {
      errorResponse(res, 'Terjadi kesalahan pada server', StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
  };
  

module.exports = {
  getAllKaryawan,
  getKaryawanByNik,
  createKaryawan,
  updateKaryawan,
  deleteKaryawan,
};
