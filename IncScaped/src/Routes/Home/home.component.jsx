import React, { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import axiosClient from '../../axios';
import StoriesListComponent from '../../components/stories-list/stories-list.component'
import { StorieContext } from '../../context/storie.context';

export default function HomeCmponent() {
  const {stories, setStorie} = useContext(StorieContext);
  const fetchData = async () => {
    axiosClient.get('/storyAll')
    .then(({data})=>{
       setStorie(data.data)
    })
    .catch((error)=>{
        console.log(error);
    }); 
    };
      useEffect(() => {
        
        fetchData();
      }, []);
  
      return (
       <>
          <Outlet/>
          <StoriesListComponent stories={stories} fetchData={fetchData}/>            
        </>
      )
    }