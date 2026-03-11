const Patient = require('../models/Patient');

// @desc    Register a new patient
// @route   POST /api/patients
// @access  Public
exports.registerPatient = async (req, res, next) => {
    try {
        const patient = await Patient.create(req.body);
        res.status(201).json({
            success: true,
            data: patient
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all patient records
// @route   GET /api/patients
// @access  Public
exports.getPatients = async (req, res, next) => {
    try {
        const patients = await Patient.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: patients.length,
            data: patients
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get a specific patient by ID
// @route   GET /api/patients/:id
// @access  Public
exports.getPatient = async (req, res, next) => {
    try {
        const patient = await Patient.findById(req.params.id);

        if (!patient) {
            return res.status(404).json({
                success: false,
                error: 'Patient not found'
            });
        }

        res.status(200).json({
            success: true,
            data: patient
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update patient details
// @route   PUT /api/patients/:id
// @access  Public
exports.updatePatient = async (req, res, next) => {
    try {
        const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!patient) {
            return res.status(404).json({
                success: false,
                error: 'Patient not found'
            });
        }

        res.status(200).json({
            success: true,
            data: patient
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a patient record
// @route   DELETE /api/patients/:id
// @access  Public
exports.deletePatient = async (req, res, next) => {
    try {
        const patient = await Patient.findByIdAndDelete(req.params.id);

        if (!patient) {
            return res.status(404).json({
                success: false,
                error: 'Patient not found'
            });
        }

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Search patient by name
// @route   GET /api/patients/search
// @access  Public
exports.searchPatient = async (req, res, next) => {
    try {
        const { name } = req.query;
        
        if (!name) {
            return res.status(400).json({
                success: false,
                error: 'Please provide a name to search'
            });
        }

        const patients = await Patient.find({
            fullName: { $regex: name, $options: 'i' }
        });

        res.status(200).json({
            success: true,
            count: patients.length,
            data: patients
        });
    } catch (error) {
        next(error);
    }
};
