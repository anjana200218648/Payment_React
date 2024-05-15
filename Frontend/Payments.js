import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate ,useLocation} from 'react-router-dom';
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import NumberPage from './NumberPage';
import { Route, Switch } from 'react-router-dom';
import NumberPageForm from './NumberPageForm';
import Axios from 'axios';
import DirectPageForm from './DirectPageForm';
import { Padding, Payment } from '@mui/icons-material';
import axios from "axios";
import { useParams } from "react-router-dom";
import MyCart from '../../InstallationComponents/MyCart';


const styles = {
    headerStyle: {
        fontWeight: "900", 
        color: "rgba(255, 74, 2, 0.816)"
    },
    accordionItemStyle: {
        background: "rgba(16, 16, 16, 0.926)"
    },
    formLabelStyle: {
        fontWeight: "700", 
        color: "rgba(255, 74, 2, 0.816)"
    }
};


function Payments() {
    const navigate = useNavigate();
    const location = useLocation();
    const { product, amount, orderQuantity } = location.state || { product: '', amount: '', orderQuantity: '' };
    const [activeSelector, setActiveSelector] = useState(null);
    const [card, setCard] = useState('');
    const [cname, setCname] = useState('');
    const [exdate, setExdate] = useState('');
    const [cvv, setCvv] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [rgname, setRgname] = useState('');
    const [cemail, setCemail] = useState('');
    const [contactnumber, setContactnumber] = useState('');
    
    const [accountnumber, setAccountNumber] = useState('');
    const [slip, setSlip] = useState('');
    const [productState, setProduct] = useState(product);
    const [amountState, setAmount] = useState(amount);
    const [orderQuantityState, setOrderQuantity] = useState(orderQuantity);

    const handleSelectorClick = (selectorId) => {
        setActiveSelector((prevSelector) => (prevSelector === selectorId ? null : selectorId));
    };

    const handleSubmitCard = async (e) => {
        e.preventDefault();

        if (!card || !cname || !exdate || !cvv || !email||!amount||!orderQuantity||!product) {
            alert("Please fill in all fields");
            return;
        }

        const formData = {
            card: card,
            cname: cname,
            exdate: exdate,
            cvv: cvv,
            email: email,
            amount:amount,
            orderQuantity:orderQuantity,
            product:product
        };

        try {
            const response = await Axios.post('http://localhost:8070/api/createcards', formData);
            console.log('Response from server:', response.data);
            navigate('/NumberPageForm');
        } catch (error) {
            console.error('Error adding card:', error);
        }
    };

    const handleSubmitBankPayment = async (e) => {
        e.preventDefault();

        if (!email || !accountnumber || !amount || !slip||!product||!orderQuantity) {
            alert("Please fill in all fields");
            return;
        }

        const formData = {
            email: email,
            accountnumber: accountnumber,
            amount: amount,
            slip: slip,
            product:product,
            orderQuantity:orderQuantity
        };

        try {
            const response = await Axios.post('http://localhost:8070/api/createbpayment', formData);
            console.log('Response from server:', response.data);
            navigate('/BankPageForm');
        } catch (error) {
            console.error('Error making bank payment:', error);
        }
    };

    const handleSubmitDirectPayment = async (e) => {
        e.preventDefault();

        if (!name || !rgname || !cemail || !contactnumber || !amount ||!product||!orderQuantity) {
            alert("Please fill in all fields");
            return;
        }

        const formData = {
            name: name,
            rgname: rgname,
            cemail: cemail,
            contactnumber: contactnumber,
            amount: amount,
            product:product,
            orderQuantity:orderQuantity
        };

        try {
            const response = await Axios.post('http://localhost:8070/api/createdpayment', formData);
            console.log('Response from server:', response.data);
            navigate('/DirectPageForm');
        } catch (error) {
            console.error('Error making direct payment:', error);
        }
    };




    const { itemId } = useParams();
    const [itemDetails, setItemDetails] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:8070/advertisement/${itemId}`)
            .then((response) => {
                setItemDetails(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching item details:", error);
                setLoading(false);
            });
    }, [itemId]);

    

    return (
        <div >
            <Header />
            <br>
            
            </br> <br /> <br />
            &emsp;&emsp;&emsp;<div className="container4" style={{ width: "80%", overflowX: 'visible',marginLeft:"12%",background:"rgba(27, 27, 27, 0.744)",height:"40%",borderRadius:"2%" }}>
                <p></p>
                <br>
                </br>
                <h1 className="h3 mb-5" style={{ fontWeight: "900", color: "rgba(255, 74, 2, 0.816)",marginLeft:"37%" }}>Select Payment Method</h1>
                <div className="rows" style={{marginLeft:"15%",width:"80%"}}>
                    <div className="col-lg-10">
                        <div className="accordion" id="accordionPayment">
                            {/* Credit card */}
                            <div className="accordion-item mb-3" style={{ background: "rgba(16, 16, 16, 0.926)" }}>
                                <h2
                                    className={`h5 px-4 py-3 accordion-header d-flex justify-content-between align-items-center ${
                                        activeSelector === "collapseCC" ? "active" : ""
                                        }`}
                                    onClick={() => handleSelectorClick("collapseCC")}
                                >
                                    <div className="form-check w-100">
                                        <input className="form-check-input" type="radio" name="payment" id="payment1" />
                                        <label className="form-check-label pt-1" htmlFor="payment1" style={{ fontWeight: "700", color: "white" }}>
                                            Credit Card
                                        </label>
                                    </div>
                                    <span>
                                        <svg width="34" height="25" xmlns="http://www.w3.org/2000/svg">
                                            <g fillRule="nonzero" fill="white">
                                                <path d="M29.418 2.083c1.16 0 2.101.933 2.101 2.084v16.666c0 1.15-.94 2.084-2.1 2.084H4.202A2.092 2.092 0 0 1 2.1 20.833V4.167c0-1.15.941-2.084 2.102-2.084h25.215ZM4.203 0C1.882 0 0 1.865 0 4.167v16.666C0 23.135 1.882 25 4.203 25h25.215c2.321 0 4.203-1.865 4.203-4.167V4.167C33.62 1.865 31.739 0 29.418 0H4.203Z"></path>
                                                <path d="M4.203 7.292c0-.576.47-1.042 1.05-1.042h4.203c.58 0 1.05.466 1.05 1.042v2.083c0 .575-.47 1.042-1.05 1.042H5.253c-.58 0-1.05-.467-1.05-1.042V7.292Zm0 6.25c0-.576.47-1.042 1.05-1.042H15.76c.58 0 1.05.466 1.05 1.042 0 .575-.47 1.041-1.05 1.041H5.253c-.58 0-1.05-.466-1.05-1.041Zm0 4.166c0-.575.47-1.041 1.05-1.041h2.102c.58 0 1.05.466 1.05 1.041 0 .576-.47 1.042-1.05 1.042H5.253c-.58 0-1.05-.466-1.05-1.042Zm6.303 0c0-.575.47-1.041 1.051-1.041h2.101c.58 0 1.051.466 1.051 1.041 0 .576-.47 1.042-1.05 1.042h-2.102c-.58 0-1.05-.466-1.05-1.042Zm6.304 0c0-.575.47-1.041 1.051-1.041h2.101c.58 0 1.05.466 1.05 1.041 0 .576-.47 1.042-1.05 1.042h-2.101c-.58 0-1.05-.466-1.05-1.042Zm6.304 0c0-.575.47-1.041 1.05-1.041h2.102c.58 0 1.05.466 1.05 1.041 0 .576-.47 1.042-1.05 1.042h-2.101c-.58 0-1.05-.466-1.05-1.042Z"></path>
                                            </g>
                                        </svg>
                                    </span>
                                </h2>
                                <div
                                    id="collapseCC"
                                    className={`accordion-collapse collapse ${activeSelector === "collapseCC" ? "show" : ""}`}
                                    aria-labelledby="headingCC"
                                    data-parent="#accordionPayment"
                                >
                                    <div className="accordion-body" style={{ background: "rgba(16, 16, 16, 0.926)" }}>
                                        <form onSubmit={handleSubmitCard}>
                                            <div className='row'>
                                            <div className="px-2 col-lg-5 mb-3">
                                                <label className="form-label"style={{  color: "rgba(255, 74, 2, 0.816)" }}>Card Number</label>
                                                <input type="numbers" className="form-control" placeholder="5791 5721 .... ...." value={card} onChange={e => setCard(e.target.value)} maxLength={'16'} />

                                                
                                            </div>
                                            <div className="px-2 col-lg-5 mb-3">
                                                        <label className="form-label"style={{  color: "rgba(255, 74, 2, 0.816)" }}>Amount</label>
                                                        <input type="number" className="form-control" placeholder="EX:10000" value={amountState} onChange={e => setAmount(e.target.value)} />
                                                    </div>
                                            </div>

                                           
                                            <div className="row">
                                                <div className="col-lg-5">
                                                    <div className="mb-3">
                                                        <label className="form-label"style={{  color: "rgba(255, 74, 2, 0.816)" }} >Name on card</label>
                                                        <select className="form-select" id="cardType" name="cardType" value={cname} onChange={e => setCname(e.target.value)}>
                                                            <option value="MasterCard">MasterCard</option>
                                                            <option value="Visa">Visa</option>
                                                            <option value="American Express">American Express</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                &emsp;<div className="col-lg-3">
                                                    <div className="mb-3">
                                                        <label className="form-label"style={{  color: "rgba(255, 74, 2, 0.816)" }}>Expiry date</label>
                                                        <input type="date(year and month)" className="form-control" placeholder="MM/YY" value={exdate} onChange={e => setExdate(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-2">
                                                    <div className="mb-3">
                                                        <label className="form-label" style={{  color: "rgba(255, 74, 2, 0.816)" }}>CVV Code</label>
                                                        <input type="password" className="form-control" value={cvv} onChange={e => setCvv(e.target.value)} maxLength={4} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row'>
                                            <div className="px-1 col-lg-5 mb-3">
                                                <label className="form-label"style={{color: "rgba(255, 74, 2, 0.816)" }}>Email</label>
                                                <input type="email" className="form-control" placeholder="example@gmail.com" value={email} onChange={e => setEmail(e.target.value)} />
                                            </div>
                                            &emsp; <div className="col-lg-5">
                                                    <div className="mb-3">
                                                        <label className="form-label" style={{  color: "rgba(255, 74, 2, 0.816)" }}>Quantity</label>
                                                        <input type="number" className="form-control" value={orderQuantityState} onChange={e => setOrderQuantity(e.target.value)}  />
                                                    </div>
                                                    </div>

                                            </div>
                                            <div className="px-1 col-lg-9 mb-3">
                                            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<label className="form-label"style={{color: "rgba(255, 74, 2, 0.816)" }}>Product</label>
                                                 <input type="text" className="form-control" placeholder="CCTV" value={productState} onChange={e => setProduct(e.target.value)} />
                                            </div>

                                            <br/> <br/>
                                            <button type="submit" className="btn btn-primary" style={{ width: '600px',color:"white",marginLeft:"10%",background:"rgba(255, 74, 2, 0.816)" }}>Submit</button>
                                            
                                        </form>
                                    </div>
                                </div>
                            </div>
                            {/* Bank Payment */}
                            <div className="accordion-item mb-3 border" style={{ background: "rgba(16, 16, 16, 0.926)" }}>
                                <h2
                                    className={`h5 px-4 py-3 accordion-header d-flex justify-content-between align-items-center ${
                                        activeSelector === "collapsePP" ? "active" : ""
                                        }`}
                                    onClick={() => handleSelectorClick("collapsePP")}
                                >
                                    <div className="form-check w-100">
                                        <input className="form-check-input" type="radio" name="payment" id="payment2" />
                                        <label className="form-check-label pt-1" htmlFor="payment2" style={{ fontWeight: "700", color: "white" }}>
                                            Bank Payment
                                        </label>
                                    </div>
                                    <span>
                                        <svg width="34" height="25" xmlns="http://www.w3.org/2000/svg" fill="white">
                                            <path d="M2 7V17H22V7H2ZM20 15H4V9H20V15ZM6 11H8V13H6V11ZM10 11H18V13H10V11Z" fill="white" />
                                        </svg>
                                    </span>
                                </h2>
                                <div
                                    id="collapsePP"
                                    className={`accordion-collapse collapse ${activeSelector === "collapsePP" ? "show" : ""}`}
                                    aria-labelledby="headingPP"
                                    data-parent="#accordionPayment"
                                >
                                    <div className="accordion-body">
                                        <form onSubmit={handleSubmitBankPayment} style={{ fontWeight: "700", color: "rgba(255, 74, 2, 0.816)" }}>
                                            <div className="px-2 col-lg-6 mb-3">
                                                <label className="form-label"style={{  color: "rgba(255, 74, 2, 0.816)" }}>Email address</label>
                                                <input type="email" className="form-control" placeholder="example@gmail.com" value={email} onChange={e => setEmail(e.target.value)} />
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="mb-3">
                                                        <label className="form-label" style={{  color: "rgba(255, 74, 2, 0.816)" }}>Account Number</label>
                                                        <input type="text" className="form-control" placeholder="EX:2345677654322444" value={accountnumber} onChange={e => setAccountNumber(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-3">
                                                    <div className="mb-3">
                                                        <label className="form-label"style={{  color: "rgba(255, 74, 2, 0.816)" }}>Amount</label>
                                                        <input type="number" className="form-control" placeholder="EX:10000" value={amountState} onChange={e => setAmount(e.target.value)} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row'>
                                            <div className="px-2 col-lg-6 mb-3">
                                                <label className="form-label" style={{  color: "rgba(255, 74, 2, 0.816)" }}>Upload Slip</label>
                                                <input type="file" className="form-control" value={slip} onChange={e => setSlip(e.target.value)} />
                                            </div>
                                            <div className="col-lg-5">
                                                    <div className="mb-3">
                                                        <label className="form-label" style={{  color: "rgba(255, 74, 2, 0.816)" }}>Quantity</label>
                                                        <input type="number" className="form-control" value={orderQuantityState} onChange={e => setOrderQuantity(e.target.value)}  />
                                                    </div>
                                                    </div>

                                            </div>
                                            <div className="px-1 col-lg-9 mb-3">
                                            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<label className="form-label"style={{color: "rgba(255, 74, 2, 0.816)" }}>Product</label>
                                                 <input type="text" className="form-control" placeholder="CCTV" value={productState} onChange={e => setProduct(e.target.value)} />
                                            </div>
                                            <br>
                                            </br>
                                            <button type="submit" className="btn btn-primary"style={{ width: '600px',color:"white",marginLeft:"10%",background:"rgba(255, 74, 2, 0.816)" }}>
                                                Submit
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            {/* Direct Payment */}
                            <div className="accordion-item mb-3 border" style={{ background: "rgba(16, 16, 16, 0.926)" }}>
                                <h2
                                    className={`h5 px-4 py-3 accordion-header d-flex justify-content-between align-items-center ${
                                        activeSelector === "collapseDP" ? "active" : ""
                                        }`}
                                    onClick={() => handleSelectorClick("collapseDP")}
                                >
                                    <div className="form-check w-100">
                                        <input className="form-check-input" type="radio" name="payment" id="payment3" />
                                        <label className="form-check-label pt-1" htmlFor="payment3" style={{ fontWeight: "700", color: "white" }}>
                                            Direct Payment
                                        </label>
                                    </div>
                                    <span>
                                        <svg width="34" height="25" xmlns="http://www.w3.org/2000/svg" fill="white">
                                            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 7C10.9 7 10 7.9 10 9H14C14 7.9 13.1 7 12 7ZM12 17C13.1 17 14 16.1 14 15H10C10 16.1 10.9 17 12 17ZM12 11C11.45 11 11 11.45 11 12C11 12.55 11.45 13 12 13C12.55 13 13 12.55 13 12C13 11.45 12.55 11 12 11Z" fill="white" />
                                        </svg>
                                    </span>
                                </h2>
                                <div
                                    id="collapseDP"
                                    className={`accordion-collapse collapse ${activeSelector === "collapseDP" ? "show" : ""}`}
                                    aria-labelledby="headingDP"
                                    data-parent="#accordionPayment"
                                >
                                    <div className="accordion-body">
                                        <form onSubmit={handleSubmitDirectPayment} style={{ fontWeight: "700", color: "rgba(255, 74, 2, 0.816)" }}>
                                            <div className="px-2 col-lg-6 mb-3">
                                                <label className="form-label" style={{  color: "rgba(255, 74, 2, 0.816)" }}>Name</label>
                                                <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} />
                                            </div>
                                            <div className="px-2 col-lg-6 mb-3">
                                                <label className="form-label" style={{  color: "rgba(255, 74, 2, 0.816)"}}>Repair Agent Name</label>
                                                <input type="text" className="form-control" value={rgname} onChange={e => setRgname(e.target.value)} />
                                            </div>
                                            <div className='row'>
                                            <div className="px-2 col-lg-6 mb-3">
                                                <label className="form-label"style={{  color: "rgba(255, 74, 2, 0.816)"}}>Email address</label>
                                                <input type="email" className="form-control" placeholder="example@gmail.com" value={cemail} onChange={e => setCemail(e.target.value)} />
                                            </div>
                                            <div className="col-lg-5">
                                                    <div className="mb-3">
                                                        <label className="form-label" style={{  color: "rgba(255, 74, 2, 0.816)" }}>Quantity</label>
                                                        <input type="number" className="form-control" value={orderQuantityState} onChange={e => setOrderQuantity(e.target.value)}  />
                                                    </div>
                                                    </div>

                                            </div>
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="mb-3">
                                                        <label className="form-label"style={{  color: "rgba(255, 74, 2, 0.816)"}}>Whatsapp Number</label>
                                                        <input type="tel" className="form-control" placeholder="EX:+94 71077 5688" value={contactnumber} onChange={e => setContactnumber(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-3">
                                                    <div className="mb-3">
                                                        <label className="form-label"style={{  color: "rgba(255, 74, 2, 0.816)"}}>Amount</label>
                                                        <input type="number" className="form-control" placeholder="EX:10000" value={amountState} onChange={e => setAmount(e.target.value)} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="px-1 col-lg-9 mb-3">
                                            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<label className="form-label"style={{color: "rgba(255, 74, 2, 0.816)" }}>Product</label>
                                                 <input type="text" className="form-control" placeholder="CCTV" value={productState} onChange={e => setProduct(e.target.value)} />
                                            </div>
                                            <br>
                                            </br>

                                            <button type="submit" className="btn btn-primary" style={{ width: '600px',color:"white",marginLeft:"10%",background:"rgba(255, 74, 2, 0.816)" }}>
                                                Submit
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br>

                </br>
            </div>
            <br>

            </br><br /><br /><br /><br />
            <Footer />
        </div>
    );
}

export default Payments;