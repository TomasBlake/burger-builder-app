import React from 'react';
import classes from './Input.css';

const input = (props) => {
console.log('[input]', props)    
    let inputElement = null;
    const inputClasses = [classes.inputElement, ];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch ( props.elementType ) {
        case ( 'input' ):
        inputElement = <input 
            className={inputClasses.join(' ')} 
            {...props.elementConfig} 
            value={props.value}
            onChange={props.changed} />
            break;
        case ( 'textarea' ):
        inputElement = <textrea 
            className={inputClasses.join(' ')} 
            {...props.elementConfig} 
            value={props.value}
            onChange={props.changed} />
            break;
        case ( 'select' ):
        inputElement = <select
            className={inputClasses.join(' ')}
            value={props.value}
            onChange={props.changed}> 
                {props.elementConfig.options.map(op => (
                    <option 
                        key={op.value}
                        value={op.value}>{op.displayValue}</option>
                ))}
            </select>
            break;
        default:
        inputElement = <input 
            className={inputClasses} 
            {...props.elementConfig} 
            value={props.value} />
            break;
    }
        
        let validationError = null;
        if (props.invalid && props.touched) {
            validationError = <p className={classes.ErrorMessage}>Please entry valid {props.elementConfig.placeholder}</p>
        }
        
        return (
            <div className={classes.Input}>
                <label className={classes.Label}>{props.label}</label>
                {inputElement}
                {validationError}
            </div>
        );
}
    


export default input;