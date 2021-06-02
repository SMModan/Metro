import { StyleSheet } from 'react-native'
import { Colors } from '../../../utils';

export default styles = StyleSheet.create({

    mainView: {
        flex: 1,
        backgroundColor: Colors.Defaultblack
    },
    containerView: {
        flex: 1,
        justifyContent: "center",
        alignContent: 'center',
        alignItems: "center",
        backgroundColor: Colors.Defaultblack
    },
    logoImg: {
        alignSelf: "center",
        tintColor: Colors.Defaultblack
    },
    bottomShadowView: {
        backgroundColor: Colors.Defaultblack
    },
    HorizontalImage: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 60
    },
    bottomImage: {
        resizeMode: 'cover',
        position: 'absolute',
        width: "100%",
        bottom: 0,
        marginBottom: "-75%"
    },
    leftImage: {
        marginRight: 20
    },
    RightImage: {
        marginLeft: 20
    }
});