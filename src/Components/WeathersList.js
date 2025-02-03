import {FlatList} from 'react-native';
import React from 'react';
import WeatherListItem from './WeatherListItem';
import CurrentWeather from './CurrentWeather';

const WeathersList = ({data, current}) => {
  return (
    <FlatList
      ListHeaderComponent={<CurrentWeather current={current} />}
      showsVerticalScrollIndicator={false}
      data={data}
      style={{marginTop: 16}}
      contentContainerStyle={{gap: 16}}
      renderItem={({item}) => <WeatherListItem item={item} />}
      keyExtractor={item => item.date}
    />
  );
};

export default WeathersList;
