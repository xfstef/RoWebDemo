export const CHANGE_INTERVAL = 'CHANGE_INTERVAL';
export const CHANGE_CURRENCY = 'CHANGE_CURRENCY';

// Action used to change the API polling interval.
export const changeInterval = (base) => {
    return dispatch => {
        dispatch({type: CHANGE_INTERVAL, newInterval: base});
    };
};
// Action used to change the API polling base currency.
export const changeCurrency = (base) => {
    return dispatch => {
        dispatch({type: CHANGE_CURRENCY, newCurrency: base});
    };
};
