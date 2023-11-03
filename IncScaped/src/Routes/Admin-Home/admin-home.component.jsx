import React, { useState } from "react";
import "./admin-home.styles.scss";
import Button from "../../components/button/button.component";
import FormInput from "../../components/form-input/form-input.component";
import axiosClient from "../../axios";
import { useContext } from "react";
import { UserContext } from "../../context/user.context";
import AddUserForm from "../../components/add-user-form/add-user-form.component";
import { useEffect } from "react";
import ErrorMessage from "../../components/error-message/error-message.component";
export default function AdminHomeComponent() {


  const [errorMessage, setErrorMessage]=useState("")
  const [prompt_text, setPrompts] = useState('');
  const [show_date, setshow_date] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
     axiosClient.post("/prompt", storyInfo)
     .then(({data})=>{

     })
     .catch(({response})=>{
         console.log(response.data);
         setErrorMessage(response.data.message);
     });
      console.log(storyInfo)
      setPrompts('')
    setshow_date('')
  };

  const handleDeleteUser = (user) => {
    setErrorMessage("");
    axiosClient.delete(`/users/${user.id}`)
    .then(({data})=>{

 })
 .catch(({response})=>{
     console.log(response.data);
     setErrorMessage(response.data.message);
 });
 getAllUsers();
  };

  const handleChange = (event) => {
    setErrorMessage("");
    const { value } = event.target;
    setPrompts(value);
  };
  const getAllUsers = async() => {
    axiosClient.get(`/users_all`)
    .then(({data})=>{
       setAllUsers(data)
  })
  .catch(({response})=>{
      console.log(response);
      setErrorMessage(response.data.message);
  });
  }
useEffect(()=>{

getAllUsers();
},[])

  const { allUsers,setAllUsers } = useContext(UserContext);


  const handleButtonClick = (event) => {
    event.preventDefault(); // This prevents the default form submission behavior
    // Add your custom logic here
  };
 

  const [filter, setFilter] = useState("");

  const handleFilterChange = (event) => {
    const { value } = event.target;
    setFilter(value);

  };

  const filteredUsers = allUsers.filter((user) =>
    user.username.toLowerCase().includes(filter.toLowerCase())
  );
 

  const handleDateChange = (e) => {
    setshow_date(e.target.value);
    console.log(show_date)
    
  };

  const storyInfo = {
    prompt_text,
    show_date
}
const handleCombinedClick = (event, user) => {
  handleButtonClick(event);
  handleDeleteUser(user);
};

  return (
    <div >
      <div className="admin_page-container">
        {errorMessage&&<ErrorMessage message={errorMessage}/>}
      </div>     

    <div className="wrapper">     
      <div className="one">
        <form onSubmit={handleSubmit}>
          <FormInput
            onChange={handleChange}
            label="Jaunā stāsta ideja"
            type="text"
            name="prompt_text"
            value={prompt_text}
          />
          <label htmlFor="datePicker">Izvēlies datumu: </label>
      <input
        type="date"
        id="datePicker"
        name="date"
        value={show_date}
        onChange={handleDateChange}
      />
    <p></p>


          <Button type="submit">Iestatīt</Button>
        </form>
      </div>


      <div className="two">
        <form>
          <h1>User Table</h1>
          <FormInput
            onChange={handleFilterChange}
            label="Filter username"
            type="text"
            name="filter"
            value={filter}
          />
        <div className="table-scroll">
          <table className="table-container">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>REMOVE</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <Button type="submit" onClick={(event) => handleCombinedClick(event, user)} >Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </form>
        </div>

        <div className="four">
          <AddUserForm getAllUsers={getAllUsers}/>
          </div>        

    </div>
    </div>


  );
}
