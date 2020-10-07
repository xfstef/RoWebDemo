import React, { useEffect, useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';

import * as settingsActions from '../store/actions/settings';

const Settings = () => {
    // Data initialization.
    const dispatch = useDispatch();
    const currentCurrency = useSelector(state => state.settings.selectedCurrency);
    const currentInterval = useSelector(state => state.settings.selectedInterval);
    const allIntervals = useSelector(state => state.settings.availableIntervals);
    const currentRates = useSelector(state => state.homeScreen.exchangeRates);
    const [allCurrencies, setAllCurrencies] = useState([]);
    // Function used to determine which Currencies are available and help populate the dropdown for changing them.
    const setCurrencies = () => {
        let result = [{label: currentCurrency, value: currentCurrency}];
        for(item in currentRates) {
            const currency = currentRates[item].nameAgainst;
            result.push({label: currency, value: currency});
        }
        setAllCurrencies(result);
    }
    // Method used to set the global interval update rate.
    const setSelectedInterval = async (value) => {
        try {
            await dispatch(settingsActions.changeInterval(value));
        } catch (error) {
            console.log(error);
        }
    };
    // Method used to set the global selected currency.
    const setSelectedCurrency = async (currency) => {
        try {
            await dispatch(settingsActions.changeCurrency(currency));
        } catch (error) {
            console.log(error);
        }
    };
    // Hook called once when the screen initializes which calls the set currency function.
    useEffect(() => {
        setCurrencies();
    }, []);
    // We use 2 RNPickerSelect components for selecting new interval / currency.
    return (
        <View style={styles.container}>
            <View style={styles.pickerContainer}>
                <Text style={styles.pickerText}>Change Update Interval</Text>
                <RNPickerSelect
                    onValueChange={(value) => setSelectedInterval(value)}
                    items={allIntervals}
                    value={currentInterval}
                    placeholder={{}}
                />
            </View>
            <View style={styles.pickerContainer}>
                <Text style={styles.pickerText}>Change Currency</Text>
                <RNPickerSelect
                    onValueChange={(value) => setSelectedCurrency(value)}
                    items={allCurrencies}
                    placeholder={{}}
                />
            </View>
        </View>
    );
};
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    pickerContainer: {
        margin: 16,
        borderBottomColor: 'grey',
        borderBottomWidth: 0.5,
    },
    pickerText: {
        fontSize: 18
    }
});

export default Settings;