import * as actionTypes from '../actions/actionTypes'

const initState={
    loading:false,
    error:null,
    token:null,
    userId:null,
    authPath:'/'
}

const reducer=(state=initState,action)=>{
    switch(action.type){
        case actionTypes.AUTH_START:
            return{
                ...state,
                loading:true,
                error:null
            }
        case actionTypes.AUTH_SUCCESS:
            return{
                ...state,
                loading:false,
                token:action.token,
                userId:action.userId
            }
        case actionTypes.AUTH_FAIL:
            return{
                ...state,
                error:action.error,
                loading:false
            }
        case actionTypes.AUTH_LOGOUT:
            return{
                ...state,
                token:null,
                userId:null
            }
        case actionTypes.SET_AUTH_PATH:
            return{
                ...state,
                authPath:action.path
            }           
        default:
            return state            
    }
}
export default reducer