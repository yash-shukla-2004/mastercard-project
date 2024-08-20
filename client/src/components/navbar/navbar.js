import React from "react";

import { Link } from "react-router-dom";

const Navbar = () =>{
    return(
        <>
            <div className="">
            <nav className="flex h-16 items-center bg-neutral-900 mr-0 justify-between">
                <div className="flex gap-10 items-center">
                <div className="h-12 w-12">
                    <Link to="/"><img src="/logo512.png" className="h-full w-full" /></Link>
                </div>
                <div className="flex gap-4 mr-3">
                   <Link to ="/"><ul><span className="text-red-700 hover:text-red-900">Home</span></ul></Link>
                   <Link to= "/about"><ul><span className="text-red-700 hover:text-red-900">About</span></ul></Link>
                   <Link to ="/"><ul><span className="text-red-700 hover:text-red-900">Functionality</span></ul></Link>
                   <Link to ="/"><ul><span className="text-red-700 hover:text-red-900">Contact Us</span></ul></Link>
                </div>
                </div>
                <div>
                    <div className="h-12 w-12 rounded-full border-solid border-2 mr-5 hover:border-violet-600 ">
                        <Link to="/"><img src="/logo192.png" className="h-full w-full" /></Link>
                    </div>
                </div>
            </nav>
            </div>
        </>
    )
}

export default Navbar;