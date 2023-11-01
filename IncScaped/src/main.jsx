import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './context/user.context.jsx'
import { IdeaProvider } from './context/storie-idea.context.jsx'
import { StorieProvider } from './context/storie.context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <StorieProvider>
          <IdeaProvider>
            <App />
          </IdeaProvider>
        </StorieProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
