import { StyleSheet } from 'react-native';
import { Colors, FontName, FontSize } from '../../../utils';
import ResponsivePixels from '../../../utils/ResponsivePixels';

export default styles = StyleSheet.create({

    ContainerView: {
        flex: 1,
    },
    textEmail:{
        marginTop:ResponsivePixels.size16
    },
    textPassword:{
        marginTop:ResponsivePixels.size16
    },
    ContainView: {
        marginHorizontal: ResponsivePixels.size16,
        flex:1,
        marginTop:ResponsivePixels.size10
    },
    topView:{
        alignItems:'center',
        marginBottom:ResponsivePixels.size40
    },
    loginTitle:{
        fontFamily: FontName.semibold,
        fontSize: FontSize.fontSize28,
        color: Colors.Red900,
        marginTop:ResponsivePixels.size5,
        fontWeight:"bold"
    },
    loginDesc:{
        fontFamily: FontName.regular,
        fontSize: FontSize.fontSize17,
        color: Colors.blueGray500,
        marginTop:ResponsivePixels.size16,
        textAlign:'center'
    },
    forgotPasswordView:{
        height:ResponsivePixels.size48,
        flexDirection:'row',
        alignItems:'center'
    },
    btnForgotTitle:{
        height:ResponsivePixels.size48,
        flexDirection:'row',
        alignItems:'center',
        flex:1,
        justifyContent:'flex-end'
    },
    forgotTitle:{
        fontFamily: FontName.regular,
        fontSize: FontSize.fontSize15,
        color: Colors.secondary500,
        textAlign:'right'
    },
    bottomShadowView: {
        marginTop:ResponsivePixels.size16,
        marginBottom: ResponsivePixels.size20,
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