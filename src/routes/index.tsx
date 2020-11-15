import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignIn from '../Pages/SignIn';

const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/signup" exact component={SignIn} />
    </Switch>
);

export default Routes;
