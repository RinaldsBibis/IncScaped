import React from 'react'
import './coment.styles.scss';


export default function ComentComponent({coment}) {
  return (
    <>
    <div className='comment-container'>
      <p className="comment-header">{coment.author} {coment.created_at} Rating: {coment.rating}</p>    
      <h3 className='comment-text'>{coment.comment_text}</h3>
    </div>
    </>    
  )
}
