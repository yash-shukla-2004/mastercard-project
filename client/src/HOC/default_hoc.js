import React from "react";
import Deflayout from "../Layout/default_layout.js";


const Defhoc = ({ temp: Temp , ...rest }) =>{
    return(
        <Deflayout>
            <Temp {...rest} />
        </Deflayout>
    )
}

export default Defhoc;