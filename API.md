# REST API Documentation

Base URL: `http://localhost:5000/api`

## Patient Endpoints

### 1. Get All Patients
- **URL**: `/patients`
- **Method**: `GET`
- **Success Response**: `200 OK`
- **Body**:
```json
{
  "success": true,
  "count": 2,
  "data": [...]
}
```

### 2. Register New Patient
- **URL**: `/patients`
- **Method**: `POST`
- **Body**:
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "age": 30,
  "gender": "Male",
  "disease": "Cold",
  "doctorAssigned": "Dr. Smith",
  "roomNumber": "101",
  "patientType": "Inpatient"
}
```
- **Success Response**: `201 Created`

### 3. Get Patient by ID
- **URL**: `/patients/:id`
- **Method**: `GET`
- **Success Response**: `200 OK`

### 4. Update Patient
- **URL**: `/patients/:id`
- **Method**: `PUT`
- **Success Response**: `200 OK`

### 5. Delete Patient
- **URL**: `/patients/:id`
- **Method**: `DELETE`
- **Success Response**: `200 OK`

### 6. Search Patients
- **URL**: `/patients/search?name=xyz`
- **Method**: `GET`
- **Success Response**: `200 OK`

## HTTP Status Codes

| Code | Meaning | Description |
|------|---------|-------------|
| 200 | Success | The request was successful |
| 201 | Created | A new resource was created |
| 400 | Bad Request | Invalid input or validation error |
| 404 | Not Found | Resource not found |
| 500 | Server Error | Internal server error |
