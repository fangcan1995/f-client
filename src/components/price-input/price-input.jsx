import React,{ Component } from "react";
import { Input } from 'antd';
import { amountExp,amountPointExp } from './../../utils/regExp'
export default class PriceInput extends Component {
    constructor(props) {
        super(props);
        console.log(this.props)
        const value = props.value || {};
        this.state = {
            number: value.number || 0,
        };
    }
    componentWillMount() {
        console.log('翟茹了');
        console.log(this.props);
        /*const number = parseInt(``, 10);
        this.triggerChange({ number });*/
    }
    componentWillReceiveProps(nextProps) {
        // Should be a controlled component.
        if ('value' in nextProps) {
            const value = nextProps.value;
            this.setState(value);
        }
    }
    handleNumberChange = (e) => {
        const isNumber=this.props.isNumber||'true'
        let number;
        if(isNumber=='true'){
             number=e.target.value;
        }else{
             number = parseFloat(e.target.value || 0, 10);
        }
        
        const pointExp = amountExp.test(number)||amountPointExp.test(number)
        if (isNaN(number) || !pointExp ) {
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
            <span >
        <Input
            type="text"
            size={size}
            value={state.number}
            onChange={this.handleNumberChange.bind(this)}
            style={{ width: '100%', marginRight: '3%' }}
            suffix={'元'}
        />
      </span>
        );
    }
}