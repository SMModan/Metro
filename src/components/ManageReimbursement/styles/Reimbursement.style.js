import { Dimensions, StyleSheet } from 'react-native';
import { Colors, FontName, FontSize } from '../../../utils';
import ResponsivePixels from '../../../utils/ResponsivePixels';

const { width } = Dimensions.get("window");
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
    screen: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    viewWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    modalView: {
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "20%",
        left: "50%",
        elevation: 5,
        transform: [{ translateX: -(width * 0.4) }, 
                    { translateY: -90 }],
        height: "80%",
        width: "80%",
        backgroundColor: "#fff",
        borderRadius: 7,
    },
    uploadView: {
        flex: 1,
        borderRadius: ResponsivePixels.size16,
        borderColor: Colors.blueGray400,
        borderStyle: "dashed",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.blueGray200,
        borderWidth: 1,
        margin: ResponsivePixels.size10
    },
});