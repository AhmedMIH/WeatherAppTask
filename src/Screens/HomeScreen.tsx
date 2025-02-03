import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, SafeAreaView, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-loading-spinner-overlay';
import {responsiveHeight, responsiveWidth} from '../Utils/Helper.js';
import Colors from '../Utils/Colors.js';
import {getWeather} from '../Redux/Actions';
import {connect} from 'react-redux';
import WeathersList from '../Components/WeathersList.js';
import SearchComponent from '../Components/SearchComponent.js';
import UnitToggle from '../Components/UnitToggle.js';
import CurrentWeather from '../Components/CurrentWeather.js';

const HomeScreen = ({weathers, loading, error, getWeather, unit}) => {
  const [searchQuery, setSearchQuery] = useState('London');

  const transformWeatherData = data => {
    if (!data || !data.forecast || !data.forecast.forecastday) {
      return [];
    }

    return data.forecast.forecastday.map(item => {
      return {
        date: item.date,
        temp: {
          maxtemp: item.day[`maxtemp_${unit}`],
          mintemp: item.day[`mintemp_${unit}`],
          avgtemp: item.day[`avgtemp_${unit}`],
          avgvis: unit === 'c' ? item.day.avgvis_km : item.day.avgvis_miles,
          avghumidity: item.day.avghumidity,
        },
        icon: {text: item.day.condition.text, source: item.day.condition.icon},
        astro: item.astro,
      };
    });
  };

  useEffect(() => {
    getWeather(searchQuery);
  }, [searchQuery]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.gradient}}>
      <LinearGradient
        colors={[Colors.gradient, Colors.gradient2]}
        style={styles.container}>
        <Spinner visible={loading} />
        <View style={styles.header}>
          <SearchComponent
            searchQuery={searchQuery}
            onChange={setSearchQuery}
          />
          <UnitToggle />
        </View>

        {error ? (
          <Text style={styles.errorText}>
            Something went wrong Please Enter Valid City Or Zip Code
          </Text>
        ) : (
          <>
            <Text style={styles.cityName}>{weathers?.location?.name}</Text>
            <WeathersList
              data={transformWeatherData(weathers)}
              current={weathers?.current}
            />
          </>
        )}
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: responsiveHeight(16),
    paddingHorizontal: responsiveWidth(16),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    color: Colors.white,
  },
  errorText: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    color: Colors.white,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

const mapStateToProps = ({weather}) => {
  return {
    loading: weather.loading,
    error: weather.error,
    weathers: weather.weathers,
    unit: weather.unit,
  };
};
const mapDispatchToProps = {
  getWeather,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
