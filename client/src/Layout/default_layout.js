import React from "react";
import User from "../components/users/users";
import Navbar from "../components/navbar/navbar";

const Deflayout = (props) =>{
    return(
        <>
            <Navbar />
            {props.children}
        </>
    )
}

export default Deflayout;