const { Presensi } = require('../model');
const { successResponse, errorResponse } = require('../utils/respon');
const { minioClient, bucketName } = require('../config/minio');
const { StatusCodes } = require('http-status-codes');
const multer = require('multer');
const moment = require('moment-timezone');
const upload = multer({ storage: multer.memoryStorage() });
const { Op } = require('sequelize');

const checkIn = async (req, res) => {
  try {
    const { nik, nama, tipe_presensi_id, longitude, latitude } = req.body;
    const file = req.file;

    if (!longitude || !latitude) {
      return errorResponse(res, 'Koordinat tidak valid', StatusCodes.BAD_REQUEST, 'Coordinates are required');
    }

    const lon = parseFloat(longitude);
    const lat = parseFloat(latitude);

    if (isNaN(lon) || isNaN(lat)) {
      return errorResponse(res, 'Koordinat tidak valid', StatusCodes.BAD_REQUEST, 'Invalid coordinates');
    }

    const fileName = `${Date.now()}-${file.originalname}`;
    const metaData = {
      'Content-Type': file.mimetype,
    };

    minioClient.putObject(bucketName, fileName, file.buffer, metaData, async function(err, etag) {
      if (err) {
        return errorResponse(res, 'Error uploading image to MinIO', StatusCodes.INTERNAL_SERVER_ERROR, err.message);
      }

      const indonesiaTime = moment.tz(Date.now(), 'Asia/Jakarta').format(); // Waktu Indonesia saat ini
      const currentDate = moment.tz(Date.now(), 'Asia/Jakarta').format('YYYY-MM-DD'); // Tanggal saat ini dalam format YYYY-MM-DD
  
      const existingCheckIn = await Presensi.findOne({
        where: {
          nik,
          check_in: {
            [Op.gte]: currentDate + ' 00:00:00',
            [Op.lte]: currentDate + ' 23:59:59',
          },
        },
      });
  
      if (existingCheckIn) {
        return errorResponse(res, 'Gagal check-in', StatusCodes.BAD_REQUEST, 'Anda sudah melakukan check-in hari ini');
      }

      let calculatedTipePresensiId = 1;
      const jam = moment(indonesiaTime).format('HH:mm:ss');

      if (jam >= '08:00:00' && jam <= '08:10:00') {
        calculatedTipePresensiId = 1;
      } else {
        calculatedTipePresensiId = 4;
      }

      const presensi = await Presensi.create({
        nik,
        nama,
        check_in: indonesiaTime,
        image: fileName,
        tipe_presensi_id: calculatedTipePresensiId,
        coordinates: {
          type: 'Point',
          coordinates: [lon, lat]
        }
      });


      successResponse(res, 'Check-in berhasil', [presensi], StatusCodes.CREATED);
    });

  } catch (error) {
    errorResponse(res, 'Terjadi kesalahan pada server', StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

const checkOut = async (req, res) => {
  try {
    const { nik } = req.params;

    const indonesiaTime = moment.tz(Date.now(), 'Asia/Jakarta').format();

    const jam = moment(indonesiaTime).format('HH:mm:ss');

    if (jam < '17:00:00') {
      return errorResponse(res, 'Gagal check-out', StatusCodes.BAD_REQUEST, 'Check-out hanya bisa dilakukan di atas jam 17:00');
    }

    const presensi = await Presensi.findOne({
      where: {
        nik,
        check_out: null,
      },
    });

    if (!presensi) {
      return errorResponse(res, 'Gagal check-out', StatusCodes.BAD_REQUEST, 'Anda sudah melakukan check-out');
    }

    presensi.check_out = indonesiaTime;
    await presensi.save();

    successResponse(res, 'Check-out berhasil', [presensi], StatusCodes.OK);

  } catch (error) {
    errorResponse(res, 'Terjadi kesalahan pada server', StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

const getAllPresensi = async (req, res) => {
  try {
    const presensiList = await Presensi.findAll();

    const formattedPresensiList = await Promise.all(presensiList.map(async presensi => {
      const imageUrl = await getPresensiImageUrl(presensi.image);
      return {
        ...presensi.toJSON(),
        check_in: moment(presensi.check_in).tz('Asia/Jakarta').format('DD-MM-YYYY HH:mm:ss'),
        check_out: presensi.check_out ? moment(presensi.check_out).tz('Asia/Jakarta').format('DD-MM-YYYY HH:mm:ss') : null,
        image: imageUrl
      };
    }));

    successResponse(res, 'Data presensi berhasil diambil', formattedPresensiList, StatusCodes.OK);
  } catch (error) {
    errorResponse(res, 'Terjadi kesalahan pada server', StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

const getPresensiById = async (req, res) => {
  try {
    const { id } = req.params;
    const presensi = await Presensi.findByPk(id);

    if (!presensi) {
      return errorResponse(res, 'Data presensi tidak ditemukan', StatusCodes.NOT_FOUND, 'Presensi not found');
    }

    const imageUrl = await getPresensiImageUrl(presensi.image);
    const formattedPresensi = {
      ...presensi.toJSON(),
      check_in: moment(presensi.check_in).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss'),
      check_out: presensi.check_out ? moment(presensi.check_out).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss') : null,
      image: imageUrl
    };

    successResponse(res, 'Data presensi berhasil diambil', formattedPresensi, StatusCodes.OK);
  } catch (error) {
    errorResponse(res, 'Terjadi kesalahan pada server', StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

const getPresensiImageUrl = async (fileName) => {
  try {
    return await minioClient.presignedUrl('GET', bucketName, fileName, 24 * 60 * 60);
  } catch (error) {
    console.error('Error getting presigned URL from MinIO', error);
    return null;
  }
};


module.exports = {
  checkIn,
  checkOut,
  getAllPresensi,
  getPresensiById
};
