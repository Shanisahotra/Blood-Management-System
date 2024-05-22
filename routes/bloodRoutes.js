const express = require('express');
const multer = require('multer');
const path = require('path');
const { uploadExcelFile, getAllDonors, deleteDonor, getDonorById, updateDonorById, exportData, searchDonors } = require('../controllers/bloodController');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/uploadAll', upload.single('file'), uploadExcelFile);
router.get('/donor', getAllDonors);
router.delete('/donors/:id', deleteDonor);
router.get('/donors/:id', getDonorById);
router.put('/donors-update/:id', updateDonorById);
router.get('/export', exportData);
router.get('/search/:key', searchDonors);

module.exports = router; // Ensure this is exporting the router instance correctly










