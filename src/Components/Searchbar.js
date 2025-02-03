import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import Colors from '../Utils/Colors'
import { getFontSize, responsiveHeight, responsiveWidth } from '../Utils/Helper'

const Searchbar = ( { onPress } ) => {
    const [ searchQuery, setSearchQuery ] = useState( '' )

    return (
        <View style={styles.container}>
            <Image style={{ width: 24, height: 24 }} source={require( '../assets/icons/search.png' )} />
            <TextInput placeholderTextColor={Colors.white} placeholder='Enter a city or zip code' value={searchQuery} onChangeText={setSearchQuery} style={styles.textInput} />
            <TouchableOpacity onPress={() => onPress( searchQuery )} style={styles.button}>
                <Text style={styles.textButton}>Search</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create( {
    container: {
        borderRadius: 8,
        flexDirection: 'row',
        backgroundColor: Colors.secondary,
        alignItems: 'center',
        paddingHorizontal: responsiveWidth( 12 ),
        flex: 1,
        height:responsiveHeight(50)
    },
    textInput: {
        flex: 1, marginHorizontal: responsiveWidth( 8 ),
        color: Colors.white,
        fontSize: getFontSize( 14 ),

    },
    textButton: {
        color: Colors.white,
        fontSize: getFontSize( 14 ),
        fontWeight: 'medium'
    },
    button: {
        backgroundColor: Colors.primary,
        borderRadius: 8,
        paddingVertical: responsiveHeight( 8 ),
        paddingHorizontal: responsiveWidth( 8 ),
        justifyContent: 'center',
        alignItems: 'center',
    }
} )

export default Searchbar