import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Profile = () =>{
    const [student,setStudent] = useState();
    const {id} = useParams();

    useEffect(()=>{
        if(id){
            fetch(`http://localhost:3001/student/${id}`).then(response => response.json()).
            then(data =>{ console.log(data.students[0]); 
            setStudent(data.students[0]);}).catch(error => console.log("An Error Has Occured:", error ));

        }
    },[id])
    return(
        <>
            <div>
                {
                    student ? (
                        <div>
                            <h1>Welcome, {student.name}</h1>
                            <span>ID: {student.id}</span>
                        </div>
                    ):(
                        <div>
                            <p>No Student with ID = {id} found!!</p>
                        </div>
                    )                
                }
            </div>
        </>
    );
}

export default Profile;