const express = require('express');
const router = express.Router();
const presensi = require('../service/presensi');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.post('/presensi/checkin', upload.single('image'), presensi.checkIn);
router.put('/presensi/checkout/:nik', presensi.checkOut);
router.get('/presensi', presensi.getAllPresensi);
router.get('/presensi/:id', presensi.getPresensiById);

module.exports = router;
