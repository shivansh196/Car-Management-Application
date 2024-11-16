const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');
const authMiddleware = require('../middleware/auth');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/', authMiddleware, upload.array('images', 10), carController.createCar);
router.get('/', authMiddleware, carController.getCars);
router.get('/search', authMiddleware, carController.searchCars);
router.get('/:id', authMiddleware, carController.getCarById);
router.put('/:id', authMiddleware, carController.updateCar);
router.delete('/:id', authMiddleware, carController.deleteCar);

module.exports = router;
