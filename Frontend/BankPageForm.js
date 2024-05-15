import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import BankDetailsTable from "./BankDetailsTable";
import { Box, TextField, Button } from "@mui/material";
import Axios from "axios";

const BankPageForm = () => {
    const [rows, setRows] = useState([]);
    const [emailTransactions, setEmailTransactions] = useState([]);
    const [email, setEmail] = useState('');

    useEffect(() => {
        getbpayment();
    }, []);

    const getbpayment = async (searchEmail = '') => {
        try {
            const url = searchEmail ? `http://localhost:8070/api/bpayment?email=${searchEmail}` : 'http://localhost:8070/api/bpayment';
            const response = await Axios.get(url);
            if (searchEmail) {
                setEmailTransactions(response.data);
            } else {
                setRows(response.data);
            }
        } catch (error) {
            console.error('Error fetching bank payments:', error);
        }
    };

    const handleDelete = async (email) => {
        try {
            await Axios.post('http://localhost:8070/api/deletebpayment', { email });
            setRows(prevRows => prevRows.filter(row => row.email !== email));
            setEmailTransactions(prev => prev.filter(row => row.email !== email));
        } catch (error) {
            console.error('Error deleting payment:', error);
        }
    };

    const handleUpdate = async (updatedRow) => {
        try {
            await Axios.post('http://localhost:8070/api/updatebpayment', updatedRow);
            setRows(prevRows => {
                const rowIndex = prevRows.findIndex(row => row.email === updatedRow.email);
                if (rowIndex !== -1) {
                    const updatedRows = [...prevRows];
                    updatedRows[rowIndex] = updatedRow;
                    return updatedRows;
                }
                return prevRows;
            });
            setEmailTransactions(prev => {
                const index = prev.findIndex(row => row.email === updatedRow.email);
                if (index !== -1) {
                    const updated = [...prev];
                    updated[index] = updatedRow;
                    return updated;
                }
                return prev;
            });
        } catch (error) {
            console.error('Error updating payment:', error);
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleFetchTransactions = () => {
        getbpayment(email);
    };

    return (
        <div>
            <Header />
            <Box sx={{ pt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <TextField
                    label="Search by Email"
                    variant="outlined"
                    value={email}
                    onChange={handleEmailChange}
                    style={{ marginBottom: '20px' }}
                />
                <Button variant="contained" color="primary" onClick={handleFetchTransactions}>Past Transaction</Button>
                
                {emailTransactions.length > 0 && (
                    <>
                        <h2>Transactions for {email}</h2>
                        <BankDetailsTable rows={emailTransactions} showActions={false} />
                    </>
                )}
    
                <h2>All Transactions</h2>
                <BankDetailsTable rows={rows} showActions={true} handleDelete={handleDelete} handleUpdate={handleUpdate} showContinueButton={true} />
            </Box>
            <Footer />
        </div>
    );
    
};

export default BankPageForm;
