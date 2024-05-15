import React, { useState } from 'react';
import { TableBody, TableCell, Table, Paper, TableContainer, TableHead, TableRow, Button, TextField } from "@mui/material";
import jsPDF from 'jspdf';
import Barcode from 'react-barcode';
import ReactDOM from 'react-dom';

import emailjs from 'emailjs-com';

const DirectDetailsTable = ({ rows, setRows, handleDelete, handleUpdate }) => {
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

    const downloadPDF = async (receiptData, email) => {
        // Create a new PDF document
        const doc = new jsPDF();

        // Add header
        doc.setFontSize(20);
        doc.text("Protons E&E", 20, 20); 
        doc.setFontSize(12);
        doc.text("Welcome Protons E&E", 20, 30); 
        doc.text("Contact: +110007654437 | Email: qqqqqq@hff.com", 20, 40); 
        doc.line(20, 45, 190, 45); 

        // Add receipt details
        doc.text(`Receipt for ${receiptData.name}`, 20, 60);
        doc.text(`Repair Agent Name: ${receiptData.rgname}`, 20, 75);
        doc.text(`Email Address: ${receiptData.cemail}`, 20, 90);
        doc.text(`WhatsApp Number: ${receiptData.contactnumber}`, 20, 105);
        doc.text(`Amount: ${receiptData.amount}`, 20, 120);

        // Generate a random payment ID
        const paymentId = generatePaymentId();
        doc.text(`Payment ID: ${paymentId}`, 20, 135);

        // Generate the barcode image with the payment ID
        const barcodeImage = generateBarcodeImage(paymentId);

        // Add the barcode image to the PDF
        doc.addImage(barcodeImage, 'PNG', 20, 150, 100, 40);

        // Add footer
        doc.line(20, 250, 190, 250); // Horizontal line
        doc.text("Protons Electronic & Electricals", 20, 260); // Footer text

        // Save the PDF
        doc.save('receipt.pdf');

        // Send PDF via email
        sendEmail(email, doc.output('blob'), receiptData);
    };

    const generatePaymentId = () => {
        return Math.random().toString(36).substring(7); 
    };

    const generateBarcodeImage = (text) => {
        if (!text) return null;

        const canvas = document.createElement('canvas');
        ReactDOM.render(<Barcode value={text} />, canvas);
        const dataURL = canvas.toDataURL();

        return dataURL;
    };

    const sendEmail = async (email, attachment, receiptData) => {
        try {
            // Send email using EmailJS
            await emailjs.send('service_cqkt28h', 'template_s859nik', {
                to_email: email,
                subject: 'Receipt for Your Purchase',
                attachment: attachment,
                receipt_data: receiptData, 
            }, '3KwOGh23V1lzMC_jY');
            console.log('Email sent successfully');
        } catch (error) {
            console.error('Error sending email:', error);
        }
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
                            <TableCell>Name</TableCell>
                            <TableCell>Repair Agent Name</TableCell>
                            <TableCell>Email address</TableCell>
                            <TableCell>WhatsApp Number</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.rgname}</TableCell>
                                <TableCell>{row.cemail}</TableCell>
                                <TableCell>{row.contactnumber}</TableCell>
                                <TableCell>{row.amount}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" onClick={() => handleEdit(row)} >Edit</Button>
                                    <Button variant="contained" color="error" onClick={() => handleDelete(row.name)} >Delete</Button>
                                    <Button variant="contained" color="primary" onClick={() => downloadPDF(row, row.cemail)} >Get Receipt</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
           
            {editData && (
                <div>
                    <TextField name="name" label="Name" value={editData.name} onChange={handleChange} />
                    <TextField name="rgname" label="Repair Agent Name" value={editData.rgname} onChange={handleChange} />
                    <TextField name="cemail" label="Email Address" value={editData.cemail} onChange={handleChange} />
                    <TextField name="contactnumber" label="WhatsApp Number" value={editData.contactnumber} onChange={handleChange} />
                    <TextField name="amount" label="Amount" value={editData.amount} onChange={handleChange} />
                    <Button variant="contained" color="primary" onClick={handleSubmit}>Save</Button>
                </div>
            )}
            <div style={{ textAlign: 'center', marginTop: '20px' }}> {/* Adjust marginTop as needed */}
            <Button variant="contained" color="primary" onClick={() => console.log("Continue button clicked")}>Continue</Button>
        </div>
            
        </div>
    );
};

export default DirectDetailsTable;
