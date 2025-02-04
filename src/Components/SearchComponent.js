import {View, StyleSheet, Alert} from 'react-native';
import GetLocation from '../Utils/Location';
import LocationButton from './LocationButton';
import Searchbar from './Searchbar';
import {debugLog, responsiveHeight} from '../Utils/Helper';
import {useDispatch} from 'react-redux';
import {loaderStart, loaderStop, showToast} from '../Redux/Actions';

const SearchComponent = ({onChange}) => {
  const dispatch = useDispatch();
  const getLocation = () => {
    dispatch(loaderStart());
    GetLocation.getCurrentPosition()
      .then(position => {
        let lat = parseFloat(position.latitude).toFixed(2);
        let lon = parseFloat(position.longitude).toFixed(2);
        onChange(`${lat},${lon}`);
      })
      .catch(error => {
        dispatch(showToast(error.toString(), 'error'));
      })
      .finally(() => dispatch(loaderStop()));
  };

  const onChangeSearchQuery = searchQuery => {
    searchQuery === undefined || searchQuery === ''
      ? onChange('London')
      : onChange(searchQuery);
  };
  return (
    <View style={styles.containerRow}>
      <LocationButton onPress={getLocation} />
      <Searchbar onPress={onChangeSearchQuery} />
    </View>
  );
};

const styles = StyleSheet.create({
  containerRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    height: responsiveHeight(48),
  },
});

export default SearchComponent;
