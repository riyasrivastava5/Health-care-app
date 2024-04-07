import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <Auth0Provider 
    domain="dev-b0hcn7dgdadesmqg.us.auth0.com"
    clientId="MmQzN8c2DFAQV7xXAcg8F2tGXvgWp8Ax"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
    >
    
      <App />
   
   
    </Auth0Provider>
   
)
