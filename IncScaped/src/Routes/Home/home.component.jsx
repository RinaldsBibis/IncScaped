import React, { useContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import axiosClient from '../../axios';
import SearchInputComponent from '../../components/search-field/search-field.component';
import StoriesListComponent from '../../components/stories-list/stories-list.component'
import { StorieContext } from '../../context/storie.context';

export default function HomeCmponent() {
      const {stories, setStorie} = useContext(StorieContext);
      const fetchData = async () => {
        axiosClient.get('/stoiesDesc')
        .then(({data})=>{
          setStorie(data)
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
      const handleSortChange = (event) => {
        let endpoint = '';
    
      switch (event.target.value) {
        case 'lowest':
          endpoint = '/stoiesAsc';
          break;
        case 'highest':
          endpoint = '/stoiesDesc';
          break;
        case 'todaysBest':
          endpoint = '/stoiesToday';
          break;
        default:
      }
      if (endpoint) {
        axiosClient.get(endpoint)
          .then(({ data }) => {
            setStorie(data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      }; 
      const filteredStories = stories.filter((story) => {
        return (
          story.author.toLowerCase().includes(filter.toLowerCase()) ||
          story.prompt.toLowerCase().includes(filter.toLowerCase()) ||
          story.title.toLowerCase().includes(filter.toLowerCase())
        );
      });
  
      return (
       <>
          <Outlet/>
          <div className='stories-container'> 
            <div className="header-container">              
              <SearchInputComponent placeholder={"Meklēt"} value={filter} onChange={handleFilterChange} name="filter" />      
              <select className="sortDropdown" onChange={handleSortChange}>
                <option value="highest">Visaugstāk novērtētie</option>
                <option value="todaysBest">Šodienas labākie</option>       
                <option value="lowest">Visszemāk novērtētie</option>
              </select> 
            </div>
          </div>
          <StoriesListComponent stories={filteredStories} fetchData={fetchData}/>            
        </>
      )
    }