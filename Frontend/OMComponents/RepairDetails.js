import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles/Repair.css"; 
import { useNavigate } from "react-router-dom";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function RepairDetails(){
    const [dataList, setDataList] = useState([]);
    const navigate=useNavigate();
    
    const getFetchData = async () =>{
        try {
            const response = await axios.get("http://localhost:8070/repair");
            console.log(response.data);
            if (response.data.success) {
                setDataList(response.data.repair);
                alert("Repair fetched successfully");
            } else {
                alert("Failed to fetch repair");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            alert("Failed to fetch repair");
        }
    };
    useEffect(() => {
        getFetchData();

    }, []);

    const handleDelete = (id) => {

        axios.delete(`http://localhost:8070/repair/delete/${id}`).then((res) => {
            alert("Delete Successfully");
            setDataList(dataList.filter(repair => repair._id !== id));
        }).catch((error) => {
            console.error("Error deleting repair:", error);
            alert("Failed to delete repair");
        });
    };

    const generatePDF = () => {
        // Create a new instance of jsPDF
        const doc = new jsPDF();

        // Get the current date
        const currentDate = new Date();
        
        // Define the columns for the table
        const columns = ["Name", "Email", "Phone", "repair Type", "description"];
        
        // Define the rows for the table body
        const rows = dataList.map(repair => [repair.name, repair.email, repair.phone, repair.repairType, repair.description]);
         
       
        // Set table header
         doc.setFont("helvetica", "bold");  // Set font style to bold
         doc.setFontSize(16);   // Set font size to 16
         doc.setTextColor(0, 0, 0);   // Header text color
         doc.text("Protons Electronics & Electrical", 18, 15);   // Print "Protons Electronics & Electrical"

        // Add horizontal line 
         doc.line(18, 18, 200, 18);

        // Add the current date to the document
         doc.setFontSize(10); 
         const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
         doc.text(`Date : ${formattedDate}`, 168, 30);  // Adjust the position as needed
   
         doc.setFont("helvetica", "bold"); // Set font style to bold
         doc.setTextColor(0, 0, 0); // Header text color
         doc.setFontSize(12); // Reset font size
         doc.text("Repair Service Report", 18, 35); // Print "Repair Report" after the company name
        
        // Add table with custom styling
         doc.autoTable({
            head: [columns], // Only one row for the table head
            body: rows,
            startY: 45, // margine top
            theme: 'grid', // Use 'grid' theme for better visual separation
            styles: {
                fontSize: 10,
                overflow: 'linebreak', // Handle text wrapping
                cellPadding: 2,
                textColor: [0, 0, 0], // Text color
                fontStyle: 'normal', // Normal font style
                halign: 'center', // Center align content horizontally
                valign: 'middle', // Center align content vertically
            },
            columnStyles: {
                // Adjust column width if needed
                0: { cellWidth: 35 }, 
                1: { cellWidth: 40 }, 
                2: { cellWidth: 25 }, 
                3: { cellWidth: 28 }, 
                4: { cellWidth: 60 }, 
               
            },
            margin: { top: 10 }, // Adjust top margin if needed
        });

     
        // Save the PDF
         doc.save("Repair_details.pdf");
    };


return(
    <div >
    <br /><br />

    <div className="containerOM" style={{width:"100%"}}>
          <h1 className="OM" style={{fontSize:"28px",}}><i>Repair Request</i></h1>
      </div>
    <br />  
    <br />
    <br />

    <button className="pdf-btn" style={{marginLeft:"84%", width:"10%"}} onClick={generatePDF}> <i class="fa fa-download" aria-hidden="true"></i> Export to PDF</button>
            <br /> <br />

       <table class="table">
  <thead>
    <tr style={{textAlign:"center"}}>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Repair Type</th>
            <th scope="col">Description</th>
            <th scope="col">Action</th>
            </tr>
</thead>
   <tbody>
        {dataList.map((repair) =>(
                    <tr key={repair.id}>
                    <td>{repair.name}</td>
                    <td>{repair.email}</td>
                    <td>{repair.phone}</td>
                    <td>{repair.repairType}</td>
                    <td>{repair.description}</td>    
          <td>
            <button style={{marginLeft:"25%"}} type="button" onClick={() => handleDelete(repair._id)} class="btnActionOM">Delete</button>
          </td>
                </tr>
        ))}
   </tbody>
       </table>

       <br />


<br /><br />
  </div>

);

}
export default RepairDetails;