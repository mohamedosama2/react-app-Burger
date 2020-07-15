import React,{Component} from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './contactData/contactData'
import {Route,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

class Checkout extends Component{

    
  
    cancelFuncHandler=()=>{
        this.props.history.goBack()
    }
    continueFuncHandler=()=>{
        this.props.history.replace('/checkout/contact-data')
    }
    render(){
        let summary=<Redirect to="/" />
        if(this.props.ings){
            const purchased=this.props.purchased ? <Redirect to="/" /> :null
            summary=(
                <div>
                    {purchased}
                <CheckoutSummary 
                ingredients={this.props.ings} 
                cancelHandler={this.cancelFuncHandler} 
                continueHandler={this.continueFuncHandler} 
                />
                <Route path={this.props.match.path +'/contact-data'}
                 component={ContactData} />
                </div>
            )
        }
        return summary
    }
}

const stateToProps=state=>{
    return {
        ings:state.burger.ingredients,
        price:state.burger.totalPrice,
        purchased:state.order.purchased
    }
}

export default connect(stateToProps)(Checkout);