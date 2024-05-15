import React from "react";

function Slideshow(){
    return(
        <div>
            <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner" >
                        <div className="carousel-item active" data-bs-interval="10000">
                        <img className="img" src="./Images/slide1.jpg" alt=""  />
                        </div>
                        <div className="carousel-item" data-bs-interval="2000">
                        <img className="img" src="./Images/slide2.jpg" alt="" />
                        </div>
                        <div className="carousel-item">
                        <img className="img" src="./Images/slide3.png" alt="" />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                    </div>
        </div>
    )
}
export default Slideshow;