import { createRoot } from 'react-dom/client'
import React, { StrictMode } from "react";
import { RecoilRoot } from 'recoil';
import './index.css';
import App from './App';

createRoot(document.getElementById('root')).render(
   <StrictMode>
      <RecoilRoot>
            <App />
      </RecoilRoot>
    </StrictMode>
);
