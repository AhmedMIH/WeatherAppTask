import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../Utils/Colors';
import { getFontSize } from '../Utils/Helper';

const DetailsItem = ( { title, value } ) => {
    return (
        <View style={styles.container}>
            <Text style={styles.generalText} >{title}</Text>
            <Text style={{ color: Colors.white, fontSize: getFontSize( 14 ) }} >|</Text>
            <Text style={styles.generalText} >{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create( {
    container: {
        flexDirection: 'row', justifyContent: 'space-between', width: "70%"
    },
    generalText: {
        color: Colors.white,
        fontSize: getFontSize( 14 ),
        textAlign: 'center',
        flex: 1
    },

} )

export default DetailsItem;
