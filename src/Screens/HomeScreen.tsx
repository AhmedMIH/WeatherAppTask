import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {responsiveHeight, responsiveWidth} from '../Utils/Helper';
import Colors from '../Utils/Colors';
import {getWeather} from '../Redux/Actions';
import {connect} from 'react-redux';
import WeathersList from '../Components/WeathersList';
import SearchComponent from '../Components/SearchComponent';
import UnitToggle from '../Components/UnitToggle';
import CurrentWeather from '../Components/CurrentWeather';
import Container from '../Components/Container';
import {SafeAreaView} from 'react-native-safe-area-context';

const HomeScreen = ({weathers, error, getWeather}) => {
  const [searchQuery, setSearchQuery] = useState('London');

  useEffect(() => {
    getWeather(searchQuery);
  }, [searchQuery]);

  return (
    <LinearGradient
      colors={[Colors.gradient, Colors.gradient2]}
      style={styles.container}>
      <View style={styles.header}>
        <SearchComponent searchQuery={searchQuery} onChange={setSearchQuery} />
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
            forecast={weathers?.forecast}
            current={weathers?.current}
          />
        </>
      )}
    </LinearGradient>
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
    error: weather.error,
    weathers: weather.weathers,
  };
};
const mapDispatchToProps = {
  getWeather,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
