import React from 'react'
import Button from '../../UI/Button/Button'
import Burger from '../../Burger/Burger'
import classes from './CheckoutSummary.css'

const CheckoutSummary=(props)=>{
    return(
        <div className={classes.CheckoutSummary}>
            <h1>hope it tastes well</h1>
            <div style={{width:'100%',margin:'auto'}} >
               <Burger ingredients={props.ingredients} />
            </div>
            <Button btnType="Danger" clicked={props.cancelHandler} >CANCEL</Button>
                <Button btnType="Success" clicked={props.continueHandler}  >CONTINUE</Button>
        </div>
    )
}

export default CheckoutSummary