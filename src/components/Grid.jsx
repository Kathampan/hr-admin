import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const DataTable = ({ data = [], columns = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10); // Set to 10 rows per page
  const [projects, setProjects] = useState(data);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [newProject, setNewProject] = useState({ project: '', projectInfo: '' });
  const [errors, setErrors] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const modalRef = useRef(null);

  const validateForm = () => {
    let formErrors = {};
    if (!newProject.project.trim()) formErrors.project = 'Project name is required';
    if (!newProject.projectInfo.trim()) formErrors.projectInfo = 'Project info is required';
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;
    const updatedProjects = [
      ...projects,
      { 
        id: projects.length + 1, 
        ...newProject, 
        isActive: true,
        date: new Date().toISOString().split('T')[0]
      }
    ];
    setProjects(updatedProjects);
    setNewProject({ project: '', projectInfo: '' });
    setErrors({});
    setCurrentPage(Math.ceil(updatedProjects.length / rowsPerPage));
    showToastMessage(`"${newProject.project}" added successfully!`);
    
    const modal = bootstrap.Modal.getInstance(modalRef.current);
    modal.hide();
  };

  const requestSort = (key) => {
    if (!columns.find(col => col.key === key)?.sortable) return;
    
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    let sortableData = [...projects];
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
  }, [projects, sortConfig]);

  const filteredData = sortedData.filter(row =>
    columns.some(column => row[column.key]?.toString().toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const currentPageData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handleToggle = id => {
    setProjects(prevProjects =>
      prevProjects.map(project => {
        if (project.id === id) {
          showToastMessage(
            `Project "${project.project}" ${!project.isActive ? 'enabled' : 'disabled'}`
          );
          return { ...project, isActive: !project.isActive };
        }
        return project;
      })
    );
  };

  const handleArchive = id => {
    const project = projects.find(p => p.id === id);
    if (project) {
      showToastMessage(`"${project.project}" archived!`);
    }
  };

  const showToastMessage = message => {
    setToastMessage(message);
    setShowToast(true);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <span className="ms-2">⇅</span>;
    return sortConfig.direction === 'asc' ? <span className="ms-2">↑</span> : <span className="ms-2">↓</span>;
  };

  return (
    <div className="container mt-4">
      <div className="table-container">
        <div className='d-flex align-items-center gap-5 gap-md-0'>
          <div className="col-lg-8 mb-3">
            <div className="d-flex align-items-center gap-3">
              <h5 className="mb-0">Projects</h5>
              <button className="btn btn-black" data-bs-toggle="modal" data-bs-target="#addProject">Add</button>
            </div>
          </div>
          <div className='col-lg-4'>
            <input type="text" className="form-control mb-3" placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
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
              {currentPageData.map(row => (
                <tr key={row.id}>
                  {columns.map(column => (
                    <td key={column.key}>
                      {column.key === 'action' ? (
                        <>
                          <button className={`btn btn-${row.isActive ? 'success' : 'warning'} btn-sm me-2`} onClick={() => handleToggle(row.id)}>
                            {row.isActive ? 'Disable' : 'Enable'}
                          </button>
                          <button className="btn btn-secondary btn-sm" onClick={() => handleArchive(row.id)}>Archive</button>
                        </>
                      ) : column.key === 'date' ? new Date(row[column.key]).toLocaleDateString() : row[column.key]}
                    </td>
                  ))}
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
                  <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
                </li>
                {[...Array(totalPages)].map((_, index) => (
                  <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>

      {/* Modal for Adding Project */}
      <div className="modal fade" id="addProject" tabIndex="-1" aria-hidden="true" ref={modalRef}>
        <div className="modal-dialog">
          <div className="modal-content p-3">
            <div className="modal-header modal-custom-head">
              <h5 className="modal-title">Add Project</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Project Name <span className="text-danger">*</span></label>
                <input type="text" className="form-control" value={newProject.project} onChange={e => setNewProject({ ...newProject, project: e.target.value })} />
                {errors.project && <small className="text-danger">{errors.project}</small>}
              </div>
              <div className="mb-3">
                <label className="form-label">Project Info <span className="text-danger">*</span></label>
                <input type="text" className="form-control" value={newProject.projectInfo} onChange={e => setNewProject({ ...newProject, projectInfo: e.target.value })} />
                {errors.projectInfo && <small className="text-danger">{errors.projectInfo}</small>}
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-cancel" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-black" onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Toast Notification */}
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
          transform: showToast ? 'translateY(0)' : 'translateY(-100%)'
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

      <style jsx>{`
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
      `}</style>
    </div>
  );
};

const Grid = () => {
  const columns = [
    { key: 'project', label: 'Project', sortable: true },
    { key: 'projectInfo', label: 'Project Info', sortable: false },
    { key: 'date', label: 'Date', sortable: true },
    { key: 'action', label: 'Action', sortable: false }
  ];

  const initialData = [];

  return <DataTable data={initialData} columns={columns} />;
};

export default Grid;