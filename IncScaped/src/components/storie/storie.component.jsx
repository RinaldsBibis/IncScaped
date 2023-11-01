import React from "react";
import "./storie.styles.scss";;
import { Link } from "react-router-dom";

export default function StorieComponent({ storie, buttons }) {
  const fragment = storie.content.substring(0, 100);
  const admin = localStorage.getItem('ROLE');
  return (
    <div className="storie-body-container">
    <Link  to={`/story/${storie.id}`}>

      <div className="storie-details">        
          <div className="storie-details">
                <p>{storie.created_at} Author: {storie.author}</p>
                <p>Rating: {storie.rating}</p>
                <p>Title: {storie.title}</p>
                <p>Fragment: {fragment}</p>                
            </div>        
      </div>
    </Link>
    {admin == 1 ? (
    buttons
    ):(null)}
    </div>
  );
}
