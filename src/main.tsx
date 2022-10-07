import React from 'react'
import ReactDOM from 'react-dom/client'
import Dashboard from './components/dashboard/Dashboard';

import "primereact/resources/themes/bootstrap4-dark-purple/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import 'primeflex/primeflex.css';

import "./main.css";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Dashboard />
  </React.StrictMode>
)
