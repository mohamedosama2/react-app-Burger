import React from 'react'
import classes from './Order.css' 

const Order =(props)=>{
    const ingredients=[];
    for(let ingredient in props.ingredients){
        ingredients.push({
            name:ingredient,
            amount:props.ingredients[ingredient]
        })
    }
    const output=ingredients.map(ig=>{
        return <span key={ig.name} style={{
            textTransform:'capitalize',
            display:'inline-block',
            border:'3px solid #ccc',
            padding:'3px',
            margin:'0 8px'
        }}> {ig.name} ({ig.amount})  </span>
    })
    return(
        <div className={classes.Order}>
            <p> Ingredients is: {output} </p>
            <p> totla Price is :<strong> {props.price} USD </strong> </p>
        </div>
    )
}
export default Order