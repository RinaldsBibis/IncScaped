import React from 'react'
import Button from '../button/button.component';
import './coment.styles.scss';
import axiosClient from '../../axios';


export default function ComentComponent({coment, handleUpdateComent}) {
  const curentUser = localStorage.getItem('USER');
  let author = ""
  if(curentUser){
    author =  JSON.parse(curentUser).username;   
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
      <p className="comment-header">{coment.author} {coment.created_at} Rating: {coment.rating}</p>    
      <h3 className='comment-text'>{coment.comment_text}</h3>
      {author == coment.author ? (<Button onClick={handleDelete}>Delete</Button>):null}
    </div>
    </>    
  )
}
