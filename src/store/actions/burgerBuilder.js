import * as actionTypes from './actionTypes'
import axios from '../../axios-order'


export const addIngredient = (ingName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName
    }
}


export const removeIngredient = (ingName) => {
    return {
        type: actionTypes.REDMOVE_INGREDIENT,
        ingredientName: ingName
    }
}

export const setIngs = (name) => {
    return {
        type: actionTypes.SET_INGREDIENT,
        ingredients: name
    }
}

export const fetchFAILED = () => {
    return {
        type: actionTypes.SET_INGREDIENT_FAILED
    }
}

export const initIntegs = () => {
    return dispatch => {
        axios.get('https://burger-ed778.firebaseio.com/ingredients.json')
            .then(res => {
                dispatch(setIngs(res.data))
            })
            .catch(error => {
                dispatch(fetchFAILED())
            })
    }
}


