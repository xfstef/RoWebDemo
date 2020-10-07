import HistoryValue from '../../models/historyValue';

export const GET_HISTORY = 'GET_HISTORY';

// This action is used to get the historic rates.
export const getHistory = (startDate, endDate) => {
    
    return async dispatch => {
        // API call.
        const response = await fetch(`https://api.exchangeratesapi.io/history?start_at=` + startDate + `&end_at=` + endDate + `&symbols=RON,USD`, {
            method: 'GET'
        });
        // Initialization after the API response comes.
        const result = await response.json();
        const historicRatesRON = [];
        const historicRatesUSD = [];
        // Loop used to populate our historic rates arrays.
        for (const key in result.rates) {
            historicRatesRON.push(new HistoryValue(key, result.rates[key].RON));
            historicRatesUSD.push(new HistoryValue(key, result.rates[key].USD));
        };
        // Sort algorithm needed to order the data in the arrays.
        historicRatesRON.sort((a, b) => {
            return new Date(a.x)- new Date(b.x);
        });
        historicRatesUSD.sort((a, b) => {
            return new Date(a.x)- new Date(b.x);
        });
        
        dispatch({type: GET_HISTORY, ratesRON: historicRatesRON, ratesUSD: historicRatesUSD});
    };
};