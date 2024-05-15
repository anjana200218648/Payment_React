import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "../../../Pages/Samidi/OrderManager.css";

function OM_Dashboard_Header() {
    const navigate = useNavigate();
    return(
        <div>
          <div className="header">
            <br /><br />
            <h2 className="top">Welcome Payment Manager Dashboard !</h2>
            <br /><br />
             <nav>
                <div className="nav nav-tabs" style={{width:"100%"}} id="nav-tab" role="tablist">
                    <b> <h4 style={{color:"#000000e2"}}>&emsp;<u>Protons <span style={{color:"hwb(0 100% 0%)"}}>E&E</span></u></h4></b>
                    &emsp;&emsp; <button className="nav-link" onClick={()=> navigate('/omdashboard')} id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true"><i class="fa fa-home" aria-hidden="true"></i>&emsp;Dashboard</button>
                    <button className="nav-link"  onClick={()=> navigate('/viewTable')} id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false"><i class="fa fa-cog" aria-hidden="true"></i>&emsp;Repair</button>
                    <button className="nav-link" onClick={()=> navigate('/orderpagea')} id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false"><i class="fa fa-shopping-cart" aria-hidden="true"></i>&emsp;Orders</button>
                    <button className="nav-link" onClick={()=> navigate('/PaymentManagerDashboard')} id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false"><i class="fa fa-book" aria-hidden="true"></i>&emsp;payment</button>
                    &emsp;<button className="nav-link" onClick={()=> navigate('')} id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false"><i class="fa fa-sign-out" aria-hidden="true"></i> Logout</button>
                </div>
            </nav>
         
          </div>
          
        </div>
        
      )
}

function PaymentManagerDashboard() {
    const [totals, setTotals] = useState({ cardTotal: 40000, directTotal: 35000, bankTotal: 12000 });
    const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
    const [finalTotal, setFinalTotal] = useState(0);

    useEffect(() => {
        if (selectedMonth === "2024-04") {
            fetchTotals();
        } else {
            setTotals({ cardTotal: 0, directTotal: 0, bankTotal: 0 }); // Correctly reset totals to zero
        }
    }, [selectedMonth]);

    useEffect(() => {
        // This will ensure finalTotal is calculated correctly after totals are updated
        setFinalTotal(totals.cardTotal + totals.directTotal + totals.bankTotal);
    }, [totals]);

    const fetchTotals = async () => {
        try {
            const response = await fetch(`/api/payments/total?month=${selectedMonth}`);
            const data = await response.json();
            setTotals({
                cardTotal: data.cardTotal || 40000,
                directTotal: data.directTotal || 35000,
                bankTotal: data.bankTotal || 12000
            });
        } catch (error) {
            console.error('Error fetching totals:', error);
            setTotals({ cardTotal: 40000, directTotal: 35000, bankTotal: 12000 }); // Reset totals on error
        }
    };

    const handleDownloadReport = () => {
        const csvContent = `Payment Type,Total Amount\nCard Payments,${totals.cardTotal}\nDirect Payments,${totals.directTotal}\nBank Transfers,${totals.bankTotal}\nFinal Total,${finalTotal}`;
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Payment_Report_${selectedMonth}.csv`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
    };

    return (
        <div className="body1">
            <OM_Dashboard_Header />
            <div style={{ margin: "20px" }}>
                <label htmlFor="monthSelect">Select Month: </label>
                <input
                    id="monthSelect"
                    type="month"
                    value={selectedMonth}
                    onChange={e => setSelectedMonth(e.target.value)}
                />
                <button onClick={handleDownloadReport} style={{ marginLeft: "10px",background:"rgba(255, 74, 2, 0.816)",width:"15%",height:"22%" }}>Download Report</button>
            </div>
            <h2>Total Amounts for {selectedMonth}</h2>
            {selectedMonth === "2024-04" ? (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <table style={{ width: '60%', borderCollapse: 'collapse', marginTop: '20px' }}>
                        <thead>
                            <tr>
                                <th style={{ border: '1px solid #dddddd', padding: '8px', backgroundColor: '#f2f2f2', textAlign: 'left' }}>Payment Type</th>
                                <th style={{ border: '1px solid #dddddd', padding: '8px', backgroundColor: '#f2f2f2', textAlign: 'left' }}>Total Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ border: '1px solid #dddddd', padding: '8px', textAlign: 'left' }}>Card Payments</td>
                                <td style={{ border: '1px solid #dddddd', padding: '8px', textAlign: 'left' }}>{totals.cardTotal}</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid #dddddd', padding: '8px', backgroundColor: '#f2f2f2', textAlign: 'left' }}>Direct Payments</td>
                                <td style={{ border: '1px solid #dddddd', padding: '8px', backgroundColor: '#f2f2f2', textAlign: 'left' }}>{totals.directTotal}</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid #dddddd', padding: '8px', textAlign: 'left' }}>Bank Transfers</td>
                                <td style={{ border: '1px solid #dddddd', padding: '8px', textAlign: 'left' }}>{totals.bankTotal}</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid #dddddd', padding: '8px', backgroundColor: '#f2f2f2', textAlign: 'left' }}>Final Total</td>
                                <td style={{ border: '1px solid #dddddd', padding: '8px', backgroundColor: '#f2f2f2', textAlign: 'left' }}>{finalTotal}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No data available for {selectedMonth}.</p>
            )}
        </div>
    );
}

export default PaymentManagerDashboard;
