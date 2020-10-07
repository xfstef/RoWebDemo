import 'react-native-gesture-handler';
import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/screens/HomeScreen.js';
import History from './src/screens/History.js';
import Settings from './src/screens/Settings.js';

import historyReducer from './src/store/reducers/historyReducer';
import homeScreenReducer from './src/store/reducers/homeScreenReducer';
import settingsReducer from './src/store/reducers/settingsReducer';

// A stack navigator is used for transitioning between screens.
const Stack = createStackNavigator();
// Here we define the navigation options four our 3 screens.
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName = 'HomeScreen'>
        <Stack.Screen 
          name = 'HomeScreen'
          component = {HomeScreen}
          options={{ title: 'Exchange App', headerTitleStyle: { textAlign: 'center' } }}
        />
        <Stack.Screen 
          name = 'History'
          component = {History}
          options={{ title: 'Istoric' }}
        />
        <Stack.Screen 
          name = 'Settings'
          component = {Settings}
          options={{ title: 'Setari' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
// The app contains 3 reducers each aimed at handling data used by their screen.
// We combine them into a single main reducer.
const mainReducer = combineReducers({
  settings: settingsReducer,
  history: historyReducer,
  homeScreen: homeScreenReducer
});
// This creates a global store with the main reducer.
const store = createStore(mainReducer, applyMiddleware(ReduxThunk));
// Main functional component used to start the app.
export default function App() {
  return (
    <Provider store = {store}>
      <AppNavigator />
    </Provider>
  );
}
