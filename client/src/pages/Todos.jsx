import React, {Component} from 'react';
import Input from "../components/Input";

class Todos extends Component {
    state = {
        title: '',
        todos: []
    };

    componentDidMount() {
        fetch('/api/todos')
            .then(res => res.json())
            .then(todos => this.setState({todos}))
    }

    render() {
        const {todos, title} = this.state;

        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <Input
                        placeholder="ToDo"
                        value={title}
                        onChange={this.changeHandler('title')}
                    />

                    <button>Добавить</button>
                </form>

                {todos.map(todo => <p key={todo._id}>{todo.title}</p>)}
            </div>
        );
    }

    changeHandler = field => value => this.setState(state => ({...state, [field]: value}));

    submitHandler = e => {
        e.preventDefault();

        fetch('/api/todos', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title: this.state.title})
            }
        )
            .then(res => res.json())
            .then(todo => this.setState(state => ({...state, todos: [...state.todos, todo], title: ''})))
            .catch(() => console.log('failure'));
    };
}

export default Todos;