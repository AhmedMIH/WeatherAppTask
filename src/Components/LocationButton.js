import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../Utils/Colors'
import { responsiveHeight, responsiveWidth } from '../Utils/Helper'

const LocationButton = ( { onPress } ) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress} >
            <Image style={{ width: 24, height: 24 }} source={require( '../assets/icons/location.png' )} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create( {
    button: {
        paddingHorizontal: responsiveWidth( 8 ),
        paddingVertical: responsiveHeight( 12 ),
        backgroundColor: Colors.secondary,
        height: '100%',
        borderRadius: 8,
        justifyContent: 'center'
    }
} )

export default LocationButton