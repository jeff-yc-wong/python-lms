// App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TopMenu from '../../components/TopMenu';
import ModulePage from './ModuleList'
// Import your other components

const Dashboard = () => {
  return <div>Dashboard Page</div>;
}

const Modules = () => {
  return <div>Modules Page</div>;
}

// Define other components and their corresponding routes

const App = () => {
  return (
    <Router>
      <TopMenu />
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/modules" component={ModulePage} />
        {/* Add routes for other pages */}
      </Switch>
    </Router>
  );
}

export default App;
