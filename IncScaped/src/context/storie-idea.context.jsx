import { createContext, useState } from "react";

export const IdeaContext = createContext({
    idea: null,
    setIdea: () => null,
});

export const IdeaProvider = ({children}) =>{
    const [idea,setIdea] = useState([]);
    const value = {idea, setIdea};
    return(
        <IdeaContext.Provider value={value}>
            {children}
        </IdeaContext.Provider>
    )
}