import {LOGIN, LOGOUT, SUCCESS, FAILURE} from "./LoginType";

export const checkLogin = (username, password) => {
    let user = 'Thanhsay';
    let pass = '123456';
    return dispatch =>{
        if(username == user && password==pass){
            dispatch({
                type: SUCCESS,
                payload: true
            })
        } else {
            dispatch({
                type:FAILURE,
                payload: false
            })
        }
    }
}

export const checkLogout = () => {
    return dispatch =>{
        dispatch({
            type: LOGOUT,
            payload: false
        })
    }
}