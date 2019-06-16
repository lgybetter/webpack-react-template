import React from "react";
import ReactDOM from 'react-dom';
import App from './app';
console.log(process.env)
if (process.env === 'production') {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(registration => {
          console.log('service-worker registed')
        })
        .catch(error => {
          console.log('service-worker registed error')
        })
    })
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))