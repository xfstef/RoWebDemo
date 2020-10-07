import React from 'react';
import { View, Text, StyleSheet } from "react-native";

// Custom functional component used in the exchange rates list of the home screen.
const ExchangeListItem = (props) => {
    return (
        <View style={styles.itemContainer}>
            <Text style={styles.itemText}>
                {props.currency}
            </Text>
            <Text style={styles.itemText}>
                {props.rate}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        
        borderTopColor: 'grey',
        borderTopWidth: 0.5,
    },
    itemText: {
        marginHorizontal: 16,
        marginVertical: 10,
        fontSize: 18
    }
  });

export default ExchangeListItem;