import React, {Component} from 'react'
import Aux from '../../../hoc/Aux'
import Button from '../../UI/Button/Button'

class OrderModel extends Component{


    render(){
        const ingredientsSummary= Object.keys(this.props.ingredients)
        .map(igKey=>{
            return(
                <li key={igKey}> <span> {igKey} </span> : {this.props.ingredients[igKey]}  </li>
            )
        })
        return(
            <Aux>
                <h2> Your Orders </h2>
                <p>  your delicious ingredients are  </p>
                <ul>
                    {ingredientsSummary}
                </ul>
                <p> <strong> total Price is: {this.props.price.toFixed(2)} </strong> </p>
        
                <Button btnType='Success' clicked={this.props.continue} > Continue </Button>
                <Button  btnType='Danger'clicked={this.props.cancel}> Cancel </Button>
            </Aux>
            )
    }
}
export default OrderModel