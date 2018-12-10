import * as types from '../actions/course-progress';
import {client} from "../../api";

const initialState = {
    count: 0,
    date: '',
    finished: 0,
    isFetching: false,
    data: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.SAVE_PROGRESS:
            return {...state, ...action.payload};
        case types.CHANGE_PROGRESS_FIELD:
            return {...state, [action.field]: action.value};
        case types.COURSE_PROGRESS_REQUEST:
            return {...state, isFetching: true};
        case types.COURSE_PROGRESS_FAILURE:
            return {...state, isFetching: false};
        default:
            return state;
    }
}

export const changeCourseField = dispatch => (field, value) => dispatch({
    type: types.CHANGE_PROGRESS_FIELD,
    field,
    value
});

export const courseProgressRequest = dispatch => async () => {
    dispatch({type: types.COURSE_PROGRESS_REQUEST});

    try {
        const data = await client('course');

        dispatch({
            type: types.SAVE_PROGRESS,
            payload: {
                isFetching: false,
                data: data.map(({count, date}) => ({count, date})),
                finished: data.reduce((prev, next) => prev + next.count, 0)
            }
        })
    } catch (e) {
        dispatch({type: types.COURSE_PROGRESS_FAILURE});
    }
};

export const addProgressPerDay = (dispatch, getState) => async () => {
    dispatch({type: types.ADD_PROGRESS_REQUEST});

    try {
        const {data: progress, count, date, finished} = getState().progress;
        const day = await client('course', 'POST', {body: JSON.stringify({count, date})});
        const exist = progress.find(day => day.date === date);

        if (exist) {
            const data = progress.map(item => {
                if (item.date === date) return {...item, count};

                return item
            });

            return dispatch({
                type: types.SAVE_PROGRESS,
                payload: {
                    data,
                    finished: progress.reduce((prev, next) => prev + next.count, 0)
                }
            })
        }

        return dispatch({
            type: types.SAVE_PROGRESS,
            payload: {
                data: [...progress, {count: day.count, date: day.date}],
                finished: finished + day.count
            }
        })
    } catch (e) {
        dispatch({type: types.ADD_PROGRESS_FAILURE});
    }
};

export const getCourseProgressField = field => state => state.progress[field];
export const getCourseProgressLoader = state => state.progress.isFetching;
export const getCourseProgressList = state => state.progress.data;
