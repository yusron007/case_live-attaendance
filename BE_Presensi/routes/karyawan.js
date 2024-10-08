const express = require('express');
const router = express.Router();
const karyawanController = require('../service/karyawan');

router.get('/karyawan', karyawanController.getAllKaryawan);
router.get('/karyawan/:nik', karyawanController.getKaryawanByNik);
router.post('/karyawan', karyawanController.createKaryawan);
router.put('/karyawan/:nik', karyawanController.updateKaryawan);
router.delete('/karyawan/:nik', karyawanController.deleteKaryawan);

module.exports = router;
