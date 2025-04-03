import { useState, useEffect } from 'react';
import React from 'react';
import EmployeeGrid from './EmployeeGrid';
import AddEmployeeModal from './AddEmployeeModal';

const EmployeeManager = () => {
  const [employees, setEmployees] = useState([
    { id: 1, firstName: 'Ask', lastName: 'ST', designation: 'Developer', status: 'Active', tracking: 'Tracking' },
    { id: 2, firstName: 'Test', lastName: 'KJ', designation: 'Manager', status: 'Active', tracking: 'Tracking' },
    { id: 3, firstName: 'Test', lastName: 'PP', designation: 'Designer', status: 'Inactive', tracking: 'Tracking' },
    { id: 4, firstName: 'Ask', lastName: 'ST', designation: 'Developer', status: 'Active', tracking: 'Tracking' },
    { id: 5, firstName: 'Test', lastName: 'KJ', designation: 'Manager', status: 'Inactive', tracking: 'Tracking' },
    { id: 6, firstName: 'Test', lastName: 'PP', designation: 'Designer', status: 'Active', tracking: 'Tracking' },
    { id: 7, firstName: 'Ask', lastName: 'ST', designation: 'Developer', status: 'Active', tracking: 'Tracking' },
    { id: 8, firstName: 'Test', lastName: 'KJ', designation: 'Manager', status: 'Active', tracking: 'Tracking' },
    { id: 9, firstName: 'Test', lastName: 'PP', designation: 'Designer', status: 'Active', tracking: 'Tracking' },
    { id: 10, firstName: 'Ask', lastName: 'ST', designation: 'Developer', status: 'Active', tracking: 'Tracking' },
    { id: 11, firstName: 'Test', lastName: 'KJ', designation: 'Manager', status: 'Active', tracking: 'Tracking' },
    { id: 12, firstName: 'Test', lastName: 'PP', designation: 'Designer', status: 'Active', tracking: 'Tracking' }
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const showToastMessage = (message) => {
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

  return (
    <div>
      <EmployeeGrid
        setShowAddModal={setShowAddModal}
        employees={employees}
        setEmployees={setEmployees}
        showToastMessage={showToastMessage}
      />
      <AddEmployeeModal
        showAddModal={showAddModal}
        setShowAddModal={setShowAddModal}
        setEmployees={setEmployees}
        employees={employees}
        showToastMessage={showToastMessage}
      />
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
    </div>
  );
};

export default EmployeeManager;