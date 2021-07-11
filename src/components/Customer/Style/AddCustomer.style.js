import { StyleSheet } from 'react-native';
import { Images, Colors, FontName, FontSize } from '../../../utils';
import ResponsivePixels from '../../../utils/ResponsivePixels';

export default StyleSheet.create({

  addfab: {
    position: 'absolute',
    margin: 16,
    right: 5,
    top: -ResponsivePixels.size50,
    backgroundColor: Colors.Orange500,
    color: Colors.white
  },
  floatEditText1: {
    fontFamily: FontName.regular, fontSize: 14, color:
      Colors.Black,
  },
  addMoreButton: {
    width: ResponsivePixels.size90,
    height: ResponsivePixels.size40,
    alignItems: 'flex-end',
    position: 'absolute', right: 10,
    marginTop: ResponsivePixels.size10
  },
  customEditText: {
    fontFamily: FontName.regular, fontSize: 14,
  }
});