import axios from 'axios';

import * as actionTypes from './actionTypes';
import { deepStrictEqual } from 'assert';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationData');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
}


export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expirationTime * 1000);
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCkK8zRldBhuwjWiALGxxCObAIdD1_N2go';
        if (!isSignup) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCkK8zRldBhuwjWiALGxxCObAIdD1_N2go';
        }
        axios.post(url, authData)
            .then(response => {
                console.log(response);

                const expirationData = new Date(new Date().getTime() + response.data.expiresIn * 1000);

                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationData', expirationData);
                localStorage.setItem('userId', response.data.localId);



                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
                
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));

            });
    };
};

export const setAuthRedirectPath = (input) => {
    return{
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        urlPath: input
        
    }
};


// get local storage data 
export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){ 
            dispatch(authLogout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationData'));

            if(expirationDate <= new Date()){
                dispatch(authLogout());
            } else {
                const userId = localStorage.getItem('userId');
                
                // Update Token and Id from local Storage
                dispatch(authSuccess(token, userId));
                
                // Converting Date Object to Seconds 
                const newExpiration = (expirationDate.getTime() - new Date().getTime()) / 1000;
                dispatch(checkAuthTimeout(newExpiration));

                

            }

        }
    }
}




