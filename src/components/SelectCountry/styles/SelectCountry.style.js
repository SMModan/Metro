import { StyleSheet } from 'react-native';
import { Colors, FontName, FontSize } from '../../../utils';
import ResponsivePixels from '../../../utils/ResponsivePixels';

export default styles = StyleSheet.create({

    ContainerView: {
        flex: 1,
    },
    ContainView: {
        marginHorizontal: ResponsivePixels.size26,
        flex:1,
    },
    topView:{
        alignItems:'flex-start',
    },
    loginTitle:{
        fontFamily: FontName.semibold,
        fontSize: FontSize.fontSize40,
        color: Colors.Red900,
        marginTop:ResponsivePixels.size30,
        fontWeight:"bold"
    },
    loginDesc:{
        fontFamily: FontName.regular,
        fontSize: FontSize.fontSize20,
        color: Colors.blueGray500,
        marginTop:ResponsivePixels.size8,
        
    },
    logo:{
        height:'30%',
        width:"80%",
        resizeMode:'contain',
        alignSelf:"center"
    }, countryRegion:{
        marginTop:ResponsivePixels.size20
    },
});