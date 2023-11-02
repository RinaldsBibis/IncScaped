import React from 'react'
import ComentComponent from '../coment/coment.component'
import "./coment-list.styles.scss";

export default function ComentListComponent({comments,handleUpdateComent}) {
  
  return (
    <div className="comments-container">
      <h2>COMENTS:</h2>
        {comments.map((coment, index) => (
          <ComentComponent key={index} coment={coment} handleUpdateComent={handleUpdateComent} />
        ))}
    </div>
  )
}
