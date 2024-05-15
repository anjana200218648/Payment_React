import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import NumberPage from "./NumberPage";
import CardDetailsTable from "./CardDetailsTable";
import { Box } from "@mui/material";
import Axios from "axios";

const NumberPageForm = () => {
    const [rows, setRows] = useState([]);
    
    useEffect(() => {
        getCards();
    }, []);

    const getCards = async () => {
        try {
            const response = await Axios.get('http://localhost:8070/api/cards');
            setRows(response.data);
        } catch (error) {
            console.error('Error fetching cards:', error);
        }
    };

    const handleDelete = async (cardNumber) => {
        try {
             
            const response = await Axios.post('http://localhost:8070/api/deletecards', { card: cardNumber });
            setRows(prevRows => prevRows.filter(row => row.card !== cardNumber));
        } catch (error) {
            console.error('Error deleting card:', error);
        }
    };

    const handleUpdate = async (updatedRow) => {
        try {
            // Send the updated data to the server
            const response = await Axios.post('http://localhost:8070/api/updatecards', updatedRow);
            console.log('Response from server:', response.data);
    
            // If the update is successful, update the local state directly
            setRows(prevRows => {
                // Find the index of the updated row in the current state
                const rowIndex = prevRows.findIndex(row => row.card === updatedRow.card);
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
            <NumberPage />
            <Box sx={{ pt: 3 }}>
                <CardDetailsTable rows={rows} setRows={setRows} handleDelete={handleDelete} handleUpdate={handleUpdate} />
            </Box>
            <Footer />
        </div>
    );
};

export default NumberPageForm;
