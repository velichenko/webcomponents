import React, {Fragment} from 'react';
import {Link, Route} from 'react-router-dom';
import Main from '../pages/Main';
import Registration from "../pages/Registration/Registration";
import Todos from '../pages/Todos/Todos';
import LeaveRequest from '../pages/LeaveRequest';

const App = () => (
    <Fragment>
        <Link to="/">Main</Link>

        <Route path="/" exact component={Main}/>

        <Route path="/registration" exact component={Registration}/>

        <Route path="/todos" exact component={Todos}/>

        <Route path="/leave-request" exact component={LeaveRequest}/>
    </Fragment>
);

export default App;
