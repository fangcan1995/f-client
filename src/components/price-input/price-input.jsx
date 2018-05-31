import React,{ Component } from "react";
import { Input } from 'antd';
export default class PriceInput extends Component {
    constructor(props) {
        super(props);
        const value = props.value || {};
        this.state = {
            number: value.number || 0,
        };
    }
    componentWillReceiveProps(nextProps) {
        // Should be a controlled component.
        if ('value' in nextProps) {
            const value = nextProps.value;
            this.setState(value);
        }
    }
    handleNumberChange = (e) => {
        const number = parseInt(e.target.value || 0, 10);
        if (isNaN(number)) {
            return;
        }
        if (!('value' in this.props)) {
            this.setState({ number });
        }
        this.triggerChange({ number });
    }
    triggerChange = (changedValue) => {
        // Should provide an event to pass value to Form.
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(Object.assign({}, this.state, changedValue));
        }
    }
    render() {
        const { size } = this.props;
        const state = this.state;
        return (
            <span>
        <Input
            type="text"
            size={size}
            value={state.number}
            onChange={this.handleNumberChange}
            style={{ width: '100%', marginRight: '3%' }}
        />
      </span>
        );
    }
}