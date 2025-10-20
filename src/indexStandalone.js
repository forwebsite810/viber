import React from 'react';
import ReactDOM from 'react-dom/client';
import AppStandalone from './AppStandalone';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppStandalone />
  </React.StrictMode>
);
