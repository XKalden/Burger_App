// Redux state test 

// Reducer are Purefunction easy to test 

import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {


    // expect reducer(action = undeifned , action idk)
    it('should return the initial state', () => {
        expect(reducer(undefined,{})).toEqual({
            token: null,
            userId: null,
            error:null,
            loading: false,
            authRedirectPath: '/'
        });
    });


    it('<data/> >should store the token after login', () => {
        expect(reducer({
            token: null,
            userId: null,
            error:null,
            loading: false,
            authRedirectPath: '/'
        },{
            type:actionTypes.AUTH_SUCCESS,
            idToken: 'kalden',
            userId: 'wow'
        })).toEqual({
            token: 'kalden',
            userId: 'wow',
            error:null,
            loading: false,
            authRedirectPath: '/'
        });
    });
});


