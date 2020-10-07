import ExchangeRate from '../../models/exchangeRate';

export const SET_RATES = 'SET_RATES';
export const ERROR_GETTING_RATES = 'ERROR_GETTING_RATES';

// Action used to get the latest rates for the selected currency.
export const getRates = (base) => {
    
    return async dispatch => {
        // API call.
        await fetch(`https://api.exchangeratesapi.io/latest?base=` + base, {
            method: 'GET'
        }).then( async (response) => {
            // We check to see if the request was successful. If not then we dispatch an error setter.
            if(response.status != 200) {
                dispatch({type: ERROR_GETTING_RATES});
            } else {
                // If the request was successful we then initialize our data.
                const result = await response.json()
                const rates = [];
                // We iterate through the rates object nested within the reponse data.
                for (const key in result.rates) {
                    const currency = result.rates[key];
                    // We check to see if the currency selected is not the same as a response currency (this actually can happen for several ones).
                    if (key != base)
                        // Building the exchange rates array.
                        rates.push(new ExchangeRate(key, currency));
                };
                dispatch({type: SET_RATES, rates: rates, date: result.date});
            }
        // In case we catch an error during our API request we dispatch an error setter.
        }).catch(function(error) {
            dispatch({type: ERROR_GETTING_RATES});
        });
    };
};