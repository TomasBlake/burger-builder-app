import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
    idToken: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}

const authStart = (state) => {
    return updateObject(state, {
        error: null, 
        loading: true
        });
}

const authSuccess = (token, userId, state) => {
    return updateObject(state, {
        loading: false,
        idToken: token,
        userId: userId,
        error: null
        });
}

const authFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.errorMessage
        }); 
}

const authLogout = (state,action) => {
    return updateObject(state, {idToken: null, userId: null})
}

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, {authRedirectPath: action.path});
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.AUTH_START) : return authStart(state);
        case (actionTypes.AUTH_SUCCESS) : return authSuccess(action.idToken, action.userId, state);
        case (actionTypes.AUTH_FAIL) : return authFail(state, action);
        case (actionTypes.AUTH_LOGOUT) : return authLogout(state, action);
        case (actionTypes.SET_AUTH_REDIRECT_PATH) : return setAuthRedirectPath(state, action)
        default : return state;
    }
}

export default reducer;