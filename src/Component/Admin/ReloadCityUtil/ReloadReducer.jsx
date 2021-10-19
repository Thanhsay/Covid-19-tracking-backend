import {RELOAD} from "./ReloadType";

const initValue = {
    cityId: ''
}

const reloadReducer = (state = initValue, action) => {
    switch (action.type){
        case RELOAD:
            return{
                cityId: action.payload
            }
        default:
            return state
    }
}
export default reloadReducer