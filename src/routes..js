  
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';

//   <Route path='/Home/:year/:launch/:land' component={Home}/>


const MainRoutes = () => (
    <Switch>
      {/* <Route path='/' component={Home}/> */}
      <Route path='/home/:year/:launch/:land' component={Home}/> 
      {/* <Route path='/home' component={Home}/> */}
      {/* <Route  path={["/", '/home/:year/:launch/:land']}  component={Home}/>  */}
    </Switch>
)

export default MainRoutes;