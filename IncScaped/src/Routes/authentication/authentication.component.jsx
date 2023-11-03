import React from 'react'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import './authentication.styles.scss';
import { useContext } from 'react';
import { UserContext } from '../../context/user.context';
import { Navigate } from 'react-router-dom';
export default function Authentication() {
  const {userToken} = useContext(UserContext);
  if(userToken){
    return <Navigate to="/"/>
  }
  return (
      <div className='authentication-container'>
            <SignInForm />
            <SignUpForm />
      </div>    
  )
}
