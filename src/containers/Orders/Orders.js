import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-order'
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import Spiner from '../../components/UI/Spiner/Spiner'

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }
    componentDidMount() {
        this.props.onFetch(this.props.token,this.props.userId)
    }
    render() {
        let output = <Spiner />
        if (!this.props.loading) {
            output = this.props.orders.map(order => (
                <Order key={order.id} ingredients={order.ingredients} price={order.totalPrice} />
            ))
        }
        return (
            <div>
                {output}
            </div>

        )
    }
}

const propsToState = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
}
const funcs = dispatch => {
    return {
        onFetch: (token,userId) => dispatch(actions.fetchOrders(token,userId))
    }
}
export default connect(propsToState, funcs)(ErrorHandler(Orders, axios))