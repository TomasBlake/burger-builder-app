import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
]

const buildControls = (props) => ( 
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong> $</p>
        {controls.map(control => (
        <BuildControl 
            key={control.label} 
            label={control.label} 
            added={() => props.ingredientAdded(control.type)}
            detracted={() => props.ingredientDetracted(control.type)}
            disabled={props.disabled[control.type]} />
        ))}
        {console.log('[Props of buildControls component]', props)}  
            <button 
            className={classes.OrderButton}
            disabled={props.isAuth && !props.purchasable}
            onClick={props.ordered}
            >{props.isAuth ? 'ORDER NOW' : 'SIGNIN TO CONTINUE'}</button> 
    </div>
);

export default buildControls;