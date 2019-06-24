import {
    RESULTS_LOADED,
    GENERAL_RESET
} from '../actions/types';

const INITIAL_STATE = {
    results: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RESULTS_LOADED:
            return {
                ...state,
                results: action.payload
            };
        case GENERAL_RESET:
            return INITIAL_STATE;
        default:
            return state;
    }
};
