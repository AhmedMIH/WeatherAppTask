import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

const GlobalLoader = () => {
  const loading = useSelector(state => state.loader.loading);
  if (!loading) return null;

  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color="#ffffff" />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
});

export default GlobalLoader;
