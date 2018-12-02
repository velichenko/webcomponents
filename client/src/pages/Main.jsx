import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';

const  Main =()=> (
    <Fragment>
        <Link to="/todos">Todos</Link>

        <Link to="/leave-request">LeaveRequest</Link>
    </Fragment>
);

export default Main;
