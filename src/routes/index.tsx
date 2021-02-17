import React from 'react';
import { Switch } from 'react-router-dom';
import SignIn from '../Pages/SignIn';
import SignUp from '../Pages/SignUp';
import Route from './Route';
import Dashboard from '../Pages/Dashboard';
import ForgotPassword from '../Pages/ForgotPassword';

const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/dashboard" component={Dashboard} isPrivate />
        <Route path="/forgot-password" component={ForgotPassword} />
    </Switch>
);

export default Routes;
