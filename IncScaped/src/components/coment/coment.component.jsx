import React from 'react'
import Button from '../button/button.component';
import './coment.styles.scss';
import axiosClient from '../../axios';
import StarRating from '../star-rating/star-rating.component';

export default function ComentComponent({coment, handleUpdateComent}) {
  const curentUser = localStorage.getItem('USER');
  let author = "",admin=0;
  if(curentUser){
    author =  JSON.parse(curentUser).username;  
    admin =  JSON.parse(curentUser).role; 
  }
  const handleDelete = (user) => {
    axiosClient.delete(`/comments/${coment.id}`)
    .then(({data})=>{
      handleUpdateComent();
      console.log(data)
    }).catch((error)=>{
        console.log(error);
    });
  };
  return (
    <>
    <div className='comment-container'>
      <p className="comment-header">{coment.author} {coment.created_at} </p>    
      {<StarRating rating={coment.rating}/>}
      <h3 className='comment-text'>{coment.comment_text}</h3>
      {author == coment.author || admin == 1 ? (<Button onClick={handleDelete}>Dzēst</Button>):null}
    </div>
    </>    
  )
}
