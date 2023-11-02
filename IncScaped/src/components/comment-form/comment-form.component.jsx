import React from 'react'
import { useState} from 'react'
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { UserContext } from '../../context/user.context';
import { useContext } from 'react';
import axiosClient from '../../axios';
import './comment-form.styles.scss'
import StarRating from '../star-rating/star-rating.component';

const defaultFormFields = {
    
    comment_text:'',
    rating:'',
    stories_id:'',
}


export default function CommentForm({story_id, fetchData}) {
    const [rating2, setRating] = useState(1);
    const [formFields,setFormFields]=useState(defaultFormFields);
    const {comment_text, rating} = formFields;
    const handleRatingChange = (newRating) => {
        setRating(newRating);
        setFormFields({ ...formFields, rating: newRating, stories_id: story_id});
      };
    
    const handleSubmit = async (event) =>{
        event.preventDefault(); 
        axiosClient.post('/comment', formFields)
        //
        .then(({data})=>{
            console.log(data)
            fetchData();
        })
        .catch((error)=>{
            console.log(error);
        });  
          
    }
    const handleChanges = (event) =>{
        const {name,value} = event.target;
        setFormFields({...formFields,[name]:value, stories_id: story_id})        
    }
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
    <div className='comment-form-container'>
        <h2>Rate and comment</h2>
        <span>Select a rating and write a short review</span>
        <form onSubmit={handleSubmit} className='form'>
            <StarRating rating={rating} onRatingChange={handleRatingChange}/>
            <textarea
            className='Comment'
            id="Comment"
            name="comment_text"
            value={comment_text}
            onChange={handleChanges}
            onKeyDown={handleKeyDown}
            required
          />
  
            <div className='buttons-container'>
                <Button type='submit'>Comment</Button>
            </div>            
        </form>
    </div>
  )
}