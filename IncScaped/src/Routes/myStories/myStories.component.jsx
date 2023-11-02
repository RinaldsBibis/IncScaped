import React, { useContext, useEffect } from 'react'
import axiosClient from '../../axios';
import StoriesListComponent from '../../components/stories-list/stories-list.component'
import { StorieContext } from '../../context/storie.context';
import './myStories.styles.scss'
export default function MyStoriesComponent() {
  const {myStories, setMyStories} = useContext(StorieContext);
  const fetchData = async () => {
    axiosClient.get('/mystories')
    .then(({data})=>{
      setMyStories(data.data)
    })
    .catch((error)=>{
        console.log(error);
    }); 
    };
      useEffect(() => {
        
        fetchData();
      }, []);
   
  return (
    <StoriesListComponent stories={myStories}/>
  )
}
