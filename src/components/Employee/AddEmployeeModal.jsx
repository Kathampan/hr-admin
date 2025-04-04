import { useState, useEffect } from 'react';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddEmployeeModal = ({ showAddModal, setShowAddModal, setEmployees, employees, showToastMessage, editingEmployee = null }) => {
  const initialEmployeeState = {
    title: '',
    firstName: '',
    lastName: '',
    employeeId: '',
    aadhaarCard: '',
    gender: 'Male',
    mobile: '',
    personalEmail: '',
    officialEmail: '',
    pan: '',
    drivingLicense: '',
    address1: '',
    address2: '',
    address3: '',
    designation: '',
    middleName: '',
    fathersName: '',
    esiNo: '',
    ediDispensary: '',
    dob: '',
    placeOfBirth: '',
    age: '',
    maritalStatus: 'Single',
    children: '',
    city: '',
    state: '',
    pinCode: '',
    nationality: 'Indian',
    citizenship: 'Indian',
    spouseName: '',
    officialMobile: '',
    phone1: '',
    phone2: '',
    uan: '',
    status: 'Active',
    tracking: 'Tracking'
  };

  const [newEmployee, setNewEmployee] = useState(initialEmployeeState);
  const [errors, setErrors] = useState({});
  const [mode, setMode] = useState('add');

  // Reset form when showAddModal or editingEmployee changes
  useEffect(() => {
    if (showAddModal) {
      if (editingEmployee) {
        setMode('edit');
        setNewEmployee({ ...initialEmployeeState, ...editingEmployee }); // Pre-fill with all fields from editingEmployee
      } else {
        setMode('add');
        setNewEmployee(initialEmployeeState); // Reset to initial state
      }
    }
  }, [showAddModal, editingEmployee]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!newEmployee.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!newEmployee.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!newEmployee.employeeId.trim()) newErrors.employeeId = 'Employee ID is required';
    if (!newEmployee.designation.trim()) newErrors.designation = 'Designation is required';
    if (!newEmployee.mobile.trim()) newErrors.mobile = 'Mobile number is required';
    if (!newEmployee.officialEmail.trim()) newErrors.officialEmail = 'Official email is required';
    if (!newEmployee.address1.trim()) newErrors.address1 = 'Address 1 is required';
    if (!newEmployee.dob.trim()) newErrors.dob = 'Date of birth is required';
    if (!newEmployee.state.trim()) newErrors.state = 'State is required';
    if (!newEmployee.fathersName.trim()) newErrors.fathersName = "Father's name is required";

    if (newEmployee.officialEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmployee.officialEmail)) {
      newErrors.officialEmail = 'Invalid email format';
    }
    if (newEmployee.personalEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmployee.personalEmail)) {
      newErrors.personalEmail = 'Invalid email format';
    }
    if (newEmployee.mobile && !/^\d{10}$/.test(newEmployee.mobile)) {
      newErrors.mobile = 'Mobile must be 10 digits';
    }
    if (newEmployee.phone1 && !/^\d{10}$/.test(newEmployee.phone1)) {
      newErrors.phone1 = 'Phone 1 must be 10 digits';
    }
    if (newEmployee.phone2 && !/^\d{10}$/.test(newEmployee.phone2)) {
      newErrors.phone2 = 'Phone 2 must be 10 digits';
    }
    if (newEmployee.officialMobile && !/^\d{10}$/.test(newEmployee.officialMobile)) {
      newErrors.officialMobile = 'Official mobile must be 10 digits';
    }
    if (newEmployee.uan && !/^\d{12}$/.test(newEmployee.uan)) {
      newErrors.uan = 'UAN must be 12 digits';
    }
    if (newEmployee.pan && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(newEmployee.pan)) {
      newErrors.pan = 'Invalid PAN format';
    }
    if (newEmployee.aadhaarCard && !/^\d{12}$/.test(newEmployee.aadhaarCard)) {
      newErrors.aadhaarCard = 'Aadhaar Card must be 12 digits';
    }
    if (newEmployee.esiNo && !/^\d{10}$/.test(newEmployee.esiNo)) {
      newErrors.esiNo = 'ESI No. must be 10 digits';
    }
    if (newEmployee.pinCode && !/^\d{6}$/.test(newEmployee.pinCode)) {
      newErrors.pinCode = 'Pin Code must be 6 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (mode === 'add') {
      const newId = employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1;
      const employeeToAdd = {
        ...newEmployee,
        id: newId,
        status: 'Active',
        tracking: 'Tracking'
      };
      setEmployees([...employees, employeeToAdd]);
      showToastMessage('Employee added successfully');
    } else if (mode === 'edit') {
      const updatedEmployee = {
        ...newEmployee,
        status: editingEmployee.status, // Preserve the original status
        tracking: editingEmployee.tracking // Preserve the original tracking
      };
      setEmployees(employees.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp));
      showToastMessage('Employee updated successfully');
    }

    // Reset the form state after submission
    setNewEmployee(initialEmployeeState);
    setMode('add');
    setShowAddModal(false);
  };

  return (
    <>
      {showAddModal && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{mode === 'add' ? 'Employee Information' : 'Edit Employee'}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowAddModal(false);
                    setMode('add');
                    setNewEmployee(initialEmployeeState); // Reset form on close
                  }}
                ></button>
              </div>
              <div className="modal-body p-4">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <h6 className="border-bottom pb-2">Basic Information</h6>
                    <div className="row g-3">
                      <div className="col-md-4">
                        <label className="form-label">Title</label>
                        <select
                          className="form-select"
                          name="title"
                          value={newEmployee.title}
                          onChange={handleInputChange}
                        >
                          <option value="">Select Title</option>
                          <option value="Mr">Mr</option>
                          <option value="Ms">Ms</option>
                          <option value="Mrs">Mrs</option>
                        </select>
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">First Name <span className="text-danger">*</span></label>
                        <input
                          type="text"
                          className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                          name="firstName"
                          value={newEmployee.firstName}
                          onChange={handleInputChange}
                        />
                        {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Middle Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="middleName"
                          value={newEmployee.middleName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Last Name <span className="text-danger">*</span></label>
                        <input
                          type="text"
                          className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                          name="lastName"
                          value={newEmployee.lastName}
                          onChange={handleInputChange}
                        />
                        {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Employee ID <span className="text-danger">*</span></label>
                        <input
                          type="text"
                          className={`form-control ${errors.employeeId ? 'is-invalid' : ''}`}
                          name="employeeId"
                          value={newEmployee.employeeId}
                          onChange={handleInputChange}
                        />
                        {errors.employeeId && <div className="invalid-feedback">{errors.employeeId}</div>}
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Aadhaar Card</label>
                        <input
                          type="text"
                          className={`form-control ${errors.aadhaarCard ? 'is-invalid' : ''}`}
                          name="aadhaarCard"
                          value={newEmployee.aadhaarCard}
                          onChange={handleInputChange}
                        />
                        {errors.aadhaarCard && <div className="invalid-feedback">{errors.aadhaarCard}</div>}
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Gender</label>
                        <select
                          className="form-select"
                          name="gender"
                          value={newEmployee.gender}
                          onChange={handleInputChange}
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Designation <span className="text-danger">*</span></label>
                        <input
                          type="text"
                          className={`form-control ${errors.designation ? 'is-invalid' : ''}`}
                          name="designation"
                          value={newEmployee.designation}
                          onChange={handleInputChange}
                        />
                        {errors.designation && <div className="invalid-feedback">{errors.designation}</div>}
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Father's Name <span className="text-danger">*</span></label>
                        <input
                          type="text"
                          className={`form-control ${errors.fathersName ? 'is-invalid' : ''}`}
                          name="fathersName"
                          value={newEmployee.fathersName}
                          onChange={handleInputChange}
                        />
                        {errors.fathersName && <div className="invalid-feedback">{errors.fathersName}</div>}
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">ESI No.</label>
                        <input
                          type="text"
                          className={`form-control ${errors.esiNo ? 'is-invalid' : ''}`}
                          name="esiNo"
                          value={newEmployee.esiNo}
                          onChange={handleInputChange}
                        />
                        {errors.esiNo && <div className="invalid-feedback">{errors.esiNo}</div>}
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Esi Dispensary</label>
                        <input
                          type="text"
                          className="form-control"
                          name="ediDispensary"
                          value={newEmployee.ediDispensary}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h6 className="border-bottom pb-2">Personal Information</h6>
                    <div className="row g-3">
                      <div className="col-md-4">
                        <label className="form-label">Mobile <span className="text-danger">*</span></label>
                        <input
                          type="text"
                          className={`form-control ${errors.mobile ? 'is-invalid' : ''}`}
                          name="mobile"
                          value={newEmployee.mobile}
                          onChange={handleInputChange}
                        />
                        {errors.mobile && <div className="invalid-feedback">{errors.mobile}</div>}
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Personal Email ID</label>
                        <input
                          type="email"
                          className={`form-control ${errors.personalEmail ? 'is-invalid' : ''}`}
                          name="personalEmail"
                          value={newEmployee.personalEmail}
                          onChange={handleInputChange}
                        />
                        {errors.personalEmail && <div className="invalid-feedback">{errors.personalEmail}</div>}
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Official Email ID <span className="text-danger">*</span></label>
                        <input
                          type="email"
                          className={`form-control ${errors.officialEmail ? 'is-invalid' : ''}`}
                          name="officialEmail"
                          value={newEmployee.officialEmail}
                          onChange={handleInputChange}
                        />
                        {errors.officialEmail && <div className="invalid-feedback">{errors.officialEmail}</div>}
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">PAN</label>
                        <input
                          type="text"
                          className={`form-control ${errors.pan ? 'is-invalid' : ''}`}
                          name="pan"
                          value={newEmployee.pan}
                          onChange={handleInputChange}
                        />
                        {errors.pan && <div className="invalid-feedback">{errors.pan}</div>}
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Driving License</label>
                        <input
                          type="text"
                          className="form-control"
                          name="drivingLicense"
                          value={newEmployee.drivingLicense}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Date of Birth <span className="text-danger">*</span></label>
                        <input
                          type="date"
                          className={`form-control ${errors.dob ? 'is-invalid' : ''}`}
                          name="dob"
                          value={newEmployee.dob}
                          onChange={handleInputChange}
                        />
                        {errors.dob && <div className="invalid-feedback">{errors.dob}</div>}
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Place of Birth</label>
                        <input
                          type="text"
                          className="form-control"
                          name="placeOfBirth"
                          value={newEmployee.placeOfBirth}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Age</label>
                        <input
                          type="number"
                          className="form-control"
                          name="age"
                          value={newEmployee.age}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">UAN</label>
                        <input
                          type="text"
                          className={`form-control ${errors.uan ? 'is-invalid' : ''}`}
                          name="uan"
                          value={newEmployee.uan}
                          onChange={handleInputChange}
                        />
                        {errors.uan && <div className="invalid-feedback">{errors.uan}</div>}
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Marital Status</label>
                        <select
                          className="form-select"
                          name="maritalStatus"
                          value={newEmployee.maritalStatus}
                          onChange={handleInputChange}
                        >
                          <option value="Single">Single</option>
                          <option value="Married">Married</option>
                          <option value="Divorced">Divorced</option>
                          <option value="Widowed">Widowed</option>
                        </select>
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">No. of Children</label>
                        <input
                          type="number"
                          className="form-control"
                          name="children"
                          value={newEmployee.children}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Nationality</label>
                        <input
                          type="text"
                          className="form-control"
                          name="nationality"
                          value={newEmployee.nationality}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Citizenship</label>
                        <input
                          type="text"
                          className="form-control"
                          name="citizenship"
                          value={newEmployee.citizenship}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Spouse Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="spouseName"
                          value={newEmployee.spouseName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Official Mobile Number</label>
                        <input
                          type="text"
                          className={`form-control ${errors.officialMobile ? 'is-invalid' : ''}`}
                          name="officialMobile"
                          value={newEmployee.officialMobile}
                          onChange={handleInputChange}
                        />
                        {errors.officialMobile && <div className="invalid-feedback">{errors.officialMobile}</div>}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h6 className="border-bottom pb-2">Present Address</h6>
                    <div className="row g-3">
                      <div className="col-md-4">
                        <label className="form-label">Address 1 <span className="text-danger">*</span></label>
                        <input
                          type="text"
                          className={`form-control ${errors.address1 ? 'is-invalid' : ''}`}
                          name="address1"
                          value={newEmployee.address1}
                          onChange={handleInputChange}
                        />
                        {errors.address1 && <div className="invalid-feedback">{errors.address1}</div>}
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Address 2</label>
                        <input
                          type="text"
                          className="form-control"
                          name="address2"
                          value={newEmployee.address2}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Address 3</label>
                        <input
                          type="text"
                          className="form-control"
                          name="address3"
                          value={newEmployee.address3}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">City</label>
                        <input
                          type="text"
                          className="form-control"
                          name="city"
                          value={newEmployee.city}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">State <span className="text-danger">*</span></label>
                        <select
                          className={`form-select ${errors.state ? 'is-invalid' : ''}`}
                          name="state"
                          value={newEmployee.state}
                          onChange={handleInputChange}
                        >
                          <option value="">Select State</option>
                          <option value="Andhra Pradesh">Andhra Pradesh</option>
                          <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                          <option value="Assam">Assam</option>
                          <option value="Bihar">Bihar</option>
                          <option value="Chhattisgarh">Chhattisgarh</option>
                          <option value="Goa">Goa</option>
                          <option value="Gujarat">Gujarat</option>
                          <option value="Haryana">Haryana</option>
                          <option value="Himachal Pradesh">Himachal Pradesh</option>
                          <option value="Jharkhand">Jharkhand</option>
                          <option value="Karnataka">Karnataka</option>
                          <option value="Kerala">Kerala</option>
                          <option value="Madhya Pradesh">Madhya Pradesh</option>
                          <option value="Maharashtra">Maharashtra</option>
                          <option value="Manipur">Manipur</option>
                          <option value="Meghalaya">Meghalaya</option>
                          <option value="Mizoram">Mizoram</option>
                          <option value="Nagaland">Nagaland</option>
                          <option value="Odisha">Odisha</option>
                          <option value="Punjab">Punjab</option>
                          <option value="Rajasthan">Rajasthan</option>
                          <option value="Sikkim">Sikkim</option>
                          <option value="Tamil Nadu">Tamil Nadu</option>
                          <option value="Telangana">Telangana</option>
                          <option value="Tripura">Tripura</option>
                          <option value="Uttar Pradesh">Uttar Pradesh</option>
                          <option value="Uttarakhand">Uttarakhand</option>
                          <option value="West Bengal">West Bengal</option>
                          <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                          <option value="Chandigarh">Chandigarh</option>
                          <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                          <option value="Delhi">Delhi</option>
                          <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                          <option value="Ladakh">Ladakh</option>
                          <option value="Lakshadweep">Lakshadweep</option>
                          <option value="Puducherry">Puducherry</option>
                        </select>
                        {errors.state && <div className="invalid-feedback">{errors.state}</div>}
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Pin Code</label>
                        <input
                          type="text"
                          className={`form-control ${errors.pinCode ? 'is-invalid' : ''}`}
                          name="pinCode"
                          value={newEmployee.pinCode}
                          onChange={handleInputChange}
                        />
                        {errors.pinCode && <div className="invalid-feedback">{errors.pinCode}</div>}
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Phone 1</label>
                        <input
                          type="text"
                          className={`form-control ${errors.phone1 ? 'is-invalid' : ''}`}
                          name="phone1"
                          value={newEmployee.phone1}
                          onChange={handleInputChange}
                        />
                        {errors.phone1 && <div className="invalid-feedback">{errors.phone1}</div>}
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Phone 2</label>
                        <input
                          type="text"
                          className={`form-control ${errors.phone2 ? 'is-invalid' : ''}`}
                          name="phone2"
                          value={newEmployee.phone2}
                          onChange={handleInputChange}
                        />
                        {errors.phone2 && <div className="invalid-feedback">{errors.phone2}</div>}
                      </div>
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-cancel"
                      onClick={() => {
                        setShowAddModal(false);
                        setMode('add');
                        setNewEmployee(initialEmployeeState);
                      }}
                    >
                      Discard
                    </button>
                    <button type="submit" className="btn btn-black">{mode === 'add' ? 'Save' : 'Update'}</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddEmployeeModal;