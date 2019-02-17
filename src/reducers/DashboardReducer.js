import { PROCESS_START, REQUEST_SUCCESS, REQUEST_FAIL } from "../globals/Strings";

const INITAL_STATE = {
    listData: [],
    loading: false,
    error: ""
};
export default (state = INITAL_STATE, action) => {
    switch (action.type) {
        case PROCESS_START:
            return { ...state, loading: true, error: '' }
        case REQUEST_SUCCESS:
            return { ...state, loading: false, listData: [...state.listData, ...action.payload] }
        case REQUEST_FAIL:
            return { ...state, loading: false, error: action.payload }
        default:
            return { ...state }

    }
}