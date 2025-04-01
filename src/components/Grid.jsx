import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const DataTable = ({ data, columns }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [projects, setProjects] = useState(data);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Filter data based on search term
  const filteredData = projects.filter((row) =>
    columns.some((column) =>
      row[column.key] && row[column.key].toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Calculate the number of pages
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  // Get the data for the current page
  const currentPageData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page on search
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleToggle = (id) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === id
          ? { ...project, isActive: !project.isActive } // Toggle active state
          : project
      )
    );

    const toggledProject = projects.find((p) => p.id === id);
    showToastMessage(`Project ${id} ${toggledProject?.isActive ? 'Disabled' : 'Enabled'}`);
  };

  const handleArchive = (id) => {
    showToastMessage(`Project ${id} Archived!`);
  };

  return (
    <div className="table-responsive">
      <div className='d-flex'>
        <div className="col-lg-8 mb-3">
          <div className="d-flex align-items-center gap-3">
            <h5 className="mb-0">Projects</h5>
            <a
              href="#"
              className="btn btn-black float-end"
              data-bs-toggle="modal"
              data-bs-target="#addProject">Add</a>
          </div>
        </div>
        <div className='col-lg-4'>
          {/* Search Input */}
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      <table className="table table-bordered bg-white">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((row, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column.key}>
                  {column.key === 'action' ? (
                    <>
                      <button
                        className={`btn btn-${row.isActive ? 'success' : 'warning'} btn-sm me-2`}
                        onClick={() => handleToggle(row.id)}
                      >
                        {row.isActive ? 'Disable' : 'Enable'}
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => handleArchive(row.id)}
                      >
                        Archive
                      </button>
                    </>
                  ) : column.key === 'date' ? (
                    new Date(row[column.key]).toLocaleDateString()
                  ) : (
                    row[column.key]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
          </li>
          {[...Array(totalPages)].map((_, index) => (
            <li
              key={index}
              className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
          >
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

      {/* Toast Message */}
      <div
        className={`toast-container position-fixed top-0 end-0 p-3`}
        style={{ zIndex: 1050 }}
      >
        <div
          className={`toast ${showToast ? 'show' : 'hide'} bg-success text-white fade`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          style={{
            transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out',
            transform: showToast ? 'translateY(0)' : 'translateY(-20px)',
            opacity: showToast ? 1 : 0,
          }}
        >
          <div className="toast-header bg-dark text-white">
            <strong className="me-auto">Notification</strong>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={() => setShowToast(false)}
            ></button>
          </div>
          <div className="toast-body">{toastMessage}</div>
        </div>
      </div>
    </div>
  );
};

// Example usage of the DataTable component
const Grid = () => {
  const columns = [
    { key: 'project', label: 'Project' },
    { key: 'action', label: 'Action' },
    { key: 'projectInfo', label: 'Project Info' },
    { key: 'date', label: 'Date' },
  ];

  const data = [
    { id: 1, project: 'Project A', projectInfo: 'Info about Project A', date: '2025-04-01', isActive: true },
    { id: 2, project: 'Project B', projectInfo: 'Info about Project B', date: '2025-04-02', isActive: true },
    { id: 3, project: 'Project C', projectInfo: 'Info about Project C', date: '2025-04-03', isActive: false },
    { id: 4, project: 'Project D', projectInfo: 'Info about Project D', date: '2025-04-04', isActive: true },
    { id: 5, project: 'Project E', projectInfo: 'Info about Project E', date: '2025-04-05', isActive: false },
  ];

  return (
    <div className="container mt-4">
      <DataTable data={data} columns={columns} />
    </div>
  );
};

export default Grid;
