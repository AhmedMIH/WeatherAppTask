import LinearGradient from 'react-native-linear-gradient';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {getFontSize, responsiveHeight, responsiveWidth} from '../Utils/Helper';
import Colors from '../Utils/Colors';
import DetailsItem from '../Components/DetailsItem';
import {connect, useSelector} from 'react-redux';

const DetailsScreen = ({route, navigation}) => {
  const item = route.params.item;
  const unit = useSelector(state => state.weather.unit);

  // Unit conversion helper
  const getWindSpeed = () => {
    return unit === 'c'
      ? `${item.temp.avgvis_km} km/h`
      : `${item.temp.avgvis_miles} mph`;
  };

  return (
    <LinearGradient
      colors={[Colors.gradient, Colors.gradient2]}
      style={styles.container}>
      <View
        style={{
          paddingVertical: responsiveHeight(32),
          paddingHorizontal: responsiveWidth(16),
        }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={styles.backButton}
              resizeMode="contain"
              source={require('../assets/icons/left-arrow.png')}
            />
          </TouchableOpacity>

          <Text style={styles.title}>Weather Details</Text>
        </View>

        <Image
          style={styles.icon}
          source={{uri: `https:${item.icon.source}`}}
        />

        <View style={styles.detailsContainer}>
          <Text style={styles.date}>{item.date}</Text>
          <Text style={styles.temp}>
            {item.temp[`avgtemp_${unit}`]}°{unit.toUpperCase()}
          </Text>
          <Text style={styles.desc}>{item.icon.text}</Text>

          <View style={styles.space} />

          <DetailsItem
            title="Wind Speed"
            value={getWindSpeed()}
            icon="weather-windy"
          />

          <DetailsItem
            title="Humidity"
            value={`${item.temp.avghumidity}%`}
            icon="water-percent"
          />

          <View style={styles.space} />

          <DetailsItem
            title="Max/Min Temp"
            value={`${item.temp[`maxtemp_${unit}`]}°/${
              item.temp[`mintemp_${unit}`]
            }°`}
            icon="thermometer"
          />

          <View style={styles.space} />

          <DetailsItem
            title="Sunrise"
            value={item.astro.sunrise}
            icon="weather-sunset-up"
          />
          <DetailsItem
            title="Sunset"
            value={item.astro.sunset}
            icon="weather-sunset-down"
          />
          <DetailsItem
            title="Moonrise"
            value={item.astro.moonrise}
            icon="moon-waxing-crescent"
          />
          <DetailsItem
            title="Moonset"
            value={item.astro.moonset}
            icon="moon-waning-crescent"
          />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 16,
  },
  backButton: {
    width: responsiveWidth(24),
    height: responsiveWidth(24),
    resizeMode: 'contain',
  },
  title: {
    color: Colors.white,
    fontSize: getFontSize(20),
    fontWeight: 'bold',
  },
  icon: {
    width: responsiveWidth(200),
    height: responsiveWidth(200),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  detailsContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
  },
  date: {
    color: Colors.white,
    fontSize: getFontSize(18),
    textAlign: 'center',
    marginBottom: 10,
  },
  temp: {
    color: Colors.white,
    fontSize: getFontSize(64),
    textAlign: 'center',
    fontWeight: '300',
  },
  desc: {
    color: Colors.textGray,
    fontSize: getFontSize(20),
    textAlign: 'center',
    marginBottom: 20,
  },
  space: {
    height: responsiveHeight(16),
  },
});

const mapStateToProps = ({weather}) => ({
  unit: weather.unit,
});

export default connect(mapStateToProps)(DetailsScreen);
