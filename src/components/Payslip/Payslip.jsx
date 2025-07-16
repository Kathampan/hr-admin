import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Payslip = () => {
    const payslipRef = useRef(null);

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
            scale: 2, // Increase resolution for better quality
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
        const imgWidth = 190; // Width in mm (leaving margins)
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

        // Save the PDF
        doc.save('Payslip_July_2025.pdf');
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
            backgroundColor: '#ffffff', // White background for fixed components
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
                    <button className="btn btn-black" onClick={handleDownloadPDF}>
                        Download Payslip as PDF
                    </button>
                </div>
            </div>

            <div style={styles.payslipContainer} ref={payslipRef}>
                {/* Header */}
                <div style={styles.header}>
                    <h2>DK TEKDESIGN ENGINEERING LLP</h2>
                    <p>AC.K. 1965, TV.70 M. 2nd Floor, K.M. Arcade, P.T.H.H.</p>
                    <h4>Payslip for the Month of July 2025</h4>
                </div>

                {/* Employee Details */}
                <div style={styles.mb4}>
                    <h5>Employee Details</h5>
                    <table className="table table-bordered" style={styles.table}>
                        <tbody>
                            <tr>
                                <th style={styles.th}>Employee Name</th>
                                <td style={styles.td}>Jithin K. Jayan</td>
                                <th style={styles.th}>Employee ID</th>
                                <td style={styles.td}>DKT12345</td>
                            </tr>
                            <tr>
                                <th style={styles.th}>Designation</th>
                                <td style={styles.td}>Software Engineer</td>
                                <th style={styles.th}>Department</th>
                                <td style={styles.td}>Engineering</td>
                            </tr>
                            <tr>
                                <th style={styles.th}>PF No.</th>
                                <td style={styles.td}>PF123456</td>
                                <th style={styles.th}>PAN</th>
                                <td style={styles.td}>ABCDE1234F</td>
                            </tr>
                            <tr>
                                <th style={styles.th}>Bank Account Number</th>
                                <td style={styles.td}>123456789012</td>
                                <th style={styles.th}>Date of Joining</th>
                                <td style={styles.td}>01-Jan-2023</td>
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
                                <td style={{ ...styles.td, ...styles.fixedComponent }}>₹24,200</td>
                                <td style={styles.td}>Provident Fund</td>
                                <td style={styles.td}>₹3,600</td>
                            </tr>
                            <tr>
                                <td style={{ ...styles.td, ...styles.fixedComponent }}>House Rent Allowance (HRA)</td>
                                <td style={{ ...styles.td, ...styles.fixedComponent }}>₹14,520</td>
                                <td style={styles.td}>Professional Tax</td>
                                <td style={styles.td}>₹200</td>
                            </tr>
                            <tr>
                                <td style={{ ...styles.td, ...styles.fixedComponent }}>Conveyance</td>
                                <td style={{ ...styles.td, ...styles.fixedComponent }}>₹4,840</td>
                                <td style={styles.td}>Income Tax</td>
                                <td style={styles.td}>₹2,000</td>
                            </tr>
                            <tr>
                                <td style={{ ...styles.td, ...styles.fixedComponent }}>Medical</td>
                                <td style={{ ...styles.td, ...styles.fixedComponent }}>₹4,840</td>
                                <td style={styles.td}>Welfare Fund</td>
                                <td style={styles.td}>₹500</td>
                            </tr>
                            <tr>
                                <td style={styles.td}>Monthly Incentive</td>
                                <td style={styles.td}>₹2,500</td>
                                <td style={styles.td}></td>
                                <td style={styles.td}></td>
                            </tr>
                            <tr>
                                <td style={styles.td}>Other Allowances</td>
                                <td style={styles.td}>₹1,000</td>
                                <td style={styles.td}></td>
                                <td style={styles.td}></td>
                            </tr>
                            <tr>
                                <th style={styles.th}>Total Earnings</th>
                                <th style={styles.th}>₹51,900</th>
                                <th style={styles.th}>Total Deductions</th>
                                <th style={styles.th}>₹6,300</th>
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
                                <td style={styles.td}><strong>₹47,700</strong></td>
                            </tr>
                            <tr>
                                <th style={styles.th}>Amount in Words</th>
                                <td style={{ ...styles.td, ...styles.amountInWords }}>Forty-Seven Thousand Seven Hundred Rupees Only</td>
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