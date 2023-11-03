import React from 'react'
import './error-message.styles.scss'

export default function ErrorMessage({message}) {
  return (
    <div className="error-message">
        <span className="error-text">{message}</span>
    </div>
  )
}
