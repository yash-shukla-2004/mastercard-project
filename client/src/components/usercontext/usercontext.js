import React, { createContext, useState } from 'react';

// Create a Context for the logged-in user
export const UserContext = createContext();

// Create a Provider component
export const UserProvider = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useState(null);

    return (
        <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
            {children}
        </UserContext.Provider>
    );
};
