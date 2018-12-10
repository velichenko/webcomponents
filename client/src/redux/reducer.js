import {combineReducers} from "redux";
import todos from './reducers/todos';
import progress from './reducers/course-progress';

export default combineReducers({
    todos,
    progress
});
