import React from "react";
import Deflayout from "../Layout/default_layout";


const Defhoc = ({ temp: Temp , ...rest }) =>{
    return(
        <Deflayout>
            <Temp {...rest} />
        </Deflayout>
    )
}

export default Defhoc;