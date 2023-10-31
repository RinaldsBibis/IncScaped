import React from 'react'
import StorieComponent from '../storie/storie.component'
import { useContext } from 'react'
import { UserContext } from "../../context/user.context";
import { StorieContext } from '../../context/storie.context'
import './stories-list.styles.scss'


export default function StoriesListComponent() {  
  const { allUsers } = useContext(UserContext);
  const {stories} = useContext(StorieContext);
 

  const handleCombinedClick = (event, storie) => {
    handleButtonClick(event);
    handleDeleteStory(storie);
  };
  const handleButtonClick = (event) => {
    event.preventDefault(); 
  };
  
  const handleDeleteStory = (storie) => {
    const user = allUsers.find((user) => user.id === storie.user_id);
    console.log(user.id)
    console.log(user.username)
    console.log(user.email)   
  };


  return (
    <div className='stories-container'>
     
        {stories.map((storie, index) => (
 
          <StorieComponent key={index} buttons={<button type="submit" onClick={(event) => handleCombinedClick(event, storie)}  >Delete</button>} storie={storie}/> 

        ))}
       
    </div>
  )
}
