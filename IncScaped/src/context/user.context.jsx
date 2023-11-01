import { createContext, useState } from "react";

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,

    allUsers: null,
    setAllUsers: () => null,

    userToken: null,
    setUserToken: () => null,
});

export const UserProvider = ({children}) =>{
    const [currentUser,setCurrentUser] = useState({});
    const [allUsers,setAllUsers] = useState([]);
    const [userToken,_setUserToken] = useState(localStorage.getItem('TOKEN') || '');
    
    
    const setUserToken = (token) =>{
        if(token){
            localStorage.setItem('TOKEN',token);
            localStorage.setItem('ROLE',currentUser.role);
        }else{
            localStorage.removeItem('TOKEN')
            localStorage.removeItem('ROLE');
        }
        _setUserToken(token);
    }

    const setCurrentUser = (user) =>{
        if(localStorage.getItem('TOKEN')){
            localStorage.setItem('ROLE',user.role);

        }else{

            localStorage.removeItem('ROLE');
        }
        _setCurrentUser(user);
    }

    const value = {currentUser, setCurrentUser,allUsers,setAllUsers,userToken,setUserToken};


    
    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
    
}