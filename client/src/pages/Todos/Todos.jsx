import React, {Component, Fragment} from 'react';
import Input from "../../components/Input";
import validator from './validator';
import Todo from "./Todo";
import {connect} from "react-redux";
import {
    addTodo,
    changeTodosField,
    getAddTodoValue,
    getTodos,
    getTodosErrors,
    getTodosList,
    getTodosLoader
} from "../../redux/reducers/todos";

const connector = connect(
    state => ({
        title: getAddTodoValue(state),
        isFetching: getTodosLoader(state),
        todos: getTodosList(state),
        errors: getTodosErrors(state)
    }),
    dispatch => ({
        getTodos: dispatch(getTodos),
        addTodo: dispatch(addTodo),
        changeTodosField: dispatch(changeTodosField),
    })
);

class Todos extends Component {
    componentDidMount() {
        this.props.getTodos();
    }

    render() {
        const {title, isFetching, todos, errors} = this.props;

        return (
            <Fragment>
                <form onSubmit={this.submitHandler}>
                    <Input
                        placeholder="ToDo"
                        value={title}
                        onChange={value => this.props.changeTodosField('title', value)}
                        onBlur={this.validator}
                        error={errors.title}
                    />

                    <button>Добавить</button>
                </form>

                {isFetching && <div>Загрузка...</div>}

                {
                    todos && todos.length ?
                        todos.map(todo =>
                            <Todo
                                key={todo._id}
                                todo={todo}
                            />
                        )
                        :
                        <div>Список пуст</div>
                }
            </Fragment>
        );
    }

    validator = () => {
        const {errors} = validator({title: this.props.title});

        return this.props.changeTodosField('errors', errors);
    };

    submitHandler = e => {
        e.preventDefault();

        const {errors, isValid} = validator({title: this.props.title});

        if (!isValid) {
            return this.props.changeTodosField('errors', errors);
        }

        return this.props.addTodo();
    };
}

export default connector(Todos);
