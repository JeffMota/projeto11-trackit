import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalContext from './contexts/GlobalContext';
import GlobalStyle from './GlobalStyle';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <GlobalStyle />
      <App />
  </React.StrictMode>
);
