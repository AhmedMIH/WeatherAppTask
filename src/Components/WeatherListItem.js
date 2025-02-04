import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import Colors from '../Utils/Colors';
import {getFontSize, responsiveHeight, responsiveWidth} from '../Utils/Helper';
import {useSelector} from 'react-redux';

const WeatherListItem = ({item}) => {
  const unit = useSelector(state => state.weather.unit);
  const navigation = useNavigation();
  const navigateToDetails = () => {
    navigation.navigate('Details', {item});
  };
  return (
    <TouchableOpacity
      onPress={() => navigateToDetails()}
      style={styles.container}>
      <View style={{justifyContent: 'space-between'}}>
        <Text style={styles.title}>{item.temp[`avgtemp_${unit}`]}°</Text>
        <View>
          <Text style={styles.temp}>
            H:{item.temp[`maxtemp_${unit}`]}° L:{item.temp[`mintemp_${unit}`]}°
          </Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>
      </View>
      <View style={styles.iconContainer}>
        <Image
          style={styles.icon}
          source={{uri: 'https:' + item.icon.source}}
        />
        <Text style={styles.iconText}>{item.icon.text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: responsiveHeight(184),
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: getFontSize(64),
    color: Colors.white,
  },
  temp: {
    color: Colors.textGary,
    fontSize: getFontSize(13),
  },
  date: {
    color: Colors.white,
    fontSize: getFontSize(17),
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    width: responsiveWidth(100),
    resizeMode: 'contain',
    height: responsiveHeight(100),
  },
  iconText: {
    color: Colors.white,
    fontSize: getFontSize(13),
  },
});
export default WeatherListItem;
