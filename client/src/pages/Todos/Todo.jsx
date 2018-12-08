import React, {Component, Fragment} from 'react';
import Input from "../../components/Input";
import {connect} from "react-redux";
import {editTodoField, removeTodo, updateTodo} from "../../redux/reducers/todos";
import validator from "./validator";

const connector = connect(
    null,
    dispatch => ({
        removeTodo: dispatch(removeTodo),
        editTodoField: dispatch(editTodoField),
        updateTodo: dispatch(updateTodo)
    }),
    null
);

class Todo extends Component {
    render() {
        const {_id, isEditing, title, errors} = this.props.todo;
        return (
            <div>
                {
                    isEditing ?
                        <Fragment>
                            <Input
                                value={title}
                                onChange={value => this.props.editTodoField(_id, 'title', value)}
                                onBlur={this.validator}
                                error={errors.title}
                            />

                            <button onClick={this.saveHandler}>
                                Сохранить
                            </button>
                        </Fragment>
                        :
                        <Fragment>
                            {title}

                            <button
                                onClick={() => this.props.editTodoField(_id, 'isEditing', !isEditing)}
                            >
                                Изменить
                            </button>
                        </Fragment>
                }

                <button onClick={() => this.props.removeTodo(_id)}>Удалить</button>
            </div>
        );
    }

    validator = () => {
        const {title, _id} = this.props.todo;
        const {errors} = validator({title});

        return this.props.editTodoField(_id, 'errors', errors);
    };

    saveHandler = e => {
        e.preventDefault();

        const {title, _id} = this.props.todo;
        const {errors, isValid} = validator({title});

        if (!isValid) {
            return this.props.editTodoField(_id, 'errors', errors);
        }

        return this.props.updateTodo(_id, title);
    }
}

export default connector(Todo);
