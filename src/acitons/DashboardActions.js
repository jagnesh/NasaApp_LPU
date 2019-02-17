import { HTTPRequest } from "../helpers";
import ApiConstants from "../globals/ApiConstants";
import { COMMON_ERROR, PROCESS_START, REQUEST_SUCCESS, REQUEST_FAIL } from "../globals/Strings";

// Get list data from API
export const getListData = (startDate, endDate) => {
    return (dispatch) => {
        dispatch({ type: PROCESS_START })
        HTTPRequest(
            ApiConstants.SERVER_URL + `start_date=${startDate}&end_date=${endDate}`,
            'GET'
        ).then((response) => {
            console.log(`Response : ${JSON.stringify(response)}`)
            if(response.code == 400){
                console.log(`Error : ${response.msg}`)
                dispatch({ type: REQUEST_FAIL, payload: response.msg })
            }else{
                dispatch({ type: REQUEST_SUCCESS, payload: response.reverse() })
            }
           
           

        }).catch((e) => {
            dispatch({ type: REQUEST_FAIL, payload: COMMON_ERROR })
            console.log(`Error: ${COMMON_ERROR}`)
        })
    }

}