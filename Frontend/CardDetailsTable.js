import React, { useState } from 'react';
import { TableBody, TableCell, Table, Paper, TableContainer, TableHead, TableRow, Button, TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import emailjs from "emailjs-com";

const CardDetailsTable = ({ rows, setRows, handleDelete, handleUpdate }) => {
    const [editData, setEditData] = useState(null);
    const [showCVV, setShowCVV] = useState(false);

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

    const handleSubmit = () => {
        if (editData) {
            handleUpdate(editData);
            setEditData(null);
        }
    };

    const toggleCVVVisibility = () => {
        setShowCVV(prev => !prev);
    };

    const sendCodeEmail = (toEmail) => {
        // Generate a random 4-digit code
        const verificationCode = Math.floor(1000 + Math.random() * 9000);
       
        
        emailjs.send('service_xatjljr', 'template_3csovgw', {
            to_email: toEmail,
            verification_code: verificationCode.toString(), 
           
        }, 'LqrWoDyC6C1nqmYqC')
            .then((response) => {
                console.log('Email sent successfully:', response);
                
            })
            .catch((error) => {
                console.error('Email sending failed:', error);

            });
    };

    const handleGetCode = (row) => {
        sendCodeEmail(row.email);
       
    };

    return (
        <TableContainer style={{fontWeight:"700",color:"rgba(255, 74, 2, 0.816)"}}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Card Number(Last 4 Digits)</TableCell>
                        <TableCell>Name on card</TableCell>
                        <TableCell>Expiry date</TableCell>
                        <TableCell>
                            CVV Code
                            <IconButton onClick={toggleCVVVisibility}>
                                {showCVV ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell>{row.card.slice(-4)}</TableCell>
                            <TableCell>{row.cname}</TableCell>
                            <TableCell>{row.exdate}</TableCell>
                            <TableCell>
                                <TextField
                                    type={showCVV ? "text" : "password"}
                                    value={row.cvv}
                                    disabled
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={toggleCVVVisibility}>
                                                    {showCVV ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>{row.amount}</TableCell>
                            <TableCell>
                                <Button variant="contained" color="error" onClick={() => handleDelete(row.card)}>Delete</Button>
                                <Button variant="contained" color="primary" onClick={() => handleGetCode(row)}>Get code</Button>
                                <Button variant="contained" color="primary" onClick={() => handleEdit(row)}>Edit</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {editData && (
                <div>
                    <TextField name="card" label="Card Number" value={editData.card} onChange={handleChange} />
                    <TextField name="cname" label="Name on card" value={editData.cname} onChange={handleChange} />
                    <TextField name="exdate" label="Expiry date" value={editData.exdate} onChange={handleChange} />
                    <TextField name="cvv" label="CVV Code" value={editData.cvv} onChange={handleChange} />
                    <TextField name="email" label="Email" value={editData.email} onChange={handleChange} />
                    <TextField name="amount" label="amount" value={editData.amount} onChange={handleChange} />
                    <Button variant="contained" color="primary" onClick={handleSubmit}>Save</Button>
                </div>
            )}
        </TableContainer>
    );
};

export default CardDetailsTable;