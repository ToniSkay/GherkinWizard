import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <>
        <head>
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
            />
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
            />
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            />
        </head>

        <BrowserRouter>
            <App />
        </BrowserRouter>
    </>
);

