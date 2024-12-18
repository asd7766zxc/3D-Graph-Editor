import { createRoot } from 'react-dom/client'
import React, { StrictMode } from "react";
import './index.css';
import App from './App';

createRoot(document.getElementById('root')).render(
   <StrictMode>
      <App />
    </StrictMode>
);
