import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {toggleUnit} from '../Redux/Actions';
import Colors from '../Utils/Colors';

const UnitToggle = () => {
  const dispatch = useDispatch();
  const unit = useSelector(state => state.weather.unit);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => dispatch(toggleUnit())}
      accessibilityLabel="Toggle temperature unit">
      <Text style={styles.text}>°{unit?.toUpperCase()}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
  },
  text: {
    color: Colors.white,
    fontWeight: 'bold',
  },
});

export default UnitToggle;
