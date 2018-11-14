import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('Auth reducer', () => {

    it('should return initial state', () => {

        expect(reducer(undefined, {})).toEqual({
            idToken: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    });

    it('Should store a token upon login', () => {
        expect(reducer({
            idToken: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        },{
            type: actionTypes.AUTH_SUCCESS, 
            idToken: 'some-token', 
            userId: 'some-userId'
        })).toEqual({
            idToken: 'some-token',
            userId: 'some-userId',
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    })
})