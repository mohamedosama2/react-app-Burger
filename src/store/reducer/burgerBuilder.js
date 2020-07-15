import * as actionTypes from '../actions/actionTypes'

const initState={
    ingredients:null,
    totalPrice:4,
    error:false,
    bulding:false
}


const prices = {
    meat: 10,
    salad: 4,
    bacon: 2,
    cheese: 1
}

const reducer=(state=initState,action)=>{
    switch(action.type){
        case(actionTypes.ADD_INGREDIENT):
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]+1

                },
                totalPrice:state.totalPrice+prices[action.ingredientName],
                bulding:true
            };
        case(actionTypes.REDMOVE_INGREDIENT):
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]-1
                },
                totalPrice:state.totalPrice-prices[action.ingredientName],
                bulding:true
            };
        case actionTypes.SET_INGREDIENT:
            return{
                ...state,
                ingredients:action.ingredients,
                error:false,
                totalPrice:4,
                bulding:false
            };
        case actionTypes.SET_INGREDIENT_FAILED:
            return{
                ...state,
                error:true
            }        
        default :
            return state        
    }
}
export default reducer