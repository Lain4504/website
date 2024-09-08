import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie'; 
import ShopContextProvider from './context/ShopContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CookiesProvider> 
        <ShopContextProvider>
          <App />
        </ShopContextProvider>
      </CookiesProvider>
    </BrowserRouter>
  </StrictMode>,
);
