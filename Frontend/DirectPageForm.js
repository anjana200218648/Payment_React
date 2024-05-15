import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import DirectDetailsTable from "./DirectDetailsTable";
import { Box } from "@mui/material";
import Axios from "axios";

const DirectPageForm = () => {
    const [rows, setRows] = useState([]);
    const [isNewPayment, setIsNewPayment] = useState(true); 
    
    useEffect(() => {
        getdpayment();
    }, []);

    const getdpayment = async () => {
        try {
            const response = await Axios.get('http://localhost:8070/api/dpayment');
            setRows(response.data);

            // Check if there is an existing payment for the provided email
            const existingPayment = response.data.find(row => row.email === localStorage.getItem('directPaymentEmail'));
            if (existingPayment) {
                setIsNewPayment(false); // Set isNewPayment to false if payment exists
            } else {
                setIsNewPayment(true); // Set isNewPayment to true if payment doesn't exist
            }
        } catch (error) {
            console.error('Error fetching direct payments:', error);
        }
    };

    const handleDelete = async (Name) => {
        try {
            const response = await Axios.post('http://localhost:8070/api/deletedpayment', { name: Name });
            setRows(prevRows => prevRows.filter(row => row.name !== Name));
        } catch (error) {
            console.error('Error deleting card:', error);
        }
    };

    const handleUpdate = async (updatedRow) => {
        try {
            // Send the updated data to the server
            const response = await Axios.post('http://localhost:8070/api/updatedpayment', updatedRow);
            console.log('Response from server:', response.data);
    
            
            setRows(prevRows => {
                
                const rowIndex = prevRows.findIndex(row => row.name === updatedRow.name);
                if (rowIndex !== -1) {
                    // Create a new array with the updated row
                    const updatedRows = [...prevRows];
                    updatedRows[rowIndex] = updatedRow;
                    return updatedRows;
                }
                return prevRows;
            });
        } catch (error) {
            console.error('Error updating card:', error);
        }
    };

    return (
        <div>
            <Header />
            
            <Box sx={{ pt: 3 }}>
                <DirectDetailsTable rows={rows} setRows={setRows} handleDelete={handleDelete} handleUpdate={handleUpdate}  />
                
            </Box>
            <Footer />
        </div>
    );
};

export default DirectPageForm;
