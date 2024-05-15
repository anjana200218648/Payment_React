import React from "react";
import './Style/styles.css';

function Footer(){
    
    return(
        <div style={{background:"#FFF4F4"}}>
            <div class="row">
                <div class="col-sm-6 mb-3 mb-sm-0">
                    <div class="card" style={{background:"rgba(16, 16, 16, 0.926)"}}>
                        <div class="card-body" style={{marginLeft:"7%"}}>
                            <h4 class="card-title"><img src="../Images/pe.png" alt="" style={{width:"7%",height:"6%",marginLeft:"1%"}} /></h4><p style={{fontWeight:"700",color:"rgba(255, 74, 2, 0.816)"}}>Protons electronic & electricles</p>
                            <p class="card-text" style={{color:"white"}}>Call us.. 
                            <br />
                            <i class="fa fa-mobile" aria-hidden="true" style={{fontSize:"25px",color:"white"}}> (+94) 779054434</i></p>
                            <br />
                            <p class="card-text" style={{color:"white"}}>No 34, 1st Lane,Weligama.</p>
                            <h3 style={{color:"white"}}><i class="fa fa-facebook-square" aria-hidden="true"></i> &emsp;
                            <i class="fa fa-twitter-square" aria-hidden="true"></i> &emsp;
                            <i class="fa fa-instagram" aria-hidden="true"></i></h3>
                        <br />
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="card" style={{background:"rgba(16, 16, 16, 0.926)",marginRight:"1%"}}>
                        <div class="card-body" style={{textAlign:"center",color:"white"}}>
                            <h6 class="card-title" style={{textAlign:"center",fontWeight:"900",color:"rgba(255, 74, 2, 0.816)"}}><u>Info</u></h6>
                            <br />
                            <h6 class="card-title" ><a className="nav-link1" style={{textDecoration:"none",color:"white"}} href="aboutus">Aboutus</a></h6>
                            <h6 class="card-title" ><a className="nav-link1" style={{textDecoration:"none",color:"white"}} href="#">Terms & conditions</a></h6>
                            <br />
                            <h6 class="card-title" style={{textAlign:"center",fontWeight:"900",color:"rgba(255, 74, 2, 0.816)"}}><u>Customer Service</u></h6>
                            <br />
                            <h6 class="card-title" ><a className="nav-link1" style={{textDecoration:"none",color:"white"}} href="signup">My Account</a></h6>
                            <h6 class="card-title" ><a className="nav-lin1k" style={{textDecoration:"none",color:"white"}} href="faqs">FAQs</a></h6>
                            <h6 class="card-title" ><a className="nav-link1" style={{textDecoration:"none",color:"white"}} href="complaints">Complaint</a></h6>
                            <h6 class="card-title" ><a className="nav-link1" style={{textDecoration:"none",color:"white"}} href="users">Feedback</a></h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Footer;