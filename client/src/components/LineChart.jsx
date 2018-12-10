import React from 'react';
import {LineChart as Chart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

const LineChart = (props) => {
    return (
        <Chart
            width={600}
            height={300}
            data={props.data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
            <XAxis dataKey={props.axis.x}/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Legend/>
            <Line type="monotone" dataKey={props.axis.y} stroke="#8884d8" activeDot={{r: 8}}/>
        </Chart>
    );
};

export default LineChart;
