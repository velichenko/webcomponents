import React, {Component, Fragment} from 'react';
import Input from "../../components/Input";
import {client} from "../../api";

class Todo extends Component {
    state = {
        isEditing: false
    };

    render() {
        const {todo} = this.props;
        const {isEditing} = this.state;
        return (
            <div>
                {
                    isEditing ?
                        <Fragment>
                            <Input
                                value={todo.title}
                            />

                            <button onClick={() => this.setState(state => ({...state, isEditing: !state.isEditing}))}>
                                Сохранить
                            </button>
                        </Fragment>
                        :
                        <Fragment>
                            {todo.title}

                            <button onClick={() => this.setState(state => ({...state, isEditing: !state.isEditing}))}>
                                Изменить
                            </button>
                        </Fragment>
                }

                <button onClick={this.removeHandler(todo._id)}>Удалить</button>
            </div>
        );
    }

    removeHandler = id => async () => {
        await client(`todos/${id}`, 'DELETE');
        this.props.removeHandler(id)
    };
}

export default Todo;
