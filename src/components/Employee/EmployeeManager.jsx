import { useState, useEffect } from 'react';
import React from 'react';
import EmployeeGrid from './EmployeeGrid';
import AddEmployeeModal from './AddEmployeeModal';
import EmployeeDetailsModal from './EmployeeDetailsModal';

const EmployeeManager = () => {
  const [employees, setEmployees] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('https://dasfab.online:8443/employee', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch employees');
        }
        const data = await response.json();
        console.log('Fetched employee data from API:', data); // Debug log
        const mappedData = data.map(item => ({
          id: item.id,
          title: item.personalInfo?.title || '',
          firstName: item.personalInfo?.firstName || '',
          middleName: item.personalInfo?.middleName || '',
          lastName: item.personalInfo?.lastName || '',
          employeeId: item.employmentInfo?.employeeId || '',
          aadhaarCard: item.personalInfo?.aadhaar || '',
          gender: item.personalInfo?.gender || 'Male',
          mobile: item.contactInfo?.phone1 ? String(item.contactInfo.phone1) : '',
          personalEmail: item.contactInfo?.personalEmail || '',
          officialEmail: item.contactInfo?.officeEmail || '',
          pan: item.personalInfo?.pan || '',
          drivingLicense: item.personalInfo?.drivingLicense || '',
          address1: item.contactInfo?.address?.address1 || '',
          address2: item.contactInfo?.address?.address2 || '',
          address3: item.contactInfo?.address?.address3 || '',
          designation: item.employmentInfo?.designation || '',
          fathersName: item.personalInfo?.fatherName || '',
          esiNo: item.employmentInfo?.esiNumber || '',
          ediDispensary: item.employmentInfo?.esiDispensary || '',
          dob: item.personalInfo?.dob ? item.personalInfo.dob.split('T')[0] : '',
          placeOfBirth: item.personalInfo?.placeOfBirth || '',
          age: '',
          maritalStatus: item.personalInfo?.maritalStatus || 'Single',
          children: item.personalInfo?.numOfChildren ? String(item.personalInfo.numOfChildren) : '',
          city: item.contactInfo?.address?.city || '',
          state: item.contactInfo?.address?.state || '',
          pinCode: item.contactInfo?.address?.pin ? String(item.contactInfo.address.pin) : '',
          nationality: item.personalInfo?.nationality || 'Indian',
          citizenship: item.personalInfo?.citizenship || 'Indian',
          spouseName: item.personalInfo?.spouseName || '',
          officialMobile: item.contactInfo?.officialMobile || '',
          phone1: item.contactInfo?.phone1 ? String(item.contactInfo.phone1) : '',
          phone2: item.contactInfo?.phone2 ? String(item.contactInfo.phone2) : '',
          uan: item.personalInfo?.uan || '',
          status: item.inactive ? 'Inactive' : 'Active',
          tracking: 'Tracking',
          projects: item.projects || [],
        }));
        console.log('Mapped employees state:', mappedData); // Debug log
        setEmployees(mappedData);
      } catch (error) {
        console.error('Error fetching employees:', error);
        showToastMessage('Failed to fetch employees');
      }
    };

    fetchEmployees();
  }, []);

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee({ ...employee });
    setShowAddModal(true);
  };

  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setShowAddModal(true);
  };

  const handleViewDetails = (employee) => {
    setSelectedEmployee(employee);
    setShowDetailsModal(true);
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
    <div className='employee-grid'>
      <EmployeeGrid
        setShowAddModal={setShowAddModal}
        employees={employees}
        setEmployees={setEmployees}
        showToastMessage={showToastMessage}
        onEditEmployee={handleEditEmployee}
        onAddEmployee={handleAddEmployee}
        onViewDetails={handleViewDetails}
      />
      <AddEmployeeModal
        showAddModal={showAddModal}
        setShowAddModal={setShowAddModal}
        setEmployees={setEmployees}
        employees={employees}
        showToastMessage={showToastMessage}
        editingEmployee={editingEmployee}
      />
      <EmployeeDetailsModal
        showDetailsModal={showDetailsModal}
        setShowDetailsModal={setShowDetailsModal}
        employee={selectedEmployee}
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