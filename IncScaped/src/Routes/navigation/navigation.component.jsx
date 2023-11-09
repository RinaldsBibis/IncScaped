import React from 'react'
import { useContext } from 'react'
import { Outlet, Link } from 'react-router-dom'
// import CrwnLogo from '../../assets/crown.svg'
import Logo from '../../assets/inkscapedLogo.png'
import axiosClient from '../../axios'
import { UserContext } from '../../context/user.context'
import './navigation.styles.scss'
import { useNavigate } from "react-router-dom";

export default function Navigation() {  
    const {userToken,setCurrentUser,setUserToken,currentUser} = useContext(UserContext);
    const navigate = useNavigate();
    const signOut = (event)=>{
      event.preventDefault();
      axiosClient.post('/logout')
      .then(response=>{
        setCurrentUser(null);
        setUserToken(null);
        navigate("/auth");
      }).catch((error)=>{
        console.log(error);
    });
    }

    return(
      <>
        <div className='navigation'>
            <Link className='logo-container' to="/">
                <img className='logoStyle' src={Logo} alt="Logo" />
            </Link>
            <div className='nav-links-container'>                
                {userToken?(
                  <>
                    <Link className='nav-link' to="/write">RAKSTĪT</Link>
                    {currentUser && currentUser.role === 1? <Link className='nav-link' to="/admin">ADMIN</Link>:null}     
                     <Link className='nav-link' to="/mystories">MANI STĀSTI</Link>                  
                    <span className='nav-link' onClick={signOut}>IZRAKSTĪTIES</span>
                  </>
                ):(
                  <Link className='nav-link' to="/auth">PIERAKSTĪTIES</Link>
                )}                
            </div>
        </div>
        <Outlet/>
      </>
    )
  }
