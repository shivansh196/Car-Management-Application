import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import CarList from './components/Car/CarList';

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/cars" component={CarList} />
          {/* Add other routes for CarForm, CarDetail */}
        </Switch>
      </div>
    </Router>
  );
};

export default App;
