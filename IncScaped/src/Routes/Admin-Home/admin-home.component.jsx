import React, { useState } from "react";
import "./admin-home.styles.scss";
import Button from "../../components/button/button.component";
import FormInput from "../../components/form-input/form-input.component";
import axiosClient from "../../axios";
import { useContext } from "react";
import { UserContext } from "../../context/user.context";
import StoriesListComponent from '../../components/stories-list/stories-list.component'
import AddUserForm from "../../components/add-user-form/add-user-form.component";
export default function AdminHomeComponent() {
  const [prompts, setPrompts] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    // axiosClient.post("/prompt", storyInfo)
      console.log(storyInfo)
      setPrompts('')
    setSelectedDate('')
  };

  const handleDeleteUser = (user) => {
    console.log(user.id)
    console.log(user.username)
    console.log(user.email)
  };
  const handleChange = (event) => {
    const { value } = event.target;
    setPrompts(value);
  };

  const { allUsers } = useContext(UserContext);
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
    setSelectedDate(e.target.value);
    console.log(selectedDate)
    
  };

  const storyInfo = {
    prompts,
    selectedDate
}
const handleCombinedClick = (event, user) => {
  handleButtonClick(event);
  handleDeleteUser(user);
};

  return (

    <div className="wrapper"> 
      <div className="one">
        <form onSubmit={handleSubmit}>
          <FormInput
            onChange={handleChange}
            label="Jaunā stāsta ideja"
            type="text"
            name="prompts"
            value={prompts}
          />
          <label htmlFor="datePicker">Izvēlies datumu: </label>
      <input
        type="date"
        id="datePicker"
        name="date"
        value={selectedDate}
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
    
        <div className="stories-scroll">
        <StoriesListComponent/> 
        </div>

        <div className="four">
          <AddUserForm/>
          </div>        

    </div>



  );
}
