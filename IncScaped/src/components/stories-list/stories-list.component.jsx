import React from 'react'
import StorieComponent from '../storie/storie.component'
import { useContext } from 'react'
import { UserContext } from "../../context/user.context";
import { StorieContext } from '../../context/storie.context'
import './stories-list.styles.scss'
import { useEffect } from 'react'
import axiosClient from '../../axios'


export default function StoriesListComponent() {  
  
  const {stories, setStorie} = useContext(StorieContext);
  useEffect(() => {
    const fetchData = async () => {
        axiosClient.get('/storyAll')
        .then(({data})=>{
          setStorie(data.data)
        })
        .catch((error)=>{
            console.log(error);
        }); 
    };
    fetchData();
  }, []);
  
   const handleCombinedClick = (event, storie) => {
    handleButtonClick(event);
    handleDeleteStory(storie);
  };
  const handleButtonClick = (event) => {
    event.preventDefault(); 
  };
  
  const handleDeleteStory = (storie) => {
  }; 

  return (
    <div className='stories-container'>
     
        {stories.map((storie, index) => (
 
          <StorieComponent key={index} buttons={<button type="submit" onClick={(event) => handleCombinedClick(event, storie)}  >Delete</button>} storie={storie}/> 

        ))}
       
    </div>
  )
}
