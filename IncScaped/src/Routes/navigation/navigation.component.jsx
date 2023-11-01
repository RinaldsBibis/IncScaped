import React from 'react'
import { useContext } from 'react'
import { Outlet, Link } from 'react-router-dom'
import CrwnLogo from '../../assets/crown.svg'
import axiosClient from '../../axios'
import { UserContext } from '../../context/user.context'
import './navigation.styles.scss'

export default function Navigation() {  
    const {userToken,setCurrentUser,setUserToken} = useContext(UserContext);
    const signOut = (event)=>{
      event.preventDefault();
      axiosClient.post('/logout')
      .then(response=>{
        setCurrentUser({});
        setUserToken(null);
      }).catch((error)=>{
        console.log(error);
    });

    
    }

    return(
      <>
        <div className='navigation'>
            <Link className='logo-container' to="/">
                <CrwnLogo className='logo'/>
            </Link>
            <div className='nav-links-container'>                
                {userToken?(
                  <>
                    <Link className='nav-link' to="/write">RAKSTĪT</Link>
                    <Link className='nav-link' to="/admin">admin</Link>
                    <span className='nav-link' onClick={signOut}>SIGN OUT</span>
                  </>
                ):(
                  <Link className='nav-link' to="/auth">SIGN IN</Link>
                )}                
            </div>
        </div>
        <Outlet/>
      </>
    )
  }
