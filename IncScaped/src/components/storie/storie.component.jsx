import React from "react";
import "./storie.styles.scss";;
import { Link } from "react-router-dom";
import StarRating from "../star-rating/star-rating.component";


export default function StorieComponent({storie, buttons}) {
    const fragment = storie.content.substring(0, 300);
  const curentUser = localStorage.getItem('USER');
  let admin = 0,author="";
  if(curentUser){
    admin =  JSON.parse(curentUser).role;
    author =  JSON.parse(curentUser).username;
  }
  
    return (
      <div className="storie-body-container">
        <Link to={`/story/${storie.id}`}>
            <div className="storie-details">
                <div className="space-between">
                  <p ><b>Veidoja:</b>  {storie.author}</p>
                  <p ><b>Tēma:</b> {storie.prompt}</p>
                </div>
                
                 <StarRating rating={storie.rating}/>
                <div className="title-container">
                    <h3>{storie.title}</h3>
                </div>                
                <p>{fragment}...</p>                
            </div>            
        </Link>
        {author == storie.author || admin == 1 ? (buttons):null}
          
    </div>
    )
  }

