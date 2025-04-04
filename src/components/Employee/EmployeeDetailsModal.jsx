import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const EmployeeDetailsModal = ({ showDetailsModal, setShowDetailsModal, employee }) => {
  if (!employee) return null;

  return (
    <>
      {showDetailsModal && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Employee - {employee.firstName} {employee.lastName}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDetailsModal(false)}
                ></button>
              </div>
              <div className="modal-body p-4">
                {/* Basic Information */}
                {/* <div className="mb-4">
                  <h6 className="border-bottom pb-2">Basic Information</h6>
                  <div className="row g-3">
                    <div className="col-md-4">
                      <label className="form-label fw-bold">Title:</label>
                      <p>{employee.title || 'N/A'}</p>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-bold">First Name:</label>
                      <p>{employee.firstName || 'N/A'}</p>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-bold">Middle Name:</label>
                      <p>{employee.middleName || 'N/A'}</p>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-bold">Last Name:</label>
                      <p>{employee.lastName || 'N/A'}</p>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-bold">Employee ID:</label>
                      <p>{employee.employeeId || 'N/A'}</p>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-bold">Aadhaar Card:</label>
                      <p>{employee.aadhaarCard || 'N/A'}</p>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-bold">Gender:</label>
                      <p>{employee.gender || 'N/A'}</p>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-bold">Designation:</label>
                      <p>{employee.designation || 'N/A'}</p>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-bold">Father's Name:</label>
                      <p>{employee.fathersName || 'N/A'}</p>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-bold">ESI No.:</label>
                      <p>{employee.esiNo || 'N/A'}</p>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-bold">ESI Dispensary:</label>
                      <p>{employee.ediDispensary || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                {/* <div className="mb-4">
                  <h6 className="border-bottom pb-2">Personal Information</h6>
                  <div className="row g-3">
                    <div className="col-md-4">
                      <label className="form-label fw-bold">Mobile:</label>
                      <p>{employee.mobile || 'N/A'}</p>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-bold">Personal Email:</label>
                      <p>{employee.personalEmail || 'N/A'}</p>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-bold">Official Email:</label>
                      <p>{employee.officialEmail || 'N/A'}</p>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-bold">PAN:</label>
                      <p>{employee.pan || 'N/A'}</p>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-bold">Driving License:</label>
                      <p>{employee.drivingLicense || 'N/A'}</p>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-bold">Date of Birth:</label>
                      <p>{employee.dob || 'N/A'}</p>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-bold">Place of Birth:</label>
                      <p>{employee.placeOfBirth || 'N/A'}</p>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-bold">Age:</label>
                      <p>{employee.age || 'N/A'}</p>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-bold">UAN:</label>
                      <p>{employee.uan || 'N/A'}</p>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-bold">Marital Status:</label>
                      <p>{employee.maritalStatus || 'N/A'}</p>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-bold">No. of Children:</label>
                      <p>{employee.children || 'N/A'}</p>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-bold">Nationality:</label>
                      <p>{employee.nationality || 'N/A'}</p>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-bold">Citizenship:</label>
                      <p>{employee.citizenship || 'N/A'}</p>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-bold">Spouse Name:</label>
                      <p>{employee.spouseName || 'N/A'}</p>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-bold">Official Mobile:</label>
                      <p>{employee.officialMobile || 'N/A'}</p>
                    </div>
                  </div>
                </div> */}

                {/* Present Address */}
                {/* <div className="mb-4">
                  <h6 className="border-bottom pb-2">Present Address</h6>
                  <div className="row g-3">
                    <div className="col-md-4">
                      <label className="form-label fw-bold">Address 1:</label>
                      <p>{employee.address1 || 'N/A'}</p>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-bold">Address 2:</label>
                      <p>{employee.address2 || 'N/A'}</p>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-bold">Address 3:</label>
                      <p>{employee.address3 || 'N/A'}</p>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-bold">City:</label>
                      <p>{employee.city || 'N/A'}</p>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-bold">State:</label>
                      <p>{employee.state || 'N/A'}</p>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-bold">Pin Code:</label>
                      <p>{employee.pinCode || 'N/A'}</p>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-bold">Phone 1:</label>
                      <p>{employee.phone1 || 'N/A'}</p>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-bold">Phone 2:</label>
                      <p>{employee.phone2 || 'N/A'}</p>
                    </div>
                  </div>
                </div> */} 

                {/* Project Details */}
                <div className="mb-4">
                  <h5 className="pb-2">Project Details</h5>
                  {employee.projects && employee.projects.length > 0 ? (
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Project ID</th>
                            <th>Project Name</th>
                            <th>Role</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {employee.projects.map(project => (
                            <tr key={project.projectId}>
                              <td>{project.projectId}</td>
                              <td>{project.projectName}</td>
                              <td>{project.role}</td>
                              <td>{project.startDate}</td>
                              <td>{project.endDate || 'N/A'}</td>
                              <td>{project.status}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p>No projects assigned to this employee.</p>
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowDetailsModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmployeeDetailsModal;