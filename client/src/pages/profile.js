import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Profile = () =>{
    const [user,setUser] = useState();
    const [err,setError] = useState(null);
    const {name} = useParams();

    useEffect(()=>{
        if(name){
            fetch(`http://localhost:3001/users/${name}`).then(response => response.json()).
            then(data =>{ console.log(data); 
            setUser(data);
            setError(null); }).catch(error => {console.log("An Error Has Occured:", error );
            setError(error);
        });

        }
    },[name])
    return(
        <>
            <div>
                {
                    user ? (
                        <div>
                            
                            <span>Password: {user.password}
                            </span>
                            <br></br>
                            <span>
                                Date Created: {user.created_at}</span>
                        </div>
                    ):(
                        <div>
                            <p>Please Login First</p>
                        </div>
                    )                
                }
            </div>
        </>
    );
}

export default Profile;