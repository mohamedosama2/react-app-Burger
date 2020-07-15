import React from 'react'
import BurgerIngredients from './Burgeringerdients/BurgerIngredient'
import classes from './Burger.css'

const burger=(props)=>{
    let transformed=Object.keys(props.ingredients)
        .map(igKey=>{
            return [...Array(props.ingredients[igKey])].map((_,i)=>{
                return <BurgerIngredients  key={igKey+i} type={igKey}    />
            })
        })
        .reduce((arr,el)=>{
            return arr.concat(el)
        },[])
        if(transformed.length===0){
            transformed=<p> please enter ingredients </p>
        }
    return(
        <div className={classes.Burger}>
            <BurgerIngredients type={'bread-top'}/>
            {transformed}
            <BurgerIngredients type={'bread-bottom'}/>
        </div>
    )
}
export default burger