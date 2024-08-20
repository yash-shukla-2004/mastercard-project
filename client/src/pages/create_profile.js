import React, { useState } from "react";

const AddUser = () =>{
    
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("http://localhost:3001/student/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id, name }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                setError(data.error);
                setSuccess(null);
            } else {
                setSuccess(`Student added: ${data.name}`);
                setError(null);
                setId("");
                setName("");
            }
        })
        .catch(error => {
            setError("An error occurred");
            setSuccess(null);
        });
    }
    return(
        <>
        <div>
            <h2>Add a New Student</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>ID:</label>
                    <input
                        type="number"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Student</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
        </div>
        </>
    )
}

export default AddUser;