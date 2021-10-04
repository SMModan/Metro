import { StyleSheet } from 'react-native';
import { Images, Colors, FontName, FontSize } from '../../../utils';
import ResponsivePixels from '../../../utils/ResponsivePixels';

export default styles = StyleSheet.create({

    MainHeaderView: {
        flex: 1,
        backgroundColor: Colors.secondary50
    },
    headerView: {
       marginHorizontal:ResponsivePixels.size10,
       marginBottom:ResponsivePixels.size10,
       marginTop:ResponsivePixels.size20,
       flexDirection: 'row',
       alignItems: 'center'
    },emptyMessageStyle: {
        textAlign: 'center',
        marginTop: '70%',
    fontSize: FontSize.fontSize20,
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
        width: '30%', 
        marginRight: '5%',
        marginBottom: '5%', 
        height: 100,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 5,
        bottom: 5,
        backgroundColor: Colors.Orange500,
        color: Colors.white
      },
      MainHeaderView: {
        flex: 1,
        backgroundColor: Colors.Defaultwhite
    },
    headerView: {
       marginHorizontal:ResponsivePixels.size16,
       marginBottom:ResponsivePixels.size20
    },
    firstTitle:{
        color: Colors.Black,
        fontFamily: FontName.regular,
        fontSize: FontSize.fontSize20,
    },
    SecondTitle:{
        color: Colors.Black,
        fontFamily: FontName.medium,
        fontSize: FontSize.fontSize20,
        marginTop:ResponsivePixels.size8,
        fontWeight:'bold'
    },
    spinnerTextStyle: {
        color: '#FFF',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
      },
    MainList:{
        flex:1
    },
    //List
    listMain:{
        borderBottomColor:Colors.BlackColor200,
        borderBottomWidth:ResponsivePixels.size8,
    },

    ImageView:{
        marginTop:ResponsivePixels.size10,
        borderRadius:12,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "white"
    }, badge:{
        backgroundColor: '#82CAFF',     
        justifyContent:'center',
        alignItems:'center',
        color:'white',
        borderBottomLeftRadius:10,     
        borderTopLeftRadius:10,
        width: 60,                                                                                                                                                                                                   
        height: 20,                                                                                                                                                                                                  
        right: 5,                                                                                                                                                                                                    
        top: 5,   
        position:'absolute'
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
    badgeText:{
        color: 'white',
        fontFamily: FontName.medium,
        fontSize: FontSize.fontSize15,
        
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
        fontFamily: FontName.medium,
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
        marginStart:ResponsivePixels.size8
    },
    emptyMessageStyle: {
           textAlign: 'center',
           marginTop: '70%',
       fontSize: FontSize.fontSize20,
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
        uploadText: {
            color: Colors.blueGray900,
            fontSize: ResponsivePixels.size15,
            lineHeight: ResponsivePixels.size22,
            fontWeight: "600"
        }
});