import React from 'react'
import { useState } from 'react'
import FormInput from '../form-input/form-input.component';
import "./sign-up-form.styles.scss"
import Button from '../button/button.component';
import axiosClient from '../../axios';
import { useContext } from 'react';
import { UserContext } from '../../context/user.context';
const defaultFormFields = {
    username:'',
    email:'',
    password:'',
    pasword_confirmation:''
}


export default function SignUpForm() {
    const [formFields,setFormFields]=useState(defaultFormFields);
    const {username,email,password,pasword_confirmation} = formFields;
    const {setUserToken,setCurrentUser} = useContext(UserContext);
    const userInfo = {
        ...formFields,
        role: "0"
    };
    const handleSubmit = async (event) =>{
        event.preventDefault();
        if(password !== pasword_confirmation){
            alert("passwords do not match");
            return;
        }
        axiosClient.post('/signup', userInfo)
        .then(({data})=>{
            setCurrentUser(data.user);
            setUserToken(data.token);
        })
        .catch((error)=>{
            console.log(error);
        })
        
    }
    const handleChanges = (event) =>{
        const {name,value} = event.target;
        setFormFields({...formFields,[name]:value})        
    }
  return (
    <div className='sign-up-container'>
        <h2>Dont have an account?</h2>
        <span>Sign up with tour email and password</span>
        <form onSubmit={handleSubmit}>
            <FormInput label="Diplay name" type="text" required onChange={handleChanges} name="username" value={username}/>
            <FormInput label="Email" type="email" required onChange={handleChanges} name="email" value={email}/>
            <FormInput label="Password" type="password" required onChange={handleChanges} name="password" value={password}/>
            <FormInput label="Confirm Password" type="password" required onChange={handleChanges} name="pasword_confirmation" value={pasword_confirmation}/>
            <Button type='submit'>Sign up</Button>
        </form>
    </div>
  )
}