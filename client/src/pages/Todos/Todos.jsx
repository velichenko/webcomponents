import React, {Component, Fragment} from 'react';
import Input from "../../components/Input";
import validator from './validator';

class Todos extends Component {
    state = {
        title: '',
        isFetching: true,
        todos: [],
        errors: {}
    };

    componentDidMount() {
        fetch('/api/todos')
            .then(res => res.json())
            .then(todos => this.setState({todos, isFetching: false}))
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

                {todos && todos.length && !isFetching ?
                    todos.map(todo =>
                        <div key={todo._id}>
                            {todo.title}

                            (дата: {Date(todo.date)})

                            <button onClick={this.removeHandler(todo._id)}>Удалить</button>
                        </div>
                    )
                    :
                    <div>Загрузка...</div>
                }
            </Fragment>
        );
    }

    validator = () => {
        const {errors} = validator({title: this.state.title});

        this.setState(state => ({...state, errors}));
    };

    changeHandler = field => value => this.setState(state => ({...state, [field]: value}), () => this.validator());

    removeHandler = id => () => {
        fetch(`/api/todos/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(res => res.json())
            .then(() => this.setState(state => ({...state, todos: state.todos.filter(todo => todo._id !== id)})))
            .catch(() => console.log('failure'));
    };

    submitHandler = e => {
        e.preventDefault();

        const {errors, isValid} = validator({title: this.state.title});

        if (!isValid) {
            return this.setState(state => ({...state, errors}));
        }

        fetch('/api/todos', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title: this.state.title})
            }
        )
            .then(res => res.status !== 200 ? new Error() : res)
            .then(res => res.json())
            .then(todo => this.setState(state => ({...state, todos: [...state.todos, todo], title: ''})))
            .catch(() => console.log('failure'));
    };
}

export default Todos;
