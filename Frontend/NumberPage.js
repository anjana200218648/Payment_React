import React, { useState } from "react";

const NumberPage = ({ addCard }) => {
    const [verificationCode, setVerificationCode] = useState(''); // State to store the entered verification code
    const [randomCode, setRandomCode] = useState(null); // State to store the random code received via email
    const [paymentSuccess, setPaymentSuccess] = useState(false); // State to track payment success
    const [showPopup, setShowPopup] = useState(false); // State to control visibility of popup

    const handleInputChange = (e) => {
        const { value } = e.target;
        setVerificationCode(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Check if the entered code matches the random code received
        if (verificationCode === verificationCode) {
            // Set payment success state to true
            setPaymentSuccess(true);
        } else {
            // Notify the user that the entered code is incorrect
            alert("Entered code is incorrect. Please try again.");
        }
    };

    // Function to handle receiving the email with both codes
    const receiveEmail = (verificationCode, randomCode) => {
        // Store the random code received via email
        setRandomCode(randomCode);
    };

    return (
        <div className="container">
            <h1 className="mt-5 mb-3" style={{fontWeight:"900",color:"rgba(255, 74, 2, 0.816)"}}>Security code</h1>
            {paymentSuccess ? (
                <div>
                    <p>Payment successful!</p>
                    <button className="btn btn-primary" onClick={() => setShowPopup(true)}>Click for Popup Message</button>
                    <button className="btn btn-primary mt-3" onClick={() => window.location.href = '/'}>Go Home</button>
                    {showPopup && (
                        <div className="popup-box">
                            <p>Thank you for your payment!</p>
                            <button className="btn btn-secondary" onClick={() => setShowPopup(false)}>Close</button>
                        </div>
                    )}
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="px-2 col-lg-5 mb-3">
                        <label className="form-label">Enter Verification Code</label><br></br>
                        <input
                            type="number"
                            className="form-control"
                            value={verificationCode}
                            onChange={handleInputChange}
                            maxLength={4}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary"style={{ width: '600px' }}>
                        PAY
                    </button>
                </form>
            )}
        </div>
    );
};

export default NumberPage;
