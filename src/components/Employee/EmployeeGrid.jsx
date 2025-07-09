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
    console.log('Sorting employees:', employees); // Debug log
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

  const filteredData = React.useMemo(() => {
    console.log('Filtering with searchTerm:', searchTerm, 'and sortedData:', sortedData); // Debug log
    return sortedData.filter(employee =>
      columns.some(column => {
        const value = employee[column.key]?.toString().toLowerCase() || '';
        return value.includes(searchTerm.toLowerCase());
      })
    );
  }, [sortedData, searchTerm, columns]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const currentPageData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handleToggleStatus = async (id) => {
    console.log('Toggling status for employee ID:', id);
    const employee = employees.find(emp => emp.id === id);
    if (!employee) {
      console.error('Employee not found with ID:', id);
      return;
    }

    const updatedStatus = employee.status === 'Active' ? 'Inactive' : 'Active';
    const payload = {
      id: employee.id,
      employmentInfo: {
        employeeId: employee.employeeId || null,
        designation: employee.designation || null,
        esiNumber: employee.esiNo || null,
        esiDispensary: employee.ediDispensary || null,
      },
      contactInfo: {
        phone1: employee.phone1 ? parseInt(employee.phone1) : 0,
        phone2: employee.phone2 ? parseInt(employee.phone2) : 0,
        address: {
          address1: employee.address1 || null,
          address2: employee.address2 || null,
          city: employee.city || null,
          state: employee.state || null,
          pin: employee.pinCode ? parseInt(employee.pinCode) : null,
        },
        personalEmail: employee.personalEmail || null,
        officeEmail: employee.officialEmail || null,
      },
      personalInfo: {
        title: employee.title || null,
        firstName: employee.firstName || null,
        middleName: employee.middleName || null,
        lastName: employee.lastName || null,
        aadhaar: employee.aadhaarCard || null,
        pan: employee.pan || null,
        drivingLicense: employee.drivingLicense || null,
        gender: employee.gender || null,
        fatherName: employee.fathersName || null,
        dob: employee.dob ? new Date(employee.dob).toISOString() : null,
        placeOfBirth: employee.placeOfBirth || null,
        maritalStatus: employee.maritalStatus || null,
        numOfChildren: employee.children ? parseInt(employee.children) : null,
        nationality: employee.nationality || null,
        citizenship: employee.citizenship || null,
        spouseName: employee.spouseName || null,
      },
      createdDate: employee.createdDate || new Date().toISOString(),
      status: updatedStatus,
      projects: employee.projects || [],
    };

    try {
      console.log('Sending PATCH request with payload:', payload);
      const response = await fetch(`https://dasfab.online:8443/employee/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update employee status: ${errorText}`);
      }

      setEmployees(employees.map(emp =>
        emp.id === id ? { ...emp, status: updatedStatus } : emp
      ));
      showToastMessage('Status updated successfully');
    } catch (error) {
      console.error('Error updating employee status:', error.message);
      showToastMessage('Failed to update employee status');
    }
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <span className="ms-2">⇅</span>;
    return sortConfig.direction === 'asc' ? <span className="ms-2">↑</span> : <span className="ms-2">↓</span>;
  };

  const handleAfterAdd = () => {
    setSearchTerm(''); // Reset search term to show all employees
    setCurrentPage(1); // Reset to first page
  };

  return (
    <div className="container mt-4" style={{ display: 'flex', flexDirection: 'column' }}>
      <div className='d-flex flex-column gap-3 gap-md-0 flex-md-row align-items-center mb-3'>
        <div className="col-12 col-md-8">
          <div className="d-flex align-items-center gap-3">
            <h5 className="mb-0"><a href='/dashboard'><img src="/left-arrow-black.svg" alt="Back" /></a> EMPLOYEE</h5>
            <button className="btn btn-black" onClick={() => {
              console.log('Add button clicked');
              onAddEmployee();
              handleAfterAdd(); // Reset search after add
            }}>Add</button>
          </div>
        </div>
        <div className='col-12 col-md-4'>
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={searchTerm}
            onChange={e => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on new search
            }}
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
            {currentPageData.length > 0 ? (
              currentPageData.map(employee => (
                <tr key={employee.id}>
                  <td>
                    <a
                      href="#"
                      className="text-decoration-none"
                      onClick={(e) => {
                        e.preventDefault();
                        console.log('Edit employee:', employee);
                        onEditEmployee(employee);
                      }}
                    >
                      {employee.firstName || 'N/A'}
                    </a>
                  </td>
                  <td>{employee.lastName || 'N/A'}</td>
                  <td>{employee.designation || 'N/A'}</td>
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
                        onClick={() => {
                          console.log('View details for employee:', employee);
                          onViewDetails(employee);
                        }}
                      >
                        <FaExternalLinkAlt /> View Projects
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center">
                  {employees.length === 0 ? 'No employees fetched' : 'No employees found'}
                </td>
              </tr>
            )}
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