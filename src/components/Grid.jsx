import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const DataTable = ({ columns = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [projects, setProjects] = useState([]);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [newProject, setNewProject] = useState({ project: '', projectInfo: '' });
  const [editProject, setEditProject] = useState(null);
  const [errors, setErrors] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const addModalRef = useRef(null);
  const editModalRef = useRef(null);
  const searchInputRef = useRef(null);

  // Fetch projects from API
  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('https://dasfab.online:8443/project', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error('API response is not an array');
      }
      const mappedData = data.map(item => ({
        id: item.id,
        project: item.name || '',
        projectInfo: item.info || '',
        date: item.createdDate || '',
        inactive: item.inactive || false,
      }));
      mappedData.sort((a, b) => new Date(b.date) - new Date(a.date));
      setProjects(mappedData);
      setFetchError(null);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setFetchError(error.message);
      showToastMessage('Failed to fetch projects');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch projects on mount
  useEffect(() => {
    fetchProjects();
  }, []);

  const validateForm = (projectData) => {
    let formErrors = {};
    if (!projectData.project.trim()) formErrors.project = 'Project name is required';
    if (!projectData.projectInfo.trim()) formErrors.projectInfo = 'Project info is required';
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSaveNew = async (e) => {
    e.preventDefault();
    if (!validateForm(newProject)) return;

    const payload = {
      name: newProject.project,
      info: newProject.projectInfo,
      createdDate: new Date().toISOString(),
      inactive: false,
    };

    try {
      const response = await fetch('https://dasfab.online:8443/project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to add project');
      }

      await fetchProjects();
      setNewProject({ project: '', projectInfo: '' });
      setErrors({});
      setSearchTerm('');
      if (searchInputRef.current) {
        searchInputRef.current.value = '';
      }
      setCurrentPage(1);
      showToastMessage(`"${newProject.project}" added successfully!`);

      try {
        const modalElement = addModalRef.current;
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) {
          modalInstance.hide();
        }
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) {
          backdrop.remove();
        }
        document.body.classList.remove('modal-open');
        document.body.style.removeProperty('overflow');
        document.body.style.removeProperty('padding-right');
      } catch (modalError) {
        console.error('Error closing modal:', modalError);
      }
    } catch (error) {
      console.error('Error adding project:', error);
      showToastMessage('Failed to add project');
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editProject || !validateForm(editProject)) return;

    const payload = {
      id: editProject.id,
      name: editProject.project,
      info: editProject.projectInfo,
      createdDate: editProject.date,
      inactive: editProject.inactive,
    };

    try {
      const response = await fetch('https://dasfab.online:8443/project', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to update project');
      }

      await fetchProjects();
      setEditProject(null);
      setErrors({});
      showToastMessage(`"${editProject.project}" updated successfully!`);

      try {
        const modalElement = editModalRef.current;
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) {
          modalInstance.hide();
        }
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) {
          backdrop.remove();
        }
        document.body.classList.remove('modal-open');
        document.body.style.removeProperty('overflow');
        document.body.style.removeProperty('padding-right');
      } catch (modalError) {
        console.error('Error closing modal:', modalError);
      }
    } catch (error) {
      console.error('Error updating project:', error);
      showToastMessage('Failed to update project');
    }
  };

  const handleToggle = async (id) => {
    const project = projects.find(p => p.id === id);
    if (!project) return;

    const newInactiveState = !project.inactive;
    const payload = {
      id: project.id,
      name: project.project,
      info: project.projectInfo,
      createdDate: project.date,
      inactive: newInactiveState,
    };

    try {
      const response = await fetch('https://dasfab.online:8443/project', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to update project status');
      }

      setProjects(prevProjects =>
        prevProjects.map(p => {
          if (p.id === id) {
            showToastMessage(
              `Project "${p.project}" ${newInactiveState ? 'disabled' : 'enabled'}`
            );
            return { ...p, inactive: newInactiveState };
          }
          return p;
        })
      );
    } catch (error) {
      console.error('Error updating project:', error);
      showToastMessage('Failed to update project status');
    }
  };

  const handleEditClick = (project) => {
    setEditProject(project);
    setErrors({});
    const modalElement = editModalRef.current;
    const modalInstance = new bootstrap.Modal(modalElement);
    modalInstance.show();
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
      const aValue = (a[sortConfig.key] || '').toString().toLowerCase();
      const bValue = (b[sortConfig.key] || '').toString().toLowerCase();
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1; 
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1; 
      return 0;
    });
  }
  return sortableData;
}, [projects, sortConfig]);

  const filteredData = React.useMemo(() => {
    const result = sortedData.filter(row =>
      columns.some(column => {
        const value = (row[column.key] || '').toString().toLowerCase().trim();
        return value.includes(searchTerm.toLowerCase().trim());
      })
    );
    return result;
  }, [sortedData, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const currentPageData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

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
        <div className='d-flex flex-column flex-md-row align-items-center'>
          <div className="col-12 col-md-8 mb-3">
            <div className="d-flex align-items-center gap-3">
              <h5 className="mb-0"> <a href='/dashboard'><img src="/left-arrow-black.svg"/></a> Projects</h5>
              <button className="btn btn-black" data-bs-toggle="modal" data-bs-target="#addProject">Add</button>
            </div>
          </div>
          <div className='col-12 col-md-4'>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Search..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              ref={searchInputRef}
            />
          </div>
        </div>

        <div className="table-responsive">
          {isLoading ? (
            <div className="text-center py-4">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : fetchError ? (
            <div className="alert alert-danger" role="alert">
              Failed to load projects: {fetchError}
            </div>
          ) : filteredData.length === 0 ? (
            <div className="alert alert-info" role="alert">
              No projects found. {searchTerm ? 'Try clearing the search term.' : 'Add a new project.'}
            </div>
          ) : (
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
                        {column.key === 'project' ? (
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handleEditClick(row);
                            }}
                            style={{ textDecoration: 'underline', color: '#007bff' }}
                          >
                            {row.project}
                          </a>
                        ) : column.key === 'action' ? (
                          <button
                            className={`btn btn-${row.inactive ? 'warning' : 'success'} btn-sm me-2`}
                            onClick={() => handleToggle(row.id)}
                          >
                            {row.inactive ? 'Enable' : 'Disable'}
                          </button>
                        ) : column.key === 'date' ? new Date(row[column.key]).toLocaleString() : row[column.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
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
                  <li
                    key={index}
                    className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                  >
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

      {/* Modal for Adding Project */}
      <div className="modal fade" id="addProject" tabIndex="-1" aria-hidden="true" ref={addModalRef}>
        <div className="modal-dialog">
          <div className="modal-content p-3">
            <div className="modal-header modal-custom-head">
              <h5 className="modal-title">Add Project</h5>
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
                  Project Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={newProject.project}
                  onChange={e => setNewProject({ ...newProject, project: e.target.value })}
                />
                {errors.project && <small className="text-danger">{errors.project}</small>}
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Project Info <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={newProject.projectInfo}
                  onChange={e => setNewProject({ ...newProject, projectInfo: e.target.value })}
                />
                {errors.projectInfo && (
                  <small className="text-danger">{errors.projectInfo}</small>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-cancel"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-black"
                onClick={handleSaveNew}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Editing Project */}
      <div className="modal fade" id="editProject" tabIndex="-1" aria-hidden="true" ref={editModalRef}>
        <div className="modal-dialog">
          <div className="modal-content p-3">
            <div className="modal-header modal-custom-head">
              <h5 className="modal-title">Edit Project</h5>
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
                  Project Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={editProject?.project || ''}
                  onChange={e => setEditProject({ ...editProject, project: e.target.value })}
                />
                {errors.project && <small className="text-danger">{errors.project}</small>}
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Project Info <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={editProject?.projectInfo || ''}
                  onChange={e => setEditProject({ ...editProject, projectInfo: e.target.value })}
                />
                {errors.projectInfo && (
                  <small className="text-danger">{errors.projectInfo}</small>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-cancel"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-black"
                onClick={handleSaveEdit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
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
    { key: 'action', label: 'Action', sortable: false },
  ];

  return <DataTable columns={columns} />;
};

export default Grid;