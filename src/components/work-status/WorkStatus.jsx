import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const WorkStatus = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [formData, setFormData] = useState({
        date: '',
        project: '',
        employee: '',
        hours: '',
        minutes: '',
        status: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const itemsPerPage = 5;

    const projects = [
        {
            id: 1,
            name: 'Website Redesign',
            time: '40 hours',
            description: 'Redesign company website with modern UI',
            eodDate: '2025-08-15',
            postedDate: '2025-07-01',
        },
        {
            id: 2,
            name: 'Mobile App Development',
            time: '60 hours',
            description: 'Develop iOS and Android app',
            eodDate: '2025-09-30',
            postedDate: '2025-07-05',
        },
        {
            id: 3,
            name: 'Database Optimization',
            time: '25 hours',
            description: 'Optimize SQL database performance',
            eodDate: '2025-07-20',
            postedDate: '2025-06-28',
        },
        {
            id: 1,
            name: 'Website Redesign',
            time: '40 hours',
            description: 'Redesign company website with modern UI',
            eodDate: '2025-08-15',
            postedDate: '2025-07-01',
        },
        {
            id: 2,
            name: 'Mobile App Development',
            time: '60 hours',
            description: 'Develop iOS and Android app',
            eodDate: '2025-09-30',
            postedDate: '2025-07-05',
        },
        {
            id: 3,
            name: 'Database Optimization',
            time: '25 hours',
            description: 'Optimize SQL database performance',
            eodDate: '2025-07-20',
            postedDate: '2025-06-28',
        },
    ];

    const projectOptions = ['Website Redesign', 'Mobile App Development', 'Database Optimization'];
    const employeeOptions = ['John Doe', 'Jane Smith', 'Bob Johnson'];
    const hoursOptions = Array.from({ length: 24 }, (_, i) => i);
    const minutesOptions = ['00', '15', '30', '45'];

    // Get current date in YYYY-MM-DD format for max attribute
    const today = new Date().toISOString().split('T')[0];

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setFormData({ date: '', project: '', employee: '', hours: '', minutes: '', status: '' });
        setFormErrors({});
        // Clear any residual modal styles
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
    };

    const validateForm = () => {
        const errors = {};
        
        if (!formData.date) {
            errors.date = 'Date is required';
        } else if (new Date(formData.date) > new Date()) {
            errors.date = 'Date cannot be in the future';
        }
        if (!formData.project) {
            errors.project = 'Project is required';
        }
        if (!formData.employee) {
            errors.employee = 'Employee is required';
        }
        if (!formData.hours && formData.hours !== '0') {
            errors.hours = 'Hours is required';
        }
        if (!formData.minutes) {
            errors.minutes = 'Minutes is required';
        }
        if (!formData.status.trim()) {
            errors.status = 'Status is required';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSave = () => {
        if (validateForm()) {
            setToastMessage('Work status added successfully!');
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
            handleCloseModal();
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (formErrors[name]) {
            setFormErrors({ ...formErrors, [name]: '' });
        }
    };

    const filteredProjects = projects.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProjects = filteredProjects.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="container mt-4 shadow-5 rounded-3 p-3">
            <div className="col-lg-12">
                <div className="container mt-4">
                    <div className="table-container">
                        <div className="d-flex flex-column flex-md-row align-items-center">
                            <div className="col-12 col-md-8 mb-3">
                                <div className="d-flex align-items-center gap-3">
                                    <h5 className="mb-0">
                                        <a href="/dashboard"><img src="/left-arrow-black.svg" alt="Back" /></a> Work Status
                                    </h5>
                                    <button
                                        className="btn btn-black"
                                        onClick={handleShowModal}
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                            <div className="col-12 col-md-4">
                                <input
                                    type="text"
                                    className="form-control mb-3 bg-white"
                                    placeholder="Search projects..."
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                />
                            </div>
                        </div>

                        <div className="table-responsive">
                            <table className="table table-bordered bg-white">
                                <thead>
                                    <tr>
                                        <th>Project</th>
                                        <th>Time</th>
                                        <th>Description</th>
                                        <th>EOD Date</th>
                                        <th>Posted Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentProjects.length > 0 ? (
                                        currentProjects.map((project) => (
                                            <tr key={project.id}>
                                                <td>{project.name}</td>
                                                <td>{project.time}</td>
                                                <td>{project.description}</td>
                                                <td>{project.eodDate}</td>
                                                <td>{project.postedDate}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="text-center">
                                                No projects found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="pagination-container mt-3">
                            <nav>
                                <ul className="pagination justify-content-center mb-0">
                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                        <button 
                                            className="page-link" 
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1}
                                        >
                                            Prev
                                        </button>
                                    </li>
                                    {pageNumbers.map(number => (
                                        <li 
                                            key={number} 
                                            className={`page-item ${currentPage === number ? 'active' : ''}`}
                                        >
                                            <button 
                                                className="page-link" 
                                                onClick={() => handlePageChange(number)}
                                            >
                                                {number}
                                            </button>
                                        </li>
                                    ))}
                                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                        <button 
                                            className="page-link" 
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                        >
                                            Next
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>

                    <div
                        className={`modal fade ${showModal ? 'show' : ''}`}
                        style={{ display: showModal ? 'block' : 'none' }}
                        id="addWorkStatus"
                        tabIndex="-1"
                        aria-labelledby="addWorkStatusLabel"
                        aria-hidden={!showModal}
                    >
                        <div className="modal-dialog">
                            <div className="modal-content p-3">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="addWorkStatusLabel">
                                        Add Work Status
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={handleCloseModal}
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Date <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            className={`form-control ${formErrors.date ? 'is-invalid' : ''}`}
                                            name="date"
                                            value={formData.date}
                                            onChange={handleInputChange}
                                            max={today}
                                            required
                                        />
                                        {formErrors.date && (
                                            <div className="invalid-feedback">{formErrors.date}</div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Project <span className="text-danger">*</span>
                                        </label>
                                        <select
                                            className={`form-select ${formErrors.project ? 'is-invalid' : ''}`}
                                            name="project"
                                            value={formData.project}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select Project</option>
                                            {projectOptions.map((project, index) => (
                                                <option key={index} value={project}>
                                                    {project}
                                                </option>
                                            ))}
                                        </select>
                                        {formErrors.project && (
                                            <div className="invalid-feedback">{formErrors.project}</div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Employee <span className="text-danger">*</span>
                                        </label>
                                        <select
                                            className={`form-select ${formErrors.employee ? 'is-invalid' : ''}`}
                                            name="employee"
                                            value={formData.employee}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select Employee</option>
                                            {employeeOptions.map((employee, index) => (
                                                <option key={index} value={employee}>
                                                    {employee}
                                                </option>
                                            ))}
                                        </select>
                                        {formErrors.employee && (
                                            <div className="invalid-feedback">{formErrors.employee}</div>
                                        )}
                                    </div>
                                    <div className='row'>
                                    <div className="mb-3 col-6">
                                        <label className="form-label">
                                            Hours Spent <span className="text-danger">*</span>
                                        </label>
                                        <select
                                            className={`form-select ${formErrors.hours ? 'is-invalid' : ''}`}
                                            name="hours"
                                            value={formData.hours}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select Hours</option>
                                            {hoursOptions.map((hour, index) => (
                                                <option key={index} value={hour}>
                                                    {hour}
                                                </option>
                                            ))}
                                        </select>
                                        {formErrors.hours && (
                                            <div className="invalid-feedback">{formErrors.hours}</div>
                                        )}
                                    </div>
                                    <div className="mb-3 col-6">
                                        <label className="form-label">
                                            Minutes Spent <span className="text-danger">*</span>
                                        </label>
                                        <select
                                            className={`form-select ${formErrors.minutes ? 'is-invalid' : ''}`}
                                            name="minutes"
                                            value={formData.minutes}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select Minutes</option>
                                            {minutesOptions.map((minute, index) => (
                                                <option key={index} value={minute}>
                                                    {minute}
                                                </option>
                                            ))}
                                        </select>
                                        {formErrors.minutes && (
                                            <div className="invalid-feedback">{formErrors.minutes}</div>
                                        )}
                                    </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Status <span className="text-danger">*</span>
                                        </label>
                                        <textarea
                                            className={`form-control ${formErrors.status ? 'is-invalid' : ''}`}
                                            name="status"
                                            value={formData.status}
                                            onChange={handleInputChange}
                                            rows="4"
                                            placeholder="Enter status details..."
                                            required
                                        ></textarea>
                                        {formErrors.status && (
                                            <div className="invalid-feedback">{formErrors.status}</div>
                                        )}
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={handleCloseModal}
                                        data-bs-dismiss="modal"
                                    >
                                        Discard
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-black"
                                        onClick={handleSave}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className={`toast align-items-center text-white bg-success border-0 ${showToast ? 'show' : ''}`}
                        role="alert"
                        aria-live="assertive"
                        aria-atomic="true"
                        style={{
                            position: 'fixed',
                            top: '20px',
                            right: '20px',
                            zIndex: 9999,
                            transition: 'all 0.5s ease-in-out',
                            opacity: showToast ? 1 : 0,
                            transform: showToast ? 'translateY(0)' : 'translateY(-100%)',
                            padding: '10px 10px',
                        }}
                    >
                        <div className="d-flex">
                            <div className="toast-body">{toastMessage}</div>
                            <button
                                type="button"
                                className="btn-close btn-close-white me-2 m-auto"
                                onClick={() => setShowToast(false)}
                            ></button>
                        </div>
                    </div>
                </div>

                <style>
                    {`
            .table-container {
              display: flex;
              flex-direction: column;
              height: calc(100vh - 200px);
            }
            .table-responsive {
              flex: 1;
              overflow-y: auto;
              margin-bottom: 20px;
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
            .shadow {
              box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
            }
            .page-item.active .page-link {
              background-color: #000;
             // border-color: #000;
              color: #fff;
            }
            .page-link {
              color: #000;
            }
            .page-link:hover {
              color: #000;
              background-color: #e9ecef;
            }
            .is-invalid {
              border-color: #dc3545 !important;
            }
            .invalid-feedback {
              display: block;
              color: #dc3545;
              font-size: 0.875rem;
              margin-top: 0.25rem;
            }
          `}
                </style>
            </div>
        </div>
    );
};

export default WorkStatus;