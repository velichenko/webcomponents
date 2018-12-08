import React, {Component, Fragment} from 'react';
import Input from "../../components/Input";
import validator from './validator';
import Todo from "./Todo";
import {client} from "../../api";

class Todos extends Component {
    state = {
        title: '',
        isFetching: true,
        todos: [],
        errors: {}
    };

    componentDidMount() {
        client('todos')
            .then(todos => this.setState(state => ({...state, todos, isFetching: false})));

        // fetch('/api/todos')
        //     .then(res => res.json())
        //     .then(todos => this.setState({todos, isFetching: false}));
    }

    render() {
        const {isFetching, todos, title, errors} = this.state;

        return (
            <Fragment>
                <form onSubmit={this.submitHandler}>
                    <Input
                        placeholder="ToDo"
                        value={title}
                        onChange={this.changeHandler('title')}
                        onBlur={this.validator}
                        error={errors.title}
                    />

                    <button>Добавить</button>
                </form>

                {isFetching && <div>Загрузка...</div>}

                {
                    todos && todos.length ? todos.map(todo =>
                            <Todo
                                key={todo._id}
                                todo={todo}
                                removeHandler={this.removeHandler}
                            />
                        )
                        :
                        <div>Список пуст</div>
                }
            </Fragment>
        );
    }

    validator = () => {
        const {errors} = validator({title: this.state.title});

        this.setState(state => ({...state, errors}));
    };

    changeHandler = field => value => this.setState(
        state => ({
            ...state,
            [field]: value
        }),
        () => this.validator()
    );

    removeHandler = id => this.setState(
        state => ({
            ...state,
            todos: state.todos.filter(todo => todo._id !== id)
        })
    );

    submitHandler = async e => {
        e.preventDefault();

        const {errors, isValid} = validator({title: this.state.title});

        if (!isValid) {
            return this.setState(state => ({...state, errors}));
        }

        const todo = await client(
            'todos',
            'POST',
            {body: JSON.stringify({title: this.state.title})}
        );

        this.setState(state => ({...state, todos: [...state.todos, todo], title: ''}));
    };
}

export default Todos;
