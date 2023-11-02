import { createContext, useState } from "react";

export const StorieContext = createContext({
    stories: null,
    setStorie: () => null,

    myStories: null,
    setMyStories: () => null,
});

export const StorieProvider = ({children}) =>{
    const [stories,setStorie] = useState([]);
    const [myStories,setMyStories] = useState([]);
    const value = {stories, setStorie,myStories,setMyStories};
    return(
        <StorieContext.Provider value={value}>
            {children}
        </StorieContext.Provider>
    )
}