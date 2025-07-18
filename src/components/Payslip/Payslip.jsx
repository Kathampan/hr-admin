import React, { useRef, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Utility function to convert number to words (Indian numbering system)
const numberToWords = (num) => {
    const ones = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const tens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const twenties = ['Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    
    if (num === 0) return 'Zero';
    
    const convertLessThanThousand = (n) => {
        let str = '';
        if (n >= 100) {
            str += ones[Math.floor(n / 100)] + ' Hundred';
            n %= 100;
            if (n > 0) str += ' and ';
        }
        if (n >= 20) {
            str += twenties[Math.floor(n / 10) - 2];
            n %= 10;
            if (n > 0) str += ' ' + ones[n];
        } else if (n >= 10) {
            str += tens[n - 10];
        } else if (n > 0) {
            str += ones[n];
        }
        return str;
    };
    
    let str = '';
    if (num >= 100000) {
        str += convertLessThanThousand(Math.floor(num / 100000)) + ' Lakh ';
        num %= 100000;
    }
    if (num >= 1000) {
        str += convertLessThanThousand(Math.floor(num / 1000)) + ' Thousand ';
        num %= 1000;
    }
    if (num > 0) {
        str += convertLessThanThousand(num);
    }
    
    return str.trim() + ' Rupees Only';
};

const Payslip = () => {
    const payslipRef = useRef(null);
    
    // Sample employee data with earnings and deductions (replace with actual data source)
    const employees = [
        {
            name: 'Jithin K. Jayan',
            id: 'DKT12345',
            designation: 'Software Engineer',
            department: 'Engineering',
            pfNo: 'PF123456',
            pan: 'ABCDE1234F',
            bankAccount: '123456789012',
            dateOfJoining: '01-Jan-2023',
            earnings: {
                basicPay: 24200,
                hra: 14520,
                conveyance: 4840,
                medical: 4840,
                monthlyIncentive: 2500,
                otherAllowances: 1000,
                total: 51900
            },
            deductions: {
                providentFund: 3600,
                professionalTax: 200,
                incomeTax: 2000,
                welfareFund: 500,
                total: 6300
            },
            netPay: 45600
        },
        {
            name: 'Amit Sharma',
            id: 'DKT12346',
            designation: 'Senior Developer',
            department: 'Engineering',
            pfNo: 'PF123457',
            pan: 'BCDEF2345G',
            bankAccount: '987654321098',
            dateOfJoining: '15-Mar-2022',
            earnings: {
                basicPay: 35000,
                hra: 21000,
                conveyance: 6000,
                medical: 5000,
                monthlyIncentive: 3000,
                otherAllowances: 1500,
                total: 71500
            },
            deductions: {
                providentFund: 4200,
                professionalTax: 200,
                incomeTax: 3500,
                welfareFund: 600,
                total: 8500
            },
            netPay: 63000
        },
        {
            name: 'Priya Nair',
            id: 'DKT12347',
            designation: 'Project Manager',
            department: 'Management',
            pfNo: 'PF123458',
            pan: 'CDEFG3456H',
            bankAccount: '456789123456',
            dateOfJoining: '10-Jun-2021',
            earnings: {
                basicPay: 45000,
                hra: 27000,
                conveyance: 8000,
                medical: 6000,
                monthlyIncentive: 5000,
                otherAllowances: 2000,
                total: 93000
            },
            deductions: {
                providentFund: 5400,
                professionalTax: 200,
                incomeTax: 5000,
                welfareFund: 800,
                total: 11400
            },
            netPay: 81600
        },
        {
            name: 'Rahul Verma',
            id: 'DKT12348',
            designation: 'QA Engineer',
            department: 'Quality Assurance',
            pfNo: 'PF123459',
            pan: 'DEFGH4567I',
            bankAccount: '789123456789',
            dateOfJoining: '20-Sep-2020',
            earnings: {
                basicPay: 28000,
                hra: 16800,
                conveyance: 5000,
                medical: 4000,
                monthlyIncentive: 2000,
                otherAllowances: 1200,
                total: 56000
            },
            deductions: {
                providentFund: 3360,
                professionalTax: 200,
                incomeTax: 2500,
                welfareFund: 400,
                total: 6460
            },
            netPay: 49540
        }
    ];
    
    // Month list
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    // Generate last 10 years
    const currentYear = 2025;
    const years = Array.from({ length: 10 }, (_, i) => currentYear - i);
    
    // State for dropdown selections
    const [selectedEmployee, setSelectedEmployee] = useState(employees[0].name);
    const [selectedMonth, setSelectedMonth] = useState('July'); // Current month
    const [selectedYear, setSelectedYear] = useState(currentYear);

    // Find selected employee data
    const employeeData = employees.find(emp => emp.name === selectedEmployee) || employees[0];

    const handleDownloadPDF = async () => {
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
        });
        const content = payslipRef.current;

        // Temporarily remove scroll and height restrictions to capture full content
        const originalStyle = {
            overflow: content.style.overflow,
            height: content.style.height,
        };
        content.style.overflow = 'visible';
        content.style.height = 'auto';

        // Capture the payslip content as an image using html2canvas
        const canvas = await html2canvas(content, {
            scale: 2,
            useCORS: true,
            scrollX: 0,
            scrollY: 0,
            windowWidth: content.scrollWidth,
            windowHeight: content.scrollHeight,
        });

        // Restore original styles
        content.style.overflow = originalStyle.overflow;
        content.style.height = originalStyle.height;

        const imgData = canvas.toDataURL('image/png');

        // Calculate dimensions to fit A4 (210mm x 297mm)
        const imgWidth = 190;
        const pageHeight = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 10;

        // Add image to PDF
        doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // Handle multi-page if content exceeds one page
        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            doc.addPage();
            doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        // Save the PDF with dynamic filename
        doc.save(`Payslip_${selectedEmployee}_${selectedMonth}_${selectedYear}.pdf`);
    };

    const styles = {
        payslipContainer: {
            maxWidth: '800px',
            margin: '30px auto',
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            height: 'calc(100vh - 145px)',
            overflow: 'scroll',
        },
        header: {
            textAlign: 'center',
            marginBottom: '20px',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
        },
        th: {
            verticalAlign: 'middle',
            border: '1px solid #dee2e6',
            padding: '8px',
        },
        td: {
            verticalAlign: 'middle',
            border: '1px solid #dee2e6',
            padding: '8px',
        },
        footer: {
            textAlign: 'center',
            marginTop: '20px',
            fontSize: '0.9em',
            color: '#6c757d',
        },
        amountInWords: {
            fontStyle: 'italic',
        },
        fixedComponent: {
            backgroundColor: '#ffffff',
        },
        mb4: {
            marginBottom: '1.5rem',
        },
    };

    return (
        <div>
            <div className="col-12 mb-3 mt-2">
                <div className="d-flex align-items-center justify-content-between">
                    <h5 className="mb-0">
                        <a className="text-decoration-none" href="/employee-details">
                            <img src="/left-arrow-black.svg" alt="Back" />
                        </a> Payslip
                    </h5>
                    <div className="d-flex align-items-center">
                        <div className="dropdown me-2">
                            <button
                                className="btn btn-outline-secondary dropdown-toggle"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {selectedEmployee}
                            </button>
                            <ul className="dropdown-menu">
                                {employees.map((employee) => (
                                    <li key={employee.id}>
                                        <button
                                            className="dropdown-item"
                                            type="button"
                                            onClick={() => setSelectedEmployee(employee.name)}
                                        >
                                            {employee.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="dropdown me-2">
                            <button
                                className="btn btn-outline-secondary dropdown-toggle"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {selectedMonth}
                            </button>
                            <ul className="dropdown-menu">
                                {months.map((month) => (
                                    <li key={month}>
                                        <button
                                            className="dropdown-item"
                                            type="button"
                                            onClick={() => setSelectedMonth(month)}
                                        >
                                            {month}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="dropdown me-2">
                            <button
                                className="btn btn-outline-secondary dropdown-toggle"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {selectedYear}
                            </button>
                            <ul className="dropdown-menu">
                                {years.map((year) => (
                                    <li key={year}>
                                        <button
                                            className="dropdown-item"
                                            type="button"
                                            onClick={() => setSelectedYear(year)}
                                        >
                                            {year}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button className="btn btn-black" onClick={handleDownloadPDF}>
                            Download Payslip as PDF
                        </button>
                    </div>
                </div>
            </div>

            <div style={styles.payslipContainer} ref={payslipRef}>
                {/* Header */}
                <div style={styles.header}>
                    <h2>DK TEKDESIGN ENGINEERING LLP</h2>
                    <p>AC.K. 1965, TV.70 M. 2nd Floor, K.M. Arcade, P.T.H.H.</p>
                    <h4>Payslip for the Month of {selectedMonth} {selectedYear}</h4>
                </div>

                {/* Employee Details */}
                <div style={styles.mb4}>
                    <h5>Employee Details</h5>
                    <table className="table table-bordered" style={styles.table}>
                        <tbody>
                            <tr>
                                <th style={styles.th}>Employee Name</th>
                                <td style={styles.td}>{employeeData.name}</td>
                                <th style={styles.th}>Employee ID</th>
                                <td style={styles.td}>{employeeData.id}</td>
                            </tr>
                            <tr>
                                <th style={styles.th}>Designation</th>
                                <td style={styles.td}>{employeeData.designation}</td>
                                <th style={styles.th}>Department</th>
                                <td style={styles.td}>{employeeData.department}</td>
                            </tr>
                            <tr>
                                <th style={styles.th}>PF No.</th>
                                <td style={styles.td}>{employeeData.pfNo}</td>
                                <th style={styles.th}>PAN</th>
                                <td style={styles.td}>{employeeData.pan}</td>
                            </tr>
                            <tr>
                                <th style={styles.th}>Bank Account Number</th>
                                <td style={styles.td}>{employeeData.bankAccount}</td>
                                <th style={styles.th}>Date of Joining</th>
                                <td style={styles.td}>{employeeData.dateOfJoining}</td>
                            </tr>
                            <tr>
                                <th style={styles.th}>Attendance Days</th>
                                <td style={styles.td}>30</td>
                                <th style={styles.th}></th>
                                <td style={styles.td}></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Earnings and Deductions */}
                <div style={styles.mb4}>
                    <h5>Earnings and Deductions</h5>
                    <table className="table table-bordered" style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>Earnings</th>
                                <th style={styles.th}>Amount (INR)</th>
                                <th style={styles.th}>Deductions</th>
                                <th style={styles.th}>Amount (INR)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ ...styles.td, ...styles.fixedComponent }}>Basic Pay</td>
                                <td style={{ ...styles.td, ...styles.fixedComponent }}>₹{employeeData.earnings.basicPay.toLocaleString('en-IN')}</td>
                                <td style={styles.td}>Provident Fund</td>
                                <td style={styles.td}>₹{employeeData.deductions.providentFund.toLocaleString('en-IN')}</td>
                            </tr>
                            <tr>
                                <td style={{ ...styles.td, ...styles.fixedComponent }}>House Rent Allowance (HRA)</td>
                                <td style={{ ...styles.td, ...styles.fixedComponent }}>₹{employeeData.earnings.hra.toLocaleString('en-IN')}</td>
                                <td style={styles.td}>Professional Tax</td>
                                <td style={styles.td}>₹{employeeData.deductions.professionalTax.toLocaleString('en-IN')}</td>
                            </tr>
                            <tr>
                                <td style={{ ...styles.td, ...styles.fixedComponent }}>Conveyance</td>
                                <td style={{ ...styles.td, ...styles.fixedComponent }}>₹{employeeData.earnings.conveyance.toLocaleString('en-IN')}</td>
                                <td style={styles.td}>Income Tax</td>
                                <td style={styles.td}>₹{employeeData.deductions.incomeTax.toLocaleString('en-IN')}</td>
                            </tr>
                            <tr>
                                <td style={{ ...styles.td, ...styles.fixedComponent }}>Medical</td>
                                <td style={{ ...styles.td, ...styles.fixedComponent }}>₹{employeeData.earnings.medical.toLocaleString('en-IN')}</td>
                                <td style={styles.td}>Welfare Fund</td>
                                <td style={styles.td}>₹{employeeData.deductions.welfareFund.toLocaleString('en-IN')}</td>
                            </tr>
                            <tr>
                                <td style={styles.td}>Monthly Incentive</td>
                                <td style={styles.td}>₹{employeeData.earnings.monthlyIncentive.toLocaleString('en-IN')}</td>
                                <td style={styles.td}></td>
                                <td style={styles.td}></td>
                            </tr>
                            <tr>
                                <td style={styles.td}>Other Allowances</td>
                                <td style={styles.td}>₹{employeeData.earnings.otherAllowances.toLocaleString('en-IN')}</td>
                                <td style={styles.td}></td>
                                <td style={styles.td}></td>
                            </tr>
                            <tr>
                                <th style={styles.th}>Total Earnings</th>
                                <th style={styles.th}>₹{employeeData.earnings.total.toLocaleString('en-IN')}</th>
                                <th style={styles.th}>Total Deductions</th>
                                <th style={styles.th}>₹{employeeData.deductions.total.toLocaleString('en-IN')}</th>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Net Pay */}
                <div style={styles.mb4}>
                    <h5>Net Pay</h5>
                    <table className="table table-bordered" style={styles.table}>
                        <tbody>
                            <tr>
                                <th style={styles.th}>Net Pay for the Month</th>
                                <td style={styles.td}><strong>₹{employeeData.netPay.toLocaleString('en-IN')}</strong></td>
                            </tr>
                            <tr>
                                <th style={styles.th}>Amount in Words</th>
                                <td style={{ ...styles.td, ...styles.amountInWords }}>{numberToWords(employeeData.netPay)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div style={styles.footer}>
                    <p>This is a computer-generated payslip and does not require a signature.</p>
                    <p>Contact HR for any discrepancies.</p>
                </div>
            </div>
        </div>
    );
};

export default Payslip;