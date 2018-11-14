import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initState = {
    orders: [],
    purchased: false,
    loading: false,
    errorMessage: null
}

const fetchOrderInit = (state, action) => {
    return updateObject(state, {loading: true});
};

const purchaseInit = (state, action) => {
    return updateObject(state, {purchased: false}); 
};

const fetchOrdersSuccess = (state, action) => {
    return updateObject(state, {orders: action.fetchedOrders, loading: false});
};

const fetchOrdersFail = (state, action) => {
    return updateObject(state, {loading: false, errorMessage: action.errorMessage});
};

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, {id: action.orderId});
    return updateObject(state, {loading: false, orders: state.orders.concat(newOrder), purchased: true});
};

const purchaseBurgerFail = (state, action) => {
    return updateObject(state, {loading: false, errorMessage: action.errorMessage});
};

const purchaseBurgerStart = (state, action) => {
    return updateObject(state, {loading: true});
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case (actionTypes.FETCH_ORDERS_INIT): return fetchOrderInit(state, action);
        case (actionTypes.PURCHASE_INIT): return purchaseInit(state, action);
        case (actionTypes.FETCH_ORDERS_SUCCESS): return fetchOrdersSuccess(state, action);
        case (actionTypes.FETCH_ORDERS_FAIL): return fetchOrdersFail(state, action);
        case (actionTypes.PURCHASE_BURGER_SUCCESS): return purchaseBurgerSuccess(state, action);
        case (actionTypes.PURCHASE_BURGER_FAIL): return purchaseBurgerFail(state, action);
        case (actionTypes.PURCHASE_BURGER_START): return purchaseBurgerStart(state, action); 
        default: return state;
    }
} 

export default reducer;