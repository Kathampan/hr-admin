import { useState, useEffect } from 'react';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaExternalLinkAlt } from 'react-icons/fa';

const EmployeeGrid = ({ setShowAddModal, employees, setEmployees, showToastMessage, onEditEmployee, onAddEmployee, onViewDetails }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

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

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <span className="ms-2">⇅</span>;
    return sortConfig.direction === 'asc' ? <span className="ms-2">↑</span> : <span className="ms-2">↓</span>;
  };

  return (
    <div className="container mt-4 employee-grid" style={{ display: 'flex', flexDirection: 'column', }}>
      <div className='d-flex align-items-center gap-5 gap-md-0 mb-3'>
        <div className="col-lg-8">
          <div className="d-flex align-items-center gap-3">
            <h5 className="mb-0">EMPLOYEE</h5>
            <button
              className="btn btn-black"
              onClick={onAddEmployee}
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

      <div className="table-responsive" style={{ flex: 1, overflowY: 'auto' }}>
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
                    href="#"
                    className="text-decoration-none"
                    onClick={(e) => {
                      e.preventDefault();
                      onEditEmployee(employee);
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
                      className={`btn btn-sm employee-stat ${employee.status === 'Active' ? 'btn-warning' : 'btn-success'}`}
                      onClick={() => handleToggleStatus(employee.id)}
                    >
                      {employee.status === 'Active' ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      className="btn btn-sm btn-link text-decoration-none"
                      onClick={() => onViewDetails(employee)} // Use the new handler
                    >
                      <FaExternalLinkAlt /> View Projects
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredData.length > rowsPerPage && (
        <div className="pagination-container mt-3" style={{
          position: 'sticky',
          bottom: 0,
          backgroundColor: 'white',
          padding: '10px 0',
          borderTop: '1px solid #dee2e6'
        }}>
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
  );
};

export default EmployeeGrid;