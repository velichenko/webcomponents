import React, {Component} from 'react';

const styles = {
    label: {
        position: 'relative',
        display: 'flex'
    },
    input: {
        padding: '5px 10px',
        marginBottom: '15px',
    },
    inputError: {
        padding: '5px 10px',
        marginBottom: '15px',
        borderColor: 'red'
    },
    error: {
        fontSize: '14px',
        color: 'red',
        position: 'absolute',
        bottom: 0,
        left: 0,
        margin: 0
    }
};

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
        const {label, error} = this.props;

        return (
            <label style={styles.label}>
                {label && <p>{label}</p>}

                <input
                    {...this.props}
                    style={error ? styles.inputError : styles.input}
                    onChange={this.changeHandler}
                />

                {error && <p style={styles.error}>{error}</p>}
            </label>
        );
    }

    changeHandler = (e) => this.props.onChange(e.target.value);
}

export default Input;
