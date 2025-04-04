import { useState, useEffect } from 'react';
import React from 'react';
import EmployeeGrid from './EmployeeGrid';
import AddEmployeeModal from './AddEmployeeModal';
import EmployeeDetailsModal from './EmployeeDetailsModal'; // New modal for details

const EmployeeManager = () => {
  const [employees, setEmployees] = useState([
    { 
      id: 1, 
      title: '', 
      firstName: 'Bibs', 
      middleName: '', 
      lastName: 'ST', 
      employeeId: '', 
      aadhaarCard: '', 
      gender: 'Male', 
      mobile: '', 
      personalEmail: '', 
      officialEmail: '', 
      pan: '', 
      drivingLicense: '', 
      address1: '', 
      address2: '', 
      address3: '', 
      designation: 'Developer', 
      fathersName: '', 
      esiNo: '', 
      ediDispensary: '', 
      dob: '', 
      placeOfBirth: '', 
      age: '', 
      maritalStatus: 'Single', 
      children: '', 
      city: '', 
      state: '', 
      pinCode: '', 
      nationality: 'Indian', 
      citizenship: 'Indian', 
      spouseName: '', 
      officialMobile: '', 
      phone1: '', 
      phone2: '', 
      uan: '', 
      status: 'Active', 
      tracking: 'Tracking',
      projects: [
        { projectId: 101, projectName: 'E-Commerce Platform', role: 'Lead Developer', startDate: '2023-01-15', endDate: '2023-12-31', status: 'Completed' },
        { projectId: 102, projectName: 'Inventory System', role: 'Developer', startDate: '2024-01-10', endDate: '2024-06-30', status: 'Ongoing' }
      ]
    },
    { 
      id: 2, 
      title: '', 
      firstName: 'Vishnu', 
      middleName: '', 
      lastName: 'KJ', 
      employeeId: '', 
      aadhaarCard: '', 
      gender: 'Male', 
      mobile: '', 
      personalEmail: '', 
      officialEmail: '', 
      pan: '', 
      drivingLicense: '', 
      address1: '', 
      address2: '', 
      address3: '', 
      designation: 'Manager', 
      fathersName: '', 
      esiNo: '', 
      ediDispensary: '', 
      dob: '', 
      placeOfBirth: '', 
      age: '', 
      maritalStatus: 'Single', 
      children: '', 
      city: '', 
      state: '', 
      pinCode: '', 
      nationality: 'Indian', 
      citizenship: 'Indian', 
      spouseName: '', 
      officialMobile: '', 
      phone1: '', 
      phone2: '', 
      uan: '', 
      status: 'Active', 
      tracking: 'Tracking',
      projects: [
        { projectId: 201, projectName: 'HR System', role: 'Project Manager', startDate: '2023-03-01', endDate: '2023-11-30', status: 'Completed' }
      ]
    },
    { 
      id: 3, 
      title: '', 
      firstName: 'Jithin', 
      middleName: '', 
      lastName: 'PP', 
      employeeId: '', 
      aadhaarCard: '', 
      gender: 'Male', 
      mobile: '', 
      personalEmail: '', 
      officialEmail: '', 
      pan: '', 
      drivingLicense: '', 
      address1: '', 
      address2: '', 
      address3: '', 
      designation: 'Designer', 
      fathersName: '', 
      esiNo: '', 
      ediDispensary: '', 
      dob: '', 
      placeOfBirth: '', 
      age: '', 
      maritalStatus: 'Single', 
      children: '', 
      city: '', 
      state: '', 
      pinCode: '', 
      nationality: 'Indian', 
      citizenship: 'Indian', 
      spouseName: '', 
      officialMobile: '', 
      phone1: '', 
      phone2: '', 
      uan: '', 
      status: 'Inactive', 
      tracking: 'Tracking',
      projects: [
        { projectId: 301, projectName: 'Website Redesign', role: 'UI/UX Designer', startDate: '2023-05-01', endDate: '2023-09-30', status: 'Completed' },
        { projectId: 302, projectName: 'Mobile App Design', role: 'Designer', startDate: '2024-02-01', endDate: '2024-08-31', status: 'Ongoing' }
      ]
    },
    // Add projects for the remaining employees...
    { id: 4, title: '', firstName: 'Ask', middleName: '', lastName: 'ST', employeeId: '', aadhaarCard: '', gender: 'Male', mobile: '', personalEmail: '', officialEmail: '', pan: '', drivingLicense: '', address1: '', address2: '', address3: '', designation: 'Developer', fathersName: '', esiNo: '', ediDispensary: '', dob: '', placeOfBirth: '', age: '', maritalStatus: 'Single', children: '', city: '', state: '', pinCode: '', nationality: 'Indian', citizenship: 'Indian', spouseName: '', officialMobile: '', phone1: '', phone2: '', uan: '', status: 'Active', tracking: 'Tracking', projects: [] },
    { id: 5, title: '', firstName: 'Test', middleName: '', lastName: 'KJ', employeeId: '', aadhaarCard: '', gender: 'Male', mobile: '', personalEmail: '', officialEmail: '', pan: '', drivingLicense: '', address1: '', address2: '', address3: '', designation: 'Manager', fathersName: '', esiNo: '', ediDispensary: '', dob: '', placeOfBirth: '', age: '', maritalStatus: 'Single', children: '', city: '', state: '', pinCode: '', nationality: 'Indian', citizenship: 'Indian', spouseName: '', officialMobile: '', phone1: '', phone2: '', uan: '', status: 'Inactive', tracking: 'Tracking', projects: [] },
    { id: 6, title: '', firstName: 'Test', middleName: '', lastName: 'PP', employeeId: '', aadhaarCard: '', gender: 'Male', mobile: '', personalEmail: '', officialEmail: '', pan: '', drivingLicense: '', address1: '', address2: '', address3: '', designation: 'Designer', fathersName: '', esiNo: '', ediDispensary: '', dob: '', placeOfBirth: '', age: '', maritalStatus: 'Single', children: '', city: '', state: '', pinCode: '', nationality: 'Indian', citizenship: 'Indian', spouseName: '', officialMobile: '', phone1: '', phone2: '', uan: '', status: 'Active', tracking: 'Tracking', projects: [] },
    { id: 7, title: '', firstName: 'Ask', middleName: '', lastName: 'ST', employeeId: '', aadhaarCard: '', gender: 'Male', mobile: '', personalEmail: '', officialEmail: '', pan: '', drivingLicense: '', address1: '', address2: '', address3: '', designation: 'Developer', fathersName: '', esiNo: '', ediDispensary: '', dob: '', placeOfBirth: '', age: '', maritalStatus: 'Single', children: '', city: '', state: '', pinCode: '', nationality: 'Indian', citizenship: 'Indian', spouseName: '', officialMobile: '', phone1: '', phone2: '', uan: '', status: 'Active', tracking: 'Tracking', projects: [] },
    { id: 8, title: '', firstName: 'Test', middleName: '', lastName: 'KJ', employeeId: '', aadhaarCard: '', gender: 'Male', mobile: '', personalEmail: '', officialEmail: '', pan: '', drivingLicense: '', address1: '', address2: '', address3: '', designation: 'Manager', fathersName: '', esiNo: '', ediDispensary: '', dob: '', placeOfBirth: '', age: '', maritalStatus: 'Single', children: '', city: '', state: '', pinCode: '', nationality: 'Indian', citizenship: 'Indian', spouseName: '', officialMobile: '', phone1: '', phone2: '', uan: '', status: 'Active', tracking: 'Tracking', projects: [] },
    { id: 9, title: '', firstName: 'Test', middleName: '', lastName: 'PP', employeeId: '', aadhaarCard: '', gender: 'Male', mobile: '', personalEmail: '', officialEmail: '', pan: '', drivingLicense: '', address1: '', address2: '', address3: '', designation: 'Designer', fathersName: '', esiNo: '', ediDispensary: '', dob: '', placeOfBirth: '', age: '', maritalStatus: 'Single', children: '', city: '', state: '', pinCode: '', nationality: 'Indian', citizenship: 'Indian', spouseName: '', officialMobile: '', phone1: '', phone2: '', uan: '', status: 'Active', tracking: 'Tracking', projects: [] },
    { id: 10, title: '', firstName: 'Ask', middleName: '', lastName: 'ST', employeeId: '', aadhaarCard: '', gender: 'Male', mobile: '', personalEmail: '', officialEmail: '', pan: '', drivingLicense: '', address1: '', address2: '', address3: '', designation: 'Developer', fathersName: '', esiNo: '', ediDispensary: '', dob: '', placeOfBirth: '', age: '', maritalStatus: 'Single', children: '', city: '', state: '', pinCode: '', nationality: 'Indian', citizenship: 'Indian', spouseName: '', officialMobile: '', phone1: '', phone2: '', uan: '', status: 'Active', tracking: 'Tracking', projects: [] },
    { id: 11, title: '', firstName: 'Test', middleName: '', lastName: 'KJ', employeeId: '', aadhaarCard: '', gender: 'Male', mobile: '', personalEmail: '', officialEmail: '', pan: '', drivingLicense: '', address1: '', address2: '', address3: '', designation: 'Manager', fathersName: '', esiNo: '', ediDispensary: '', dob: '', placeOfBirth: '', age: '', maritalStatus: 'Single', children: '', city: '', state: '', pinCode: '', nationality: 'Indian', citizenship: 'Indian', spouseName: '', officialMobile: '', phone1: '', phone2: '', uan: '', status: 'Active', tracking: 'Tracking', projects: [] },
    { id: 12, title: '', firstName: 'Test', middleName: '', lastName: 'PP', employeeId: '', aadhaarCard: '', gender: 'Male', mobile: '', personalEmail: '', officialEmail: '', pan: '', drivingLicense: '', address1: '', address2: '', address3: '', designation: 'Designer', fathersName: '', esiNo: '', ediDispensary: '', dob: '', placeOfBirth: '', age: '', maritalStatus: 'Single', children: '', city: '', state: '', pinCode: '', nationality: 'Indian', citizenship: 'Indian', spouseName: '', officialMobile: '', phone1: '', phone2: '', uan: '', status: 'Active', tracking: 'Tracking', projects: [] }
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false); // State for details modal
  const [selectedEmployee, setSelectedEmployee] = useState(null); // State for selected employee to view
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

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
    setSelectedEmployee(employee); // Set the selected employee for the details modal
    setShowDetailsModal(true); // Open the details modal
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
        onEditEmployee={handleEditEmployee}
        onAddEmployee={handleAddEmployee}
        onViewDetails={handleViewDetails} // Pass the view details handler
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