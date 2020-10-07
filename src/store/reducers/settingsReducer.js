import { CHANGE_CURRENCY, CHANGE_INTERVAL } from '../actions/settings';

// Data used in the settings state.
const initialState = {
    availableCurrencies: [],
    selectedCurrency: 'EUR',
    availableIntervals: [{label: '3', value: 3}, {label: '5', value: 5}, {label: '15', value: 15}],
    selectedInterval: 3
};

export default (state = initialState, action) => {
    switch (action.type) {
        // Action that is needed to change the base currency for the home screen API call.
        case CHANGE_CURRENCY: {
            return {
                ...state,
                selectedCurrency: action.newCurrency
            }
        }
        // Action used to change the API polling interval for the home screen.
        case CHANGE_INTERVAL: {
            return {
                ...state,
                selectedInterval: action.newInterval
            }
        }
    }
    return state;
};