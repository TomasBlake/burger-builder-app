// Action creators
import axios from '../../Axios-orders';
import * as actionTypes from './actionTypes';

export const purchaseBurgerSucces = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        errorMessage: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START,
    }
}

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth=' + token, orderData)
        .then(response => {
            dispatch(purchaseBurgerSucces(response.data.name, orderData));
        })
        .catch(error => {
            dispatch(purchaseBurgerFail(error));
        })
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};

export const fetchOrdersInit = () => {
    return {
        type: actionTypes.FETCH_ORDERS_INIT
    };
};

export const fetchOrdersSuccess = (fetchedOrders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        fetchedOrders: fetchedOrders
    };
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        errorMessage: error
    }
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersInit());
        const queryParam = '?auth=' + token + '&orderBy="userId"&equalTo"' + userId +'"'; // firebase understand this query parametrs 
        axios.get('/orders.json' + queryParam)
        .then(response => {
            let fetchedOrders = [];
            for(let key in response.data)
            fetchedOrders.push({
                ...response.data[key],
                id: key
            });
            dispatch(fetchOrdersSuccess(fetchedOrders));
        }).catch(error => {
            dispatch(fetchOrdersFail(error));
        });
    }
}