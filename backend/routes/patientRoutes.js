const express = require('express');
const router = express.Router();
const {
    registerPatient,
    getPatients,
    getPatient,
    updatePatient,
    deletePatient,
    searchPatient
} = require('../controllers/patientController');

router.route('/')
    .get(getPatients)
    .post(registerPatient);

router.get('/search', searchPatient);

router.route('/:id')
    .get(getPatient)
    .put(updatePatient)
    .delete(deletePatient);

module.exports = router;
