import {FlatList} from 'react-native';
import React from 'react';
import WeatherListItem from './WeatherListItem';
import CurrentWeather from './CurrentWeather';

const WeathersList = ({forecast, current}) => {
  return (
    <FlatList
      keyboardDismissMode="on-drag"
      ListHeaderComponent={
        forecast?.length > 0 && <CurrentWeather current={current} />
      }
      showsVerticalScrollIndicator={false}
      data={forecast}
      style={{marginTop: 16}}
      contentContainerStyle={{gap: 16}}
      renderItem={({item}) => <WeatherListItem item={item} />}
      keyExtractor={item => item.date}
    />
  );
};

export default WeathersList;
