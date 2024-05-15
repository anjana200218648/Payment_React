import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Style/styles.css";

function Header() {
    const [cartItemCount, setCartItemCount] = useState(0);
    const navigate = useNavigate();

    // Fetch cart data to get the count of items
    const fetchCartItemCount = async () => {
        try {
            const response = await axios.get("http://localhost:8070/Cart");
            if (response.data.success) {
                setCartItemCount(response.data.cart.length);
            } else {
                console.log("Failed to fetch cart items");
            }
        } catch (error) {
            console.error("Error fetching cart items:", error);
        }
    };

    useEffect(() => {
        fetchCartItemCount(); // Fetch cart item count initially

        // Fetch cart item count every 30 seconds
        const intervalId = setInterval(fetchCartItemCount, 30000);

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <p style={{ marginLeft: "8%", color: "#5D6D7E", fontWeight: "800" }}>
                Wellcome Protons e&e <i className="fa fa-mobile" aria-hidden="true" style={{ marginLeft: "63%", fontWeight: "700" }}>
                    +110007654437
                </i>{" "}
                &ensp; | &ensp; <i className="fa fa-envelope-o" aria-hidden="true" style={{ fontWeight: "700" }}>
                    qqqqqq@hff.com
                </i>
            </p>
            <hr style={{ border: "1px solid" }} />
            <img src="../Images/pe.png" alt="" style={{ width: "4%", height: "4%", marginLeft: "1%" }} />
            <button
                className="login-btn"
                onClick={() => navigate("/signup")}
                style={{
                    marginLeft: "84%",
                    backgroundColor: "#E9E9E9",
                    borderRadius: "3px",
                    border: "none",
                    width:"8%",
                    height:"30px",
                }}
            >
                <i className="fa fa-user-o" aria-hidden="true"  onClick={() => navigate("/signup")} style={{ fontSize: "18px", color: "black", fontWeight: "900" }}>
                    {" "}
                    My Account
                </i>
            </button>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <b>
                            <h4 style={{ color: "white" }}>
                                <u>
                                    Protons <span style={{ color: "rgba(255, 74, 2, 0.816)" }}>E&E</span>
                                </u>
                            </h4>
                        </b>
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav" style={{ marginLeft: "11%" }}>
                            <li className="nav-item">
                                <button className="nav-btn" onClick={() => navigate("/")}>
                                    {" "}
                                    <a className="nav-link_H" aria-current="page" href="#">
                                        Home
                                    </a>
                                </button>
                            </li>

                            <li className="nav-item dropdown" style={{ marginLeft: "25%" }}>
                                <a className="nav-link_H dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Installation
                                </a>
                                <ul className="dropdown-menu" style={{ width: "255px" }}>
                                    <li>
                                        <button className="dropdown-btn" onClick={() => navigate("/cctv")}>
                                            CCTV&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;
                                        </button>
                                    </li>
                                    <li>
                                        <button className="dropdown-btn" onClick={() => navigate("/doorphone")}>
                                            DOOR PHONE&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;
                                        </button>
                                    </li>
                                    <li>
                                        <button className="dropdown-btn" onClick={() => navigate("/doorlock")}>
                                            DOOR LOCK&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;&ensp;&ensp;
                                        </button>
                                    </li>
                                    <li>
                                        <button className="dropdown-btn" onClick={() => navigate("/alarm")}>
                                            ALARMS & MOTION DETECTOR
                                        </button>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item" style={{ marginLeft: "24%" }}>
                                <button className="nav-btn" onClick={() => navigate("/repair")}>
                                    <a className="nav-link_H" href="#">
                                        Repairing
                                    </a>
                                </button>
                            </li>

                            <li className="nav-item" style={{ marginLeft: "24%" }}>
                                <button className="nav-btn" onClick={() => navigate("/aboutus")}>
                                    {" "}
                                    <a className="nav-link_H" href="aboutus">
                                        Aboutus
                                    </a>
                                </button>
                            </li>

                            <li className="nav-item" style={{ marginLeft: "24%" }}>
                                <button className="nav-btn" onClick={() => navigate("/complaints")}>
                                    {" "}
                                    <a className="nav-link_H" href="complaints">
                                        Complaint
                                    </a>
                                </button>
                            </li>

                            <li className="nav-item" style={{ marginLeft: "24%", position: "relative" }}>
    <button className="nav-btn" onClick={() => navigate("/Cart_View")}>
    {" "}
                                    <a className="nav-link_H" href="#">
                                        <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                                        {cartItemCount > 0 && (
                                            <span className="badge bg-danger" style={{ position: "absolute", top: "-9px", right: "-30px" }}>
                                                {cartItemCount}
                                            </span>
                                        )}
                                    </a>
    </button>
</li>

                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;
