import {
    RESULTS_LOADED
} from './types';
// import Cookies from 'js-cookie';

export const loadResults = (data) => {
    return {
        type: RESULTS_LOADED,
        payload: data
    };
};