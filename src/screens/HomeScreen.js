import React, { useEffect, useCallback, useState } from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';

import * as homeScreenActions from '../store/actions/homeScreen';
import ExchangeListItem from '../components/ExchangeListItem';
import useInterval from '../components/useIntervalHook';

const HomeScreen = ({navigation}) => {
    // Local and global storage.
    const dispatch = useDispatch();
    const currentCurrency = useSelector(state => state.settings.selectedCurrency);
    const currentRefreshRate = useSelector(state => state.settings.selectedInterval);
    const currentRates = useSelector(state => state.homeScreen.exchangeRates);
    const currentLastUpdate = useSelector(state => state.homeScreen.latestUpdate);
    const isServerReachable = useSelector(state => state.homeScreen.isServerReachable);
    const [isLoading, setIsLoading] = useState(true);
    const [delay, setDelay] = useState(currentRefreshRate * 1000);
    // Function used to get the exchange rates.
    const getRates = useCallback(async (currency) => {
        setIsLoading(true);
        try {
            await dispatch(homeScreenActions.getRates(currency));
        } catch (error) {
            console.log(error);
        }
    }, [dispatch]);
    // This hook fires every time a new currency is selected in the settings screen.
    useEffect(() => {
        getRates(currentCurrency).then(() => {
            setIsLoading(false);
        });
    }, [currentCurrency]);
    // Here we reset the polling delay whenever it is changed in the settings screen.
    useEffect(() => {
        setDelay(currentRefreshRate * 1000);
    }, [currentRefreshRate]);
    // Custom Hook used to periodically poll the API for the latest exchange rates.
    useInterval(() => {
        getRates(currentCurrency).then(() => {
            setIsLoading(false);
        });
    }, delay);
    // Method used to navigate between this screen and the History and Settings.
    const navigateTo = (routeName) => {
        navigation.navigate(routeName)
    };
    // I create a custom JSX component so that I can apply a loading / activity indicator when we're fetching data.
    let list;
    if(isLoading) {
        list = <View style={styles.loaderStyle}><ActivityIndicator size="large" color="grey"/></View>;
    } else {
        list = 
        // This component is built by use of a FlatList and for each element we create a custom ExchangeListItem component.
        <FlatList 
            style={styles.listContainer}
            data={currentRates}
            keyExtractor={item => item.nameAgainst}
            renderItem={({item}) => (
                <ExchangeListItem 
                    currency={item.nameAgainst}
                    rate={item.rate}
                    isLoading={isLoading}
                />
            )}
        />;
    }
    // Another custom JSX component used when the server cannot be reached and this information must be presented. 
    let isOffline = <View></View>;
    if(!isServerReachable) {
        isOffline = 
        <View>
            <Text style={styles.currencyText}>Server could not be reached!</Text>
            <Text style={styles.currencyText}>Last Updated: {currentLastUpdate}</Text>
        </View>
    }

    return (
      <View style={styles.container}>
        <View style={styles.buttonsView}>
            <Button
                title="Istoric"
                containerStyle={styles.containerStyle}
                buttonStyle={styles.buttonStyle}
                raised
                icon={
                    <Icon
                        style={styles.icon}
                        name="area-graph"
                        type="entypo"
                        size={15}
                        color="white"
                    />
                }
                onPress={() => {navigateTo('History')}}
            />
            <Button 
                title="Setari"
                containerStyle={styles.containerStyle}
                buttonStyle={styles.buttonStyle}
                raised
                icon={
                    <Icon
                        style={styles.icon}
                        name="ios-settings"
                        type="ionicon"
                        size={16}
                        color="white"
                    />
                }
                onPress={() => {navigateTo('Settings')}}
            />
        </View>
        {isOffline}
        <Text style={styles.currencyText}>1 {currentCurrency} =</Text>
        {list}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    loaderStyle: {
        flex: 1,
        justifyContent: "center"
    },
    listContainer: {
        marginVertical: 16
    },
    buttonsView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    containerStyle: {
        width: '47%',
        marginTop: 8
    },
    buttonStyle: {
        backgroundColor: 'grey',   
    },
    icon: {
        marginHorizontal: 4
    },
    currencyText: {
        fontSize: 20,
        marginTop: 16,
        marginLeft: 16,
        textAlign: 'left'
    }
  });

  export default HomeScreen;