const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    patientID: {
        type: String,
        required: true,
        unique: true,
        default: () => `PAT-${Math.floor(10000 + Math.random() * 90000)}`
    },
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required']
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
        min: [0, 'Age must be a positive number']
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other']
    },
    disease: {
        type: String,
        required: [true, 'Disease/Diagnosis is required']
    },
    doctorAssigned: {
        type: String,
        required: [true, 'Doctor assigned is required']
    },
    admissionDate: {
        type: Date,
        default: Date.now
    },
    roomNumber: {
        type: String,
        required: true
    },
    patientType: {
        type: String,
        required: true,
        enum: ['Inpatient', 'Outpatient']
    },
    status: {
        type: String,
        default: 'Admitted',
        enum: ['Admitted', 'Discharged']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Patient', patientSchema);
