import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Investments } from './investments/Investments';
import { Commitments } from './commitments/Commitments';
import reportWebVitals from './reportWebVitals';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (<Investments />),
  },
  {
    path: "commitments/:name",
    element: <Commitments />,
  },
]);


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <header className="App-header">
      <a href="/"><h1>Preqin user app</h1></a>
    </header>
    <main className="App">
      <RouterProvider router={router} />
    </main>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
