import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Colors from '../Utils/Colors';
import {useSelector} from 'react-redux';

const CurrentWeather = ({current}) => {
  const unit = useSelector(state => state.weather.unit);

  return (
    <View style={styles.currentWeatherContainer}>
      {/* Temperature with dynamic unit */}
      <Text style={styles.currentTemp}>
        {current?.[`temp_${unit}`]}°{unit.toUpperCase()}
      </Text>

      <View style={styles.conditionContainer}>
        <Image
          source={{uri: `https:${current?.condition?.icon}`}}
          style={styles.weatherIcon}
        />
        <Text style={styles.conditionText}>{current?.condition?.text}</Text>
      </View>

      <View style={styles.statsContainer}>
        {/* Wind speed with dynamic unit */}
        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {unit === 'c' ? current?.wind_kph : current?.wind_mph}
            {unit === 'c' ? ' km/h' : ' mph'}
          </Text>
          <Text style={styles.statLabel}>Wind</Text>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.statValue}>{current?.humidity}%</Text>
          <Text style={styles.statLabel}>Humidity</Text>
        </View>

        {/* Feels like with dynamic unit */}
        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {current?.[`feelslike_${unit}`]}°{unit.toUpperCase()}
          </Text>
          <Text style={styles.statLabel}>Feels Like</Text>
        </View>
      </View>
    </View>
  );
};

// Keep the rest of the styles the same
const styles = StyleSheet.create({
  currentWeatherContainer: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    padding: 20,
    marginVertical: 16,
  },
  currentTemp: {
    fontSize: 48,
    color: Colors.white,
    fontWeight: '300',
    textAlign: 'center',
  },
  conditionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  weatherIcon: {
    width: 48,
    height: 48,
    marginRight: 8,
  },
  conditionText: {
    color: Colors.white,
    fontSize: 18,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '500',
  },
  statLabel: {
    color: Colors.textGray,
    fontSize: 12,
    marginTop: 4,
  },
});

export default CurrentWeather;
