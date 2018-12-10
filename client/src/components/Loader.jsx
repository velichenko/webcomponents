import React from 'react';

const Loader = (props) => (
    <div>{props.title}</div>
);

Loader.defaultProps = {
    title: 'Загрузка...'
};

export default Loader;
