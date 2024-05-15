import React, { useState } from 'react';
import { TableBody, TableCell, Table, Paper, TableContainer, TableHead, TableRow, Button, TextField } from "@mui/material";
import jsPDF from 'jspdf';
import Barcode from 'react-barcode';
import ReactDOM from 'react-dom';
import emailjs from 'emailjs-com';

const BankDetailsTable = ({ rows, handleDelete, handleUpdate, showActions = true, showContinueButton = false }) => {
    const [editData, setEditData] = useState(null);

    const handleEdit = (rowData) => {
        setEditData(rowData);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleReceiptActions = async (receiptData) => {
        const doc = new jsPDF();

        // Generate PDF content
        doc.setFontSize(20);
        doc.text("Protons E&E", 20, 20);
        doc.setFontSize(12);
        doc.text("Welcome Protons E&E", 20, 30);
        doc.text("Contact: +110007654437 | Email: support@protonsee.com", 20, 40);
        doc.line(20, 45, 190, 45);
        doc.text(`Receipt for ${receiptData.email}`, 20, 60);
        doc.text(`Account Number: ${receiptData.accountnumber}`, 20, 75);
        doc.text(`Amount: ${receiptData.amount}`, 20, 90);
        doc.text(`Slip: ${receiptData.slip}`, 20, 105);
        doc.text("Payment Stage: Pending", 20, 120);
        const paymentId = Math.random().toString(36).substring(7);
        doc.text(`Payment ID: ${paymentId}`, 20, 135);
        const barcodeImage = generateBarcodeImage(paymentId);
        doc.addImage(barcodeImage, 'PNG', 20, 150, 100, 40);
        doc.line(20, 250, 190, 250);
        doc.text("Protons Electronic & Electricals", 20, 260);

        // Convert PDF to a blob and get base64
        const pdfBlob = doc.output('blob');
        const reader = new FileReader();
        reader.readAsDataURL(pdfBlob);
        reader.onloadend = async function() {
            const base64data = reader.result;

            // Download PDF locally
            const downloadLink = document.createElement("a");
            downloadLink.href = base64data;
            downloadLink.download = "Receipt.pdf";
            downloadLink.click();

            // Send email with PDF
            try {
                await emailjs.send('service_cqkt28h', 'template_sk36cwk', {
                    to_email: receiptData.email,
                    subject: 'Your Protons E&E Receipt',
                    message_html: `<p>Attached is your receipt for the payment of ${receiptData.amount}.</p>`,
                    attachment: base64data,
                }, 'user_token');
                console.log('Email sent successfully');
            } catch (error) {
                console.error('Error sending email:', error);
            }
        };
    };

    const generateBarcodeImage = (text) => {
        const canvas = document.createElement('canvas');
        ReactDOM.render(<Barcode value={text} />, canvas);
        return canvas.toDataURL();
        
    };

    const handleSubmit = () => {
        if (editData) {
            handleUpdate(editData);
            setEditData(null);
        }
    };

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Email</TableCell>
                            <TableCell>Account Number</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Slip</TableCell>
                            {showActions && <TableCell>Actions</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.accountnumber}</TableCell>
                                <TableCell>{row.amount}</TableCell>
                                <TableCell>{row.slip}</TableCell>
                                {showActions && (
                                    <TableCell>
                                        <Button variant="contained" color="primary" onClick={() => handleEdit(row)}>Edit</Button>
                                        <Button variant="contained" color="error" onClick={() => handleDelete(row.email)}>Delete</Button>
                                        <Button variant="contained" color="primary" onClick={() => handleReceiptActions(row)}>Get Receipt</Button>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {editData && (
                <div>
                    <TextField name="email" label="Email" value={editData.email} onChange={handleChange} />
                    <TextField name="accountnumber" label="Account Number" value={editData.accountnumber} onChange={handleChange} />
                    <TextField name="amount" label="Amount" value={editData.amount} onChange={handleChange} />
                    <TextField name="slip" label="Slip" value={editData.slip} onChange={handleChange} />
                    <Button variant="contained" color="primary" onClick={handleSubmit}>Save</Button>
                </div>
            )}
            {showContinueButton && (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <Button variant="contained" color="primary" onClick={() => console.log("Continue button clicked")}>Continue</Button>
                </div>
            )}
        </div>
    );
};

export default BankDetailsTable;
