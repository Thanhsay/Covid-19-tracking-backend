import {RELOAD} from "./ReloadType";

export const passCityId = (cityId) =>{
    return dispatch =>{
        dispatch({
            type: RELOAD,
            payload: cityId
        })
    }
}