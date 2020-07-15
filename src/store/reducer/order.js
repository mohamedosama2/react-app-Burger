import * as actionTypes from '../actions/actionTypes'
const initState={
    orders:[],
    loading:false,
    purchased:false
}

const reducer=(state=initState,action)=>{
    switch(action.type){
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder={
                ...action.orderData,
                id:action.id
            }
            return{
                ...state,
                loading:false,
                orders:state.orders.concat(newOrder),
                purchased:true
            }
        case actionTypes.PURCHASE_BURGER_FAIL:
            return{
                ...state,
                loading:false
            }
        case actionTypes.PURCHASED:
            return{
                ...state,
                purchased:false
            }    
        case actionTypes.PURCHASE_LOADING:
            return{
                ...state,
                loading:true
            }
        case actionTypes.ORDER_START:
            return{
                ...state,
                loading:true
            }
        case actionTypes.PURCHASE_ORDER_SUCCESS:
            return{
                ...state,
                loading:false,
                orders:action.orders
            }
        case actionTypes.PURCHASE_ORDER_FAIL:
            return{
                ...state,
                loading:false
            }                    
        default:
            return state    
    }
}
export default reducer