import { StyleSheet } from 'react-native';
import { Images, Colors, FontName, FontSize } from '../../../utils';
import ResponsivePixels from '../../../utils/ResponsivePixels';

export default styles = StyleSheet.create({

    MainHeaderView: {
        flex: 1,
        backgroundColor: Colors.secondary500
    },
    headerView: {
       marginHorizontal:ResponsivePixels.size16,
       marginBottom:ResponsivePixels.size20
    },
    firstTitle:{
        marginTop:ResponsivePixels.size20,
        marginBottom:ResponsivePixels.size15,
        color: Colors.white,
        fontFamily: FontName.bold,
        fontSize: FontSize.fontSize25,
    },
    SecondTitle:{
        color: Colors.Black,
        fontFamily: FontName.medium,
        fontSize: FontSize.fontSize20,
        marginTop:ResponsivePixels.size8
    },
    MainList:{
        flex:1,
        backgroundColor: Colors.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    //List
    listMain:{
        borderBottomColor:Colors.BlackColor200,
        borderBottomWidth:ResponsivePixels.size8,
    },
    btnMain:{
        paddingHorizontal:ResponsivePixels.size16,
        alignItems:'center',
        backgroundColor: Colors.secondary100,
        height: '100%',
        width: '100%'
    },
    ContainView:{

    },
    ImageView:{
        marginTop:ResponsivePixels.size10
    },
    infoView:{
        flexDirection:'row',
        alignItems:'center',
        flex:1,
        paddingVertical:ResponsivePixels.size10
    },
    dateView:{
        borderColor:Colors.BlackColor200,
        borderWidth:ResponsivePixels.size1,
        borderRadius:ResponsivePixels.size8,
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:ResponsivePixels.size15,
        paddingVertical:ResponsivePixels.size10
    },
    dateValue:{
        color: Colors.primaryColor500,
        fontFamily: FontName.medium,
        fontSize: FontSize.fontSize20,
    },
    monthValue:{
        color: Colors.BlackColor600,
        fontFamily: FontName.medium,
        fontSize: FontSize.fontSize10,
        marginTop:ResponsivePixels.size6
    },
    titleView:{
        flex:1,
        marginStart:ResponsivePixels.size16
    },
    mainText:{
        color: Colors.BlackColor900,
        fontFamily: FontName.medium,
        fontSize: FontSize.fontSize15,
    },
    AddressTextValue:{
        color: Colors.BlackColor600,
        fontFamily: FontName.regular,
        fontSize: FontSize.fontSize15,
        marginTop:ResponsivePixels.size8
    },
    btnView:{
        height:ResponsivePixels.size50,
        borderTopColor:Colors.BlackColor200,
        borderTopWidth:ResponsivePixels.size1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    btnLeft:{
        height:ResponsivePixels.size50,
        borderRightColor:Colors.BlackColor200,
        borderRightWidth:ResponsivePixels.size1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        flex:1
    },
    btnRight:{
        height:ResponsivePixels.size50,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        flex:1
    },
    leftText:{
        color: Colors.BlackColor700,
        fontFamily: FontName.regular,
        fontSize: FontSize.fontSize13,
        marginTop: ResponsivePixels.size8,
        marginBottom: ResponsivePixels.size8,
    },
    cellStyle: {
        width: '33%', 
        marginRight: '1%',
        marginBottom: '2%', 
        height: 100,
    }
});