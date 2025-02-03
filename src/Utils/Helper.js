import {Dimensions, PixelRatio} from 'react-native';

const isTesting = true;

const responsiveWidth = width => {
  return (Dimensions.get('window').width * width) / 390;
};

const responsiveHeight = height => {
  return (Dimensions.get('window').height * height) / 844;
};

const getFontSize = size => size / PixelRatio.getFontScale();

const debugLog = (tag, message) => {
  if (isTesting) {
    if (message === undefined) {
      console.log(tag);
    } else {
      console.log(tag, message);
    }
  }
};

export {responsiveWidth, responsiveHeight, getFontSize, debugLog};
