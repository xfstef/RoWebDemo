import { GET_HISTORY } from '../actions/history';

// Data used in the history state.
const initialState = {
    historyRON: [],
    historyUSD: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        // This is the only action possible with this reducer. It sets the historic trading rates for RON and USD against EUR.
        case GET_HISTORY: {
            return {
                ...state,
                historyRON: action.ratesRON,
                historyUSD: action.ratesUSD
            }
        }
    }
    return state;
};