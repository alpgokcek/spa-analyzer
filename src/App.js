import React from 'react';
import { Router } from 'react-router-dom';

import { history } from 'History'
// App Routes
import Routes from './routes';

// Vendor dependencies
import "./Vendor";
// Application Styles
import 'Styles/bootstrap.scss';
import 'Styles/app.scss'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const App = () => {
  /* global PUBLIC_URL */
  const basename = '/';
  return (
    <Router history={history}>
        <Routes />
    </Router>
  );


}

export default App;
