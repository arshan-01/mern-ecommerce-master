import * as action from "./actionType";

export const FETCH_PRODUCT = (fetchproducts)=>{
        return {
            type : action.FETCH_PRODUCT,
            payload : fetchproducts,
        }
}

export const ADD = (products)=>{
        return {
            type : action.ADD_TO_CART,
            payload : products,
        }
}

export const REMOVE = (id)=>{
    // console.log(id)
        return {
            type : action.REMOVE_TO_CART,
            payload : id,
        }
}
export const CLEAR__CART = ()=>{

        return {
            type : action.CLEAR_CART,
        }
}

// INCREAMENT_QTY
export const INCREAMENT = (payload)=>{
    // console.log(payload)
    return {
        type : action.INCREAMENT_QTY,
        payload 
    }
}
// DECREAMENT_QTY
export const DECREAMENT = (payload)=>{
    // console.log(id)
        return {
            type : action.DECREAMENT_QTY,
            payload 
        }
}

export const FETCHING = ()=>{
    return {
        type : action.LOGIN_START,
    }
}
 

export const LOGIN__SUCCESS = (user)=>{
   
    return {
        type : action.LOGIN_SUCCESS,
        payload:user,
    }
}


export const LOGIN__FAIL = ()=>{
    return {
        type : action.LOGIN_FALIURE,
    }
}
export const USER__LOGOUT = ()=>{
    return {
        type : action.USER_LOGOUT,
    }
}
export const USER__REGISTERED = ()=>{
    return {
        type : action.USER_REGISTERED,
    }
}


// export const USER__ORDERS = (payload)=>{
//     return {
//         type : action.USER_ORDERS,
//         payload
//     }
// }
// export const USER_ORDERS__NULL = ()=>{
//     return {
//         type : action.USER_ORDERS_NULL,
//     }
// }
