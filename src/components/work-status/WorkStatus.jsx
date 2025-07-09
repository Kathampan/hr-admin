import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const WorkStatus = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);

    // Sample data for the table
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
    ];

    // Sample data for dropdowns
    const projectOptions = ['Website Redesign', 'Mobile App Development', 'Database Optimization'];
    const employeeOptions = ['John Doe', 'Jane Smith', 'Bob Johnson'];
    const hoursOptions = Array.from({ length: 24 }, (_, i) => i);
    const minutesOptions = ['00', '15', '30', '45'];

    // Handle modal toggle
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <div className="container mt-4 shadow rounded-3 p-3">
            <div className="col-lg-12">
                <div className="container mt-4">
                    <div className="table-container">
                        <div className="d-flex flex-column flex-md-row align-items-center">
                            <div className="col-12 col-md-8 mb-3">
                                <div className="d-flex align-items-center gap-3">
                                    <h5 className="mb-0">
                                        <a href="/dashboard"><img src="/left-arrow-black.svg" alt="Back" /></a> WorkStatus
                                    </h5>
                                    <button
                                        className="btn btn-black"
                                        onClick={handleShowModal}
                                        data-bs-toggle="modal"
                                        data-bs-target="#addWorkStatus"
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                            <div className="col-12 col-md-4">
                                <input
                                    type="text"
                                    className="form-control mb-3 bg-white"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
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
                                    {projects.map((project) => (
                                        <tr key={project.id}>
                                            <td>{project.name}</td>
                                            <td>{project.time}</td>
                                            <td>{project.description}</td>
                                            <td>{project.eodDate}</td>
                                            <td>{project.postedDate}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="pagination-container mt-3">
                            <nav>
                                <ul className="pagination justify-content-center mb-0">
                                    <li className="page-item">
                                        <button className="page-link">Prev</button>
                                    </li>
                                    <li className="page-item">
                                        <button className="page-link">1</button>
                                    </li>
                                    <li className="page-item">
                                        <button className="page-link">Next</button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>

                    {/* Modal for Adding status */}
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
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Project <span className="text-danger">*</span>
                                        </label>
                                        <select className="form-select" required>
                                            <option value="">Select Project</option>
                                            {projectOptions.map((project, index) => (
                                                <option key={index} value={project}>
                                                    {project}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Employee <span className="text-danger">*</span>
                                        </label>
                                        <select className="form-select" required>
                                            <option value="">Select Employee</option>
                                            {employeeOptions.map((employee, index) => (
                                                <option key={index} value={employee}>
                                                    {employee}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Hours Spent <span className="text-danger">*</span>
                                        </label>
                                        <select className="form-select" required>
                                            <option value="">Select Hours</option>
                                            {hoursOptions.map((hour, index) => (
                                                <option key={index} value={hour}>
                                                    {hour}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Minutes Spent <span className="text-danger">*</span>
                                        </label>
                                        <select className="form-select" required>
                                            <option value="">Select Minutes</option>
                                            {minutesOptions.map((minute, index) => (
                                                <option key={index} value={minute}>
                                                    {minute}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Status <span className="text-danger">*</span>
                                        </label>
                                        <textarea
                                            className="form-control"
                                            rows="4"
                                            placeholder="Enter status details..."
                                            required
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary" data-bs-dismiss="modal"                                       
                                    >
                                        Discard
                                    </button>
                                    <button type="button" className="btn btn-black" data-bs-dismiss="modal">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {showModal && <div className="modal-backdrop fade show"></div>}
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
          `}
                </style>
            </div>
        </div>
    );
};

export default WorkStatus;