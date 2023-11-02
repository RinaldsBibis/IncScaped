import React from 'react'
import { useState } from 'react'
import FormInput from '../form-input/form-input.component';
import axiosClient from '../../axios';
import Button from '../button/button.component';

const defaultFormFields = {
    username:'',
    email:'',
    password:'',
}

export default function AddUserForm({getAllUsers}) {
    const [formFields,setFormFields]=useState(defaultFormFields);
    const {username,email,password} = formFields;
       
    const handleSubmit = async (event) =>{
        event.preventDefault()
        axiosClient.post('/users', userInfo)
        setFormFields(defaultFormFields);
        getAllUsers();
    }

    const handleChanges = (event) =>{
        const {name,value} = event.target;
        setFormFields({...formFields,[name]:value})        
    }
    const [isChecked, setIsChecked] = useState(false);
  
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); 
  };

  const real_role= isChecked ? "1" : "0";
  const userInfo = {
    ...formFields,
    role: real_role
}

  return (
    <div className='sign-up-container'>
        <h2>Create a new account</h2>
        <form onSubmit={handleSubmit}>
            <FormInput label="Username" type="text" required onChange={handleChanges} name="username" value={username}/>
            <FormInput label="Email" type="email" required onChange={handleChanges} name="email" value={email}/>
            <FormInput label="Password" type="password" required onChange={handleChanges} name="password" value={password}/>
            <input 
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={isChecked}
        />
            <label htmlFor="checkbox">Admin</label>
            <p></p>
            
            <Button type='submit'>Create account</Button>
            
        </form>
    </div>
  )
}
