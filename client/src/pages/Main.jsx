import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';

const styles = {
    link: {
        marginLeft: '20px'
    }
};

const Main = () => (
    <Fragment>
        <Link to="/registration" style={styles.link}>Registration</Link>

        <Link to="/todos" style={styles.link}>Todos</Link>

        <Link to="/leave-request" style={styles.link}>LeaveRequest</Link>
    </Fragment>
);

export default Main;
