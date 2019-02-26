import { HTTPRequest, ReadItem, SaveItem, DeleteItem } from "../helpers";
import ApiConstants from "../globals/ApiConstants";
import { COMMON_ERROR, PROCESS_START, REQUEST_SUCCESS, REQUEST_FAIL, PRE_REQUEST_SUCCESS } from "../globals/Strings";

// Get list data from API
export const getListData = (startDate, endDate) => {
    return (dispatch) => {
        dispatch({ type: PROCESS_START })
        HTTPRequest(
            ApiConstants.SERVER_URL + `start_date=${startDate}&end_date=${endDate}`,
            'GET'
        ).then((response) => {
            console.log(`Response : ${JSON.stringify(response)}`)
            if (response.code == 400) {
                console.log(`Error : ${response.msg}`)
                dispatch({ type: REQUEST_FAIL, payload: response.msg })
            } else {
                ReadItem('NasaListData').then((result) => {
                    if (result != null) {
                        let mergeData = [...response.reverse(), ...JSON.parse(result)]
                        console.log(`Merged Data: ${JSON.stringify(mergeData)}`)
                        SaveItem('NasaListData', JSON.stringify(mergeData))
                    } else {
                        SaveItem('NasaListData', JSON.stringify(response.reverse()))
                    }
                }).catch((error) => {
                    console.log(`HTTP Call Db Error: ${error}`)
                })
                dispatch({ type: REQUEST_SUCCESS, payload: response.reverse() })
            }
        }).catch((e) => {
            dispatch({ type: REQUEST_FAIL, payload: COMMON_ERROR })
            console.log(`Error: ${COMMON_ERROR}`)
        })
    }

}
export const getPrependListData = (startDate, endDate) => {
    return (dispatch) => {
        dispatch({ type: PROCESS_START })
        HTTPRequest(
            ApiConstants.SERVER_URL + `start_date=${startDate}&end_date=${endDate}`,
            'GET'
        ).then((response) => {
            console.log(`Response : ${JSON.stringify(response)}`)
            if (response.code == 400) {
                console.log(`Error : ${response.msg}`)
                dispatch({ type: REQUEST_FAIL, payload: response.msg })
            } else {
                ReadItem('NasaListData').then((result) => {
                    if (result != null) {
                        let mergeData = [...response, ...JSON.parse(result).reverse()]
                        console.log(`small Merged Data: ${JSON.stringify(mergeData)}`)
                        DeleteItem('NasaListData')
                        SaveItem('NasaListData', JSON.stringify(mergeData.reverse()))
                    }
                }).catch((error) => {
                    console.log(`HTTP Call Db Error: ${error}`)
                })
                dispatch({ type: PRE_REQUEST_SUCCESS, payload: response.reverse() })
            }
        }).catch((e) => {
            dispatch({ type: REQUEST_FAIL, payload: COMMON_ERROR })
            console.log(`Error: ${COMMON_ERROR}`)
        })
    }

}

export const loadDataFromDb = (data) => {

    return (dispatch) => {
        dispatch({ type: REQUEST_SUCCESS, payload: JSON.parse(data).reverse() })
    }
}