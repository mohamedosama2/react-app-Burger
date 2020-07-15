import * as actionTypes from './actionTypes';
import axios from '../../axios-order'



export const purchasSucces=(id,orderData)=>{
    return {
        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        orderData:orderData,
        id:id
    }
};

export const purchasFail=(error)=>{
    return {
        type:actionTypes.PURCHASE_BURGER_FAIL,
        error:error
        
    }
};

export const purchaseLoading=()=>{
    return{
        type:actionTypes.PURCHASE_LOADING
    }
}

export const purchasStart=(orderData,token)=>{
    return dispatch=>{
        dispatch(purchaseLoading())
        axios.post('/orders.json?auth='+token, orderData)
            .then(res => {
               dispatch(purchasSucces(res.data.name,orderData))
            })
            .catch(err =>purchasFail(err) )
    }
}


export const purchased=()=>{
    return {
        type:actionTypes.PURCHASED
    }
}


export const orderSuccess=(orderData)=>{
    return{
        type:actionTypes.PURCHASE_ORDER_SUCCESS,
        orders:orderData
    }
}

export const orderFail=(err)=>{
    return {
        type:actionTypes.PURCHASE_ORDER_FAIL,
        error:err
    }
}

export const orderStart=()=>{
    return {
        type:actionTypes.ORDER_START
    }
}

export const fetchOrders=(token,userId)=>{
    return dispatch=>{
        const query='?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"'
        axios.get('/orders.json'+query)
            .then(res=>{
                dispatch(orderStart())
            const fetched=[]
            for(let key in res.data){
                fetched.push({
                    ...res.data[key],
                    id:key
                })
            }
            dispatch(orderSuccess(fetched))
         //   this.setState({loading:false,orders:fetched})
        }).catch(err=>{
            dispatch(orderFail(err))
        })
    }
}
