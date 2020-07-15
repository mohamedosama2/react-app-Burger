import React, { Component } from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildConrols from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderModel from '../../components/Burger/OrderModel/OrderModel'
import axios from '../../axios-order'
import Spiner from '../../components/UI/Spiner/Spiner'
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler'
import { connect } from 'react-redux'
import * as action from '../../store/actions/index'


export class BurgerBuilder extends Component {
    state = {
        purchaising: false,

    }
    componentDidMount() {
        this.props.onInitIngs()
    }


    updatePurchaceHandler(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0);
        return sum > 0
    }


    purchaisingHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({ purchaising: true })
        }else{
            this.props.onAuthPath('/checkout')
            this.props.history.push('auth')
        }
    }

    cancelPurchaisingHandler = () => {
        this.setState({ purchaising: false })
    }


    continuePurchaisingHandler = () => {
        this.props.onPurchased()
        this.props.history.push('/checkout')
    }

    render() {
        const disabledIng = {
            ...this.props.ings
        };
        let orderSummary = null
        let burger = this.props.error ? <p> cant retrieve the ingredients </p> : <Spiner />

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildConrols
                        ingredientAdded={this.props.onAddIngredient}
                        ingredientRemoved={this.props.onRemoveIngredient}
                        disabled={disabledIng}
                        purchaisable={this.updatePurchaceHandler(this.props.ings)}
                        ordered={this.purchaisingHandler}
                        isAuth={this.props.isAuthenticated}
                        price={this.props.price}
                    />
                </Aux>
            )
            orderSummary = <OrderModel
                ingredients={this.props.ings}
                cancel={this.cancelPurchaisingHandler}
                continue={this.continuePurchaisingHandler}
                price={this.props.price} />;
        }





        for (let key in disabledIng) {
            disabledIng[key] = disabledIng[key] <= 0
        }//[true,false,...]
        return (
            <Aux>
                <Modal show={this.state.purchaising} canceled={this.cancelPurchaisingHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}


const stateToProps = state => {
    return {
        ings: state.burger.ingredients,
        price: state.burger.totalPrice,
        error: state.burger.error,
        isAuthenticated:state.auth.token!==null
    };
}

const dispatchState = dispatch => {
    return {
        onAddIngredient: (ingName) => dispatch(action.addIngredient(ingName)),
        onRemoveIngredient: (ingName) => dispatch(action.removeIngredient(ingName)),
        onInitIngs: () => dispatch(action.initIntegs()),
        onPurchased:()=>dispatch(action.purchased()),
        onAuthPath:(path)=>dispatch(action.setAuthPath(path))
    };
}
export default connect(stateToProps, dispatchState)(ErrorHandler(BurgerBuilder, axios));