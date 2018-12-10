import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {
    addProgressPerDay,
    changeCourseField,
    courseProgressRequest,
    getCourseProgressField,
    getCourseProgressList,
    getCourseProgressLoader
} from "../../redux/reducers/course-progress";
import Input from "../../components/Input";
import Loader from "../../components/Loader";
import LineChart from "../../components/LineChart";

const connector = connect(
    state => ({
        count: getCourseProgressField('count')(state),
        date: getCourseProgressField('date')(state),
        isFetching: getCourseProgressLoader(state),
        progress: getCourseProgressList(state),
    }),
    dispatch => ({
        courseProgressRequest: dispatch(courseProgressRequest),
        changeCourseField: dispatch(changeCourseField),
        addProgressPerDay: dispatch(addProgressPerDay)
    }),
);

class CourseProgress extends Component {
    componentDidMount() {
        this.props.courseProgressRequest();
    }

    render() {
        const {count, date, isFetching, progress} = this.props;
        return (
            <Fragment>
                <form onSubmit={this.submitHandler}>
                    <Input
                        label='Количество заданий:'
                        type='number'
                        value={count}
                        onChange={value => this.props.changeCourseField('count', value)}
                    />

                    <Input
                        label='Дата выполнения:'
                        type='date'
                        value={date}
                        onChange={value => this.props.changeCourseField('date', value)}
                    />

                    <button>Добавить</button>
                </form>

                {isFetching && <Loader/>}

                <LineChart
                    data={progress}
                    axis={{
                        x: 'date',
                        y: 'count'
                    }}
                />
            </Fragment>
        );
    }

    submitHandler = e => {
        e.preventDefault();

        return this.props.addProgressPerDay();
    }
}

export default connector(CourseProgress);
