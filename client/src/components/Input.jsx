import React, {Component} from 'react';

class Input extends Component {
    static defaultProps = {
        label: '',
        type: 'text',
        placeholder: '',
        value: '',
        onChange: () => ({}),
        onBlur: () => ({}),
        error: '',
    };

    render() {
        const {label, type, placeholder, value, onBlur, error} = this.props;

        return (
            <label>
                <p>{label}</p>

                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={this.changeHandler}
                    onBlur={onBlur}
                />

                <p>{error}</p>
            </label>
        );
    }

    changeHandler = (e) => this.props.onChange(e.target.value);
}

export default Input;
