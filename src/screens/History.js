import React, { useEffect, useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import PureChart from 'react-native-pure-chart';
import moment from 'moment';

import * as historyActions from '../store/actions/history';

const History = () => {
    // Data initialization.
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const historicValuesRON = useSelector(state => state.history.historyRON);
    const historicValuesUSD = useSelector(state => state.history.historyUSD);
    // Using moment to create a date format compatible with the one our API accepts.
    const today = moment().format('YYYY-MM-DD');
    // Creating the date from 14 days ago. 14 was used instead of 10 because the API does not give us weekends.
    const tenDaysAgo = moment().subtract(14, 'day').format('YYYY-MM-DD');
    // Function used to get the historic rates.
    const getHistoricRates = useCallback(async () => {
        setIsLoading(true);
        try {
            await dispatch(historyActions.getHistory(tenDaysAgo, today));
        } catch (error) {
            console.log(error);
        }
    }, [dispatch]);
    // This effect is fired once when the component first loads and it is used to get the historic.
    useEffect(() => {
        getHistoricRates().then(() => {
            setIsLoading(false);
        });
    }, []);
    // This JSX includes 2 PureChart components needed for showing the historic rates in a liniar graph.
    return (
        <View style={styles.container}>
            <Text style={styles.historyText}>RON to EUR</Text>
            <PureChart data={historicValuesRON} type='line' />
            <Text style={styles.historyText}>USD to EUR</Text>
            <PureChart data={historicValuesUSD} type='line' />
        </View>
    );
};
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    historyText: {
        fontSize: 20,
        marginTop: 16,
        marginLeft: 20,
        textAlign: 'left'
    }
});

export default History;