import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl'

const controls=[
    {label:'Salad',type:'salad'},
    {label:'Meat',type:'meat'},
    {label:'cheese',type:'cheese'},
    {label:'Bacon',type:'bacon'}
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p> <strong> {props.price.toFixed(2)} </strong> </p>
        {controls.map(control=>(
            <BuildControl
             key={control.label}
             label={control.label}
             added={()=>props.ingredientAdded(control.type)}
             removed={()=>props.ingredientRemoved(control.type)}
             disable={props.disabled[control.type]}
             />
        ))}
        <button 
        className={classes.OrderButton} 
        disabled={!props.purchaisable}
        onClick={props.ordered}
        > {props.isAuth ? 'Order Now':'Must Sign In First'}  </button>
    </div>
);

export default buildControls;