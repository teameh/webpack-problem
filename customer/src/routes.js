import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Bean from './containers/Bean'
import Cafe from './containers/Cafe'
import DoSearch from './containers/DoSearch'
import Home from './containers/Home'

const routes =
    <Route path="/">
        <IndexRoute component={Home} />
        <Route path="search" component={DoSearch} />
        <Route path="cafes/:cafe" component={Cafe} />
        <Route path="beans/:bean" component={Bean} />
    </Route>
        
export default routes