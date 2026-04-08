import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'
import './styles/index.css' // or whatever your main css file is called

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
