import axios from '../../Axios-orders';
// Action creators
import * as actionsTypes from '../actions/actionTypes';

// Synchronous
export const addingredient = (ingredientName) => {
    return {
        type: actionsTypes.ADD_INGREDIENT,
        ingredientName: ingredientName
    };
};

export const removeingredient = (ingredientName) => {
    return {
        type: actionsTypes.REMOVE_INGREDIENT,
        ingredientName: ingredientName
    };
};

// Asynchronous

export const setIngredients = ingredients => { // Synchronous action creator
    return {
        type: actionsTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
};

export const fetchIngredientsFaild = error => {
    return {
        type: actionsTypes.FETCH_INGREDIENTS_FAILD,
        error: error
    };
};

export const initIngredients = () => { // Asynchronous action creator
    return dispatch => {
        axios.get('/ingredients.json')
        .then(response => {
            dispatch(setIngredients(response.data));
        }).catch(error => {
            dispatch(fetchIngredientsFaild(true));
        });
    };
};

