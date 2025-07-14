import { StrictMode } from 'react';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import { routeTree } from './routing/routerTree.js';

const router = createRouter({
  routeTree,
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)