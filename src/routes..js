  
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';

const MainRoutes = () => (
    <Switch>
      <Route path='/' exact component={Home}/>
      <Route path='/home/:year?/:launch?/:land?' component={Home}/> 
    </Switch>
)

export default MainRoutes;
