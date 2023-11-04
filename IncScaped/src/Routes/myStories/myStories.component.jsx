import React, { useContext, useEffect, useState } from 'react'
import axiosClient from '../../axios';
import SearchInputComponent from '../../components/search-field/search-field.component';
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
      const [filter, setFilter] = useState("");

      const handleFilterChange = (event) => {
        const { value } = event.target;
        setFilter(value);
    
      }
      const filteredStories = myStories.filter((story) =>
        story.author.toLowerCase().includes(filter.toLowerCase()) ||
        story.prompt.toLowerCase().includes(filter.toLowerCase()) ||
        story.title.toLowerCase().includes(filter.toLowerCase())
      );
  return (
    <>
      <div className='page-container'> 
        <div className="header-container">
          <SearchInputComponent placeholder={"Meklēt"} value={filter} onChange={handleFilterChange} name="filter" />  
        </div>
      </div>
      <StoriesListComponent  stories={filteredStories} fetchData={fetchData}/>
    </>
  )
}
