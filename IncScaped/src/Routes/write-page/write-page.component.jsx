import React from 'react'
import "./write-page.styles.scss"
import { useEffect } from 'react';
import axiosClient from '../../axios';
import { useState } from 'react';
import Button from '../../components/button/button.component';
import { useNavigate } from "react-router-dom";
import ErrorMessage from '../../components/error-message/error-message.component';

export default function WritePageComponent() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage]=useState("")
  const [prompt, setPrompt] = useState({})
  const [formData, setFormData] = useState({
    prompt_id: '',
    title: '',
    content: '',
  });
  const handleTitleChange = (e) => {
    setFormData({
      ...formData,
      title: e.target.value,
    });
  };

  const handleStoryTextChange = (e) => {    
    setFormData({
      ...formData,
      content: e.target.value,
    });
  };  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get(`/latest_prompt`);
        setPrompt(response.data)
        setFormData({
          ...formData,
          prompt_id: response.data.id,
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleStorySubmit = async (e) => {
    e.preventDefault();   
    setErrorMessage("");
    axiosClient.post('/story', formData)
        .then(({data})=>{
          console.log(data)     
          navigate("/");     
        })
        .catch(({response})=>{
          if (response.data.message.includes('stories_prompt_id_user_id_unique')) {
            setErrorMessage("You have already created a story today");
          }else{
            setErrorMessage(response.data.message);
          }            
        });          
  };

  //tab
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault(); // Prevent the default tab behavior
      const input = e.target;
      const selectionStart = input.selectionStart;
      const selectionEnd = input.selectionEnd;
      const value = input.value;
      const newValue =
        value.substring(0, selectionStart) +
        '\t' + value.substring(selectionEnd);
      input.value = newValue;
      input.selectionStart = input.selectionEnd = selectionStart + 1;
    };
  }

  return (
    <div className="write-page-container">
      {errorMessage&&<ErrorMessage message={errorMessage}/>}
      <h1>Write Your Story about {prompt.prompt_text}</h1>
      <div className="form-container">      
        <form onSubmit={handleStorySubmit}>
          <input
            className='write-title'
            type="text"
            id="title"
            value={formData.title}
            onChange={handleTitleChange}
            required
          />
          <textarea
            className='storyText'
            id="storyText"
            value={formData.content}
            onChange={handleStoryTextChange}
            onKeyDown={handleKeyDown}
            required
          />
          <Button type='submit'>Submit Story</Button>          
        </form>        
      </div>
    </div>
  )
}
