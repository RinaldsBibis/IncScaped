import { createContext, useState } from "react";

export const StorieContext = createContext({
    stories: null,
    setStorie: () => null,
});

export const StorieProvider = ({children}) =>{
    const [stories,setStorie] = useState([]);
    const value = {stories, setStorie};
    return(
        <StorieContext.Provider value={value}>
            {children}
        </StorieContext.Provider>
    )
}