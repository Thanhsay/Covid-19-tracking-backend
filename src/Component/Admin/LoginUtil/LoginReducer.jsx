import {LOGIN, LOGOUT, SUCCESS, FAILURE} from "./LoginType";

const initValue = {
    isLogin: sessionStorage.getItem('isLogin')
}
const LoginReducer = (state = initValue, action) =>{
    switch (action.type){
        case SUCCESS:
            return{
                isLogin: 'true'
            };
            break;
        case FAILURE:
            return {
                isLogin: action.payload
            }
            break;
        case LOGOUT:
            return {
                isLogin: action.payload
            }
            break;
        default:
            return {

            };
    }
}
export default LoginReducer