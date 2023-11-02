import React from "react";
import "./storie.styles.scss";;
import { Link } from "react-router-dom";


export default function StorieComponent({storie, buttons}) {
    const fragment = storie.content.substring(0, 300);
  const curentUser = localStorage.getItem('USER');
  let admin = 0
  if(curentUser){
    admin =  JSON.parse(curentUser).role;
  }
  
    return (
      <div className="storie-body-container">
        <Link to={`/story/${storie.id}`}>
            <div className="storie-details">
                <p>{storie.created_at} Veidoja: {storie.author}</p>
                <p>Zvaigznītes: {storie.rating}</p>
                <div className="title-container">
                    <h4>{storie.title}</h4>
                </div>                
                <p>{fragment}...</p>                
            </div>
        </Link>
         {admin == 1 ? (
          buttons
          ):(null)}
          
    </div>
    )
  }

