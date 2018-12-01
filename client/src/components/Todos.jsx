import React, {Component} from 'react';

class Todos extends Component {
    state = {
        todos: []
    };

    componentDidMount() {
        fetch('/api/todos')
            .then(res => res.json())
            .then(todos => this.setState({todos}))
    }

    render() {
        const {todos} = this.state;

        return (
            <div>
                {todos.map(todo => <p key={todo.id}>{todo.title}</p>)}
            </div>
        );
    }
}

export default Todos;
