import React, {Component} from 'react';

class LeaveRequest extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: ''
    };

    render() {
        const {firstName, lastName, email} = this.state;

        return (
            <form onSubmit={this.submitHandler}>
                <label>
                    <input
                        type="text"
                        placeholder="Имя"
                        name="firstName"
                        value={firstName}
                        onChange={e => this.changeHandler(e.target.name, e.target.value)}
                    />
                </label>

                <label>
                    <input
                        type="text"
                        placeholder="Фамилия"
                        name="lastName"
                        value={lastName}
                        onChange={e => this.changeHandler(e.target.name, e.target.value)}
                    />
                </label>

                <label>
                    <input
                        type="text"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={e => this.changeHandler(e.target.name, e.target.value)}
                    />
                </label>

                <button>Отправить</button>
            </form>
        );
    }

    changeHandler = (field, value) => this.setState(state => ({...state, [field]: value}));

    submitHandler = e => {
        e.preventDefault();

        fetch('/api/client/request', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
            }
        )
            .then(() => console.log('success'))
            .catch(() => console.log('failure'));
    };
}

export default LeaveRequest;
