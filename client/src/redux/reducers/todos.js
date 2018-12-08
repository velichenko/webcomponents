import * as types from '../actions/todos';
import {client} from "../../api";

const initialState = {
    title: '',
    isFetching: false,
    data: [],
    errors: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.TODOS_REQUEST:
            return {...state, isFetching: true};
        case types.SAVE_TODOS:
            return {...state, ...action.payload};
        case types.TODOS_FAILURE:
            return {...state, isFetching: false};
        case types.CHANGE_TODOS_FIELD:
            return {...state, [action.field]: action.value};
        default:
            return state;
    }
}

export const changeTodosField = dispatch => (field, value) => dispatch({
    type: types.CHANGE_TODOS_FIELD,
    field,
    value
});

export const editTodoField = (dispatch, getState) => (id, field, value) => dispatch({
    type: types.SAVE_TODOS,
    payload: {
        data: getState().todos.data.map(todo => {
            if (todo._id === id) {
                return {...todo, [field]: value};
            }

            return todo;
        })
    }
});

export const updateTodo = (dispatch, getState) => async (id, title) => {
    dispatch({type: types.UPDATE_TODO_REQUEST});

    try {
        const newTodo = await client(`todos/${id}`, 'PUT', {body: JSON.stringify({title})});

        dispatch({
            type: types.SAVE_TODOS,
            payload: {
                data: getState().todos.data.map(todo => {
                    if (todo._id === id) return {...newTodo, isEditing: false, errors: {}};

                    return todo;
                })
            }
        })
    } catch (e) {
        dispatch({type: types.UPDATE_TODO_FAILURE});
    }
};

export const getTodos = dispatch => async () => {
    dispatch({type: types.TODOS_REQUEST});

    try {
        const data = await client('todos');

        dispatch({
            type: types.SAVE_TODOS,
            payload: {
                data: data.map(todo => ({...todo, isEditing: false, errors: {}})),
                isFetching: false
            }
        });
    } catch (e) {
        dispatch({type: types.TODOS_FAILURE});
    }
};

export const addTodo = (dispatch, getState) => async () => {
    dispatch({type: types.ADD_TODO_REQUEST});

    try {
        const {data, title} = getState().todos;
        const todo = await client('todos', 'POST', {body: JSON.stringify({title})});

        dispatch({
            type: types.SAVE_TODOS,
            payload: {
                data: [...data, todo],
                title: ''
            }
        });
    } catch (e) {
        dispatch({type: types.ADD_TODO_FAILURE});
    }
};

export const removeTodo = (dispatch, getState) => async id => {
    dispatch({type: types.REMOVE_TODO_REQUEST});

    try {
        const {data} = getState().todos;
        await client(`todos/${id}`, 'DELETE');

        dispatch({
            type: types.SAVE_TODOS,
            payload: {
                data: data.filter(todo => todo._id !== id)
            }
        });
    } catch (e) {
        dispatch({type: types.REMOVE_TODO_FAILURE});
    }
};

export const getAddTodoValue = state => state.todos.title;
export const getTodosLoader = state => state.todos.isFetching;
export const getTodosList = state => state.todos.data;
export const getTodosErrors = state => state.todos.errors;
