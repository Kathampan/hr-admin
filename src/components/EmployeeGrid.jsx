import { useState, useEffect } from 'react';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaExternalLinkAlt } from 'react-icons/fa';

const EmployeeGrid = () => {
  const [employees, setEmployees] = useState([
    { id: 1, firstName: 'Ask', lastName: 'ST', designation: 'Developer', status: 'Active', tracking: 'Tracking' },
    { id: 2, firstName: 'Test', lastName: '', designation: 'Manager', status: 'Active', tracking: 'Tracking' },
    { id: 3, firstName: 'Test', lastName: '', designation: 'Designer', status: 'Active', tracking: 'Tracking' }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [newEmployee, setNewEmployee] = useState({
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
    uan: ''
  });
  const [errors, setErrors] = useState({});

  const columns = [
    { key: 'firstName', label: 'First name', sortable: true },
    { key: 'lastName', label: 'Last name', sortable: true },
    { key: 'designation', label: 'Designation', sortable: true },
    { key: 'action', label: 'Action', sortable: false }
  ];

  const requestSort = (key) => {
    if (!columns.find(col => col.key === key)?.sortable) return;

    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    let sortableData = [...employees];
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [employees, sortConfig]);

  const filteredData = sortedData.filter(employee =>
    columns.some(column =>
      employee[column.key]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const currentPageData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handleToggleStatus = (id) => {
    setEmployees(employees.map(employee =>
      employee.id === id
        ? { ...employee, status: employee.status === 'Active' ? 'Inactive' : 'Active' }
        : employee
    ));
    showToastMessage('Status updated successfully');
  };

  const handleViewDetails = (id) => {
    window.location.href = `/employee/${id}`;
  };

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    // Starred fields validation
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

    // Additional validations
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

    const newId = employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1;
    const employeeToAdd = {
      id: newId,
      firstName: newEmployee.firstName,
      lastName: newEmployee.lastName,
      designation: newEmployee.designation,
      status: 'Active',
      tracking: 'Tracking'
    };

    setEmployees([...employees, employeeToAdd]);
    setNewEmployee({
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
      uan: ''
    });
    setShowAddModal(false);
    showToastMessage('Employee added successfully');
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <span className="ms-2">⇅</span>;
    return sortConfig.direction === 'asc' ? <span className="ms-2">↑</span> : <span className="ms-2">↓</span>;
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div className="container mt-4">
      <div className="table-container">
        <div className='d-flex align-items-center gap-5 gap-md-0 mb-3'>
          <div className="col-lg-8">
            <div className="d-flex align-items-center gap-3">
              <h5 className="mb-0">EMPLOYEE</h5>
              <button
                className="btn btn-primary"
                onClick={() => setShowAddModal(true)}
              >
                Add
              </button>
            </div>
          </div>
          <div className='col-lg-4'>
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered bg-white">
            <thead>
              <tr>
                {columns.map(column => (
                  <th
                    key={column.key}
                    className={column.sortable ? 'sortable-header' : ''}
                    onClick={() => requestSort(column.key)}
                    style={{ cursor: column.sortable ? 'pointer' : 'default' }}
                  >
                    <div className="d-flex align-items-center justify-content-between">
                      {column.label}
                      {column.sortable && getSortIcon(column.key)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentPageData.map(employee => (
                <tr key={employee.id}>
                  <td>
                    <a
                      href={`/employee/${employee.id}`}
                      className="text-decoration-none"
                      onClick={(e) => {
                        e.preventDefault();
                        handleViewDetails(employee.id);
                      }}
                    >
                      {employee.firstName}
                    </a>
                  </td>
                  <td>{employee.lastName}</td>
                  <td>{employee.designation}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button
                        className={`btn btn-sm ${employee.status === 'Active' ? 'btn-warning' : 'btn-success'}`}
                        onClick={() => handleToggleStatus(employee.id)}
                      >
                        {employee.status === 'Active' ? 'Deactivate' : 'Activate'}
                      </button>
                      <a
                        href={`/employee/${employee.id}`}
                        className="btn btn-sm btn-link text-decoration-none"
                        onClick={(e) => {
                          e.preventDefault();
                          handleViewDetails(employee.id);
                        }}
                      >
                        <FaExternalLinkAlt /> View
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredData.length > rowsPerPage && (
          <div className="pagination-container mt-3">
            <nav>
              <ul className="pagination justify-content-center mb-0">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Prev
                  </button>
                </li>
                {[...Array(totalPages)].map((_, index) => (
                  <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>

      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Employee Information</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowAddModal(false)}
                ></button>
              </div>
              <div className="modal-body">
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
                        <label className="form-label">Edi Dispensary</label>
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
                      <div className="col-12">
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
                      <div className="col-12">
                        <label className="form-label">Address 2</label>
                        <input
                          type="text"
                          className="form-control"
                          name="address2"
                          value={newEmployee.address2}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-12">
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
                        <input
                          type="text"
                          className={`form-control ${errors.state ? 'is-invalid' : ''}`}
                          name="state"
                          value={newEmployee.state}
                          onChange={handleInputChange}
                        />
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
                      className="btn btn-secondary"
                      onClick={() => setShowAddModal(false)}
                    >
                      Discard
                    </button>
                    <button type="submit" className="btn btn-primary">Save</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {showToast && (
        <div
          className="toast align-items-center text-white bg-success border-0 show"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 9999,
            transition: 'all 0.5s ease-in-out'
          }}
        >
          <div className="d-flex">
            <div className="toast-body">
              {toastMessage}
            </div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              onClick={() => setShowToast(false)}
            ></button>
          </div>
        </div>
      )}

      <style jsx>{`
        .table-container {
          display: flex;
          flex-direction: column;
          min-height: 0;
        }
        .table-responsive {
          flex: 1;
          overflow-y: auto;
        }
        .pagination-container {
          flex-shrink: 0;
        }
        th {
          background-color: #f8f9fa;
          font-weight: 600;
          padding: 12px 16px;
          vertical-align: middle;
          position: sticky;
          top: 0;
        }
        .sortable-header:hover {
          background-color: #e9ecef;
        }
        .table {
          margin-bottom: 0;
        }
        .modal {
          background-color: rgba(0,0,0,0.5);
        }
      `}</style>
    </div>
  );
};

export default EmployeeGrid;