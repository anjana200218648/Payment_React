import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
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
                    <button className="nav-link" onClick={()=> navigate('')} id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false"><i class="fa fa-shopping-cart" aria-hidden="true"></i>&emsp;Orders</button>
                    <button className="nav-link" onClick={()=> navigate('/PaymentManagerDashboard')} id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false"><i class="fa fa-book" aria-hidden="true"></i>&emsp;payment</button>
                    &emsp;<button className="nav-link" onClick={()=> navigate('')} id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false"><i class="fa fa-sign-out" aria-hidden="true"></i> Logout</button>
                </div>
            </nav>
         
          </div>
          
        </div>
        
      )
}
function Orderpage_admin() {
const [cardPayments, setCardPayments] = useState([]);
    const [bankPayments, setBankPayments] = useState([]);
    const [directPayments, setDirectPayments] = useState([]);

    useEffect(() => {
        // Fetch Card Payments
        axios.get('http://localhost:8070/api/cards')
            .then(response => {
                setCardPayments(response.data);
            })
            .catch(error => console.error("Error fetching card payments:", error));

        // Fetch Bank Payments
        axios.get('http://localhost:8070/api/bpayment')
            .then(response => {
                setBankPayments(response.data);
            })
            .catch(error => console.error("Error fetching bank payments:", error));

        // Fetch Direct Payments
        axios.get('http://localhost:8070/api/dpayment')
            .then(response => {
                setDirectPayments(response.data);
            })
            .catch(error => console.error("Error fetching direct payments:", error));
    }, []);

    return (
        <div className="body1">
            <OM_Dashboard_Header />
            <div className="container4" >
            &emsp;&emsp;&emsp;&emsp;&emsp;<h3 style={{fontWeight:"700",marginLeft:"40%"}}>Payment Details</h3>
                <br>

                </br>
                <div className="table-responsive">
                &emsp;&emsp;&emsp;&emsp;&emsp;  <h4 style={{marginLeft:"8%"}}>Card Payments</h4>
                <br>
                
                </br>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Order Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cardPayments.map((payment) => (
                                <tr key={payment._id}>
                                    <td>{payment.product}</td>
                                    <td>{payment.orderQuantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <br>
                    


                    </br>
                    <h4 style={{marginLeft:"8%"}}>Bank Payments</h4>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Order Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bankPayments.map((payment) => (
                                <tr key={payment._id}>
                                    <td>{payment.product}</td>
                                    <td>{payment.orderQuantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <br>
                    

                    
                    </br>

                    <h4 style={{marginLeft:"8%"}}>Direct Payments</h4>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Order Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {directPayments.map((payment) => (
                                <tr key={payment._id}>
                                    <td>{payment.product}</td>
                                    <td>{payment.orderQuantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <br>
                    

                    
                    </br>
                </div>
            </div>
        </div>
    );
}

export default Orderpage_admin;
