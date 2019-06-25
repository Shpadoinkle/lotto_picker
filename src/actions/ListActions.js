import {
    RESULTS_LOADED,
    GENERAL_RESET
} from './types';
// import Cookies from 'js-cookie';

export const loadResults = (res, res2) => {
    return {
        type: RESULTS_LOADED,
        payload: { res, res2 }
    };
};

export const resetResults = () => {
    return {
        type: GENERAL_RESET
    };
}