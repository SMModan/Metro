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
  floatEditText: {
    paddingVertical: 15,
    fontFamily: FontName.regular, fontSize: 14, color:
      Colors.blueGray900,
  },
  addMoreButton: {
    width: ResponsivePixels.size90,
    height: ResponsivePixels.size40,
    alignItems: 'flex-end',
    position: 'absolute', right: 10,
    marginTop: ResponsivePixels.size10
  },
  customEditText: {
    height: ResponsivePixels.size60,
    fontFamily: FontName.regular, fontSize: 14,
  }
});