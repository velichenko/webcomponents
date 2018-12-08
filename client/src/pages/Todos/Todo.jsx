import React, {Fragment} from 'react';
import Input from "../../components/Input";
import {connect} from "react-redux";
import {editTodoField, removeTodo, updateTodo} from "../../redux/reducers/todos";
import checker from "./validator";

const connector = connect(
    null,
    dispatch => ({
        removeTodo: dispatch(removeTodo),
        editTodoField: dispatch(editTodoField),
        updateTodo: dispatch(updateTodo)
    })
);

const Todo = props => {
    const {_id, isEditing, title, errors} = props.todo;
    const validator = () => {
        const {errors} = checker({title});

        return props.editTodoField(_id, 'errors', errors);
    };
    const saveHandler = e => {
        e.preventDefault();

        const {errors, isValid} = checker({title});

        if (!isValid) {
            return props.editTodoField(_id, 'errors', errors);
        }

        return props.updateTodo(_id, title);
    };

    return (
        <div>
            {
                isEditing ?
                    <Fragment>
                        <Input
                            value={title}
                            onChange={value => props.editTodoField(_id, 'title', value)}
                            onBlur={validator}
                            error={errors.title}
                        />

                        <button onClick={saveHandler}>
                            Сохранить
                        </button>
                    </Fragment>
                    :
                    <Fragment>
                        {title}

                        <button
                            onClick={() => props.editTodoField(_id, 'isEditing', !isEditing)}
                        >
                            Изменить
                        </button>
                    </Fragment>
            }

            <button onClick={() => props.removeTodo(_id)}>Удалить</button>
        </div>
    );
};

export default connector(Todo);
