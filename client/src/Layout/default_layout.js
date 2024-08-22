import React from "react";
import User from "../components/users/users.js";
import Navbar from "../components/navbar/navbar.js";

const Deflayout = (props) =>{
    return(
        <>
           
            {props.children}
        </>
    )
}

export default Deflayout;