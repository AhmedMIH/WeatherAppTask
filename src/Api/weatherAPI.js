import apiClient from './client';

export const getForecast = async (location, unit = 'c') => {
  try {
    const response = await apiClient.get('forecast.json', {
      params: {
        q: location,
        days: 5,
        aqi: 'no',
        alerts: 'no',
      },
    });
    return transformWeatherData(response.data, unit);
  } catch (error) {
    throw handleAPIError(error);
  }
};

const transformWeatherData = (data, unit) => ({
  current: transformCurrentWeather(data.current, unit),
  forecast: data.forecast.forecastday.map(day =>
    transformForecastDay(day, unit),
  ),
  location: data.location,
});

const transformCurrentWeather = (current, unit) => ({
  temp_c: current.temp_c,
  temp_f: current.temp_f,
  condition: current.condition,
  humidity: current.humidity,
  wind_kph: current.wind_kph,
  wind_mph: current.wind_mph,
  feelsLike_c: current.feelslike_c,
  feelsLike_f: current.feelslike_f,
});

const transformForecastDay = (day, unit) => ({
  date: day.date,
  temp: {
    maxtemp_c: day.day.maxtemp_c,
    mintemp_c: day.day.mintemp_c,
    avgtemp_c: day.day.avgtemp_c,
    maxtemp_f: day.day.maxtemp_f,
    mintemp_f: day.day.mintemp_f,
    avgtemp_f: day.day.avgtemp_f,
    avgvis_km: day.day.avgvis_km,
    avgvis_miles: day.day.avgvis_miles,
    avghumidity: day.day.avghumidity,
  },
  icon: {text: day.day.condition.text, source: day.day.condition.icon},
  astro: day.astro,
});
const handleAPIError = error => {
  const status = error.response?.status;
  const message =
    status === 404 ? 'Location not found' : 'Failed to fetch weather data';
  return new Error(message);
};
