import { SET_RATES, ERROR_GETTING_RATES } from '../actions/homeScreen';

// Data used by the home screen state.
const initialState = {
    exchangeRates: [],
    latestUpdate: null,
    isServerReachable: true
};

export default (state = initialState, action) => {
    switch (action.type) {
        // An exchange rates setting action once the latest ones have been succesfully received.
        case SET_RATES: {
            return {
                ...state,
                exchangeRates: action.rates,
                latestUpdate: action.date,
                isServerReachable: true
            }
        }
        // An error getting exchange rates action which is used when the API call failed.
        case ERROR_GETTING_RATES: {
            return {
                ...state,
                isServerReachable: false
            }
        }
    }
    return state;
};