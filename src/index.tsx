import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './viess/App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ここを見ながら自分で実装して見る？
// https://stackoverflow.com/questions/69953377/react-router-v6-how-to-use-navigate-redirection-in-axios-interceptor/70012117#70012117

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
