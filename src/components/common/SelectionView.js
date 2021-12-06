import React, { Component } from 'react'
import { Text, Dimensions, StyleSheet, KeyboardAvoidingView, FlatList, StatusBar, Image } from 'react-native'
import Dialog, {
    DialogContent, SlideAnimation,
    DialogFooter, DialogButton, DialogTitle,
} from 'react-native-popup-dialog'
import { Icon, View } from 'native-base';
import { Colors, FontName, Fonts } from '../../utils';
import Clickable from './Clickable';
import ResponsivePixels from '../../utils/ResponsivePixels';
import SearchBar from './SearchBar';


export default class SelectionView extends Component {


    state = {
        list: [],
        tempList: [],
        text: ""
    }

    static dialogInstance
    static show(config) {


        this.dialogInstance.showDialog(config)

    }

    static hide() {


        this.dialogInstance.hideDialog()

    }
    hideDialog = () => {

        this.setState({
            visible: false
        })

    }
    componentDidMount() {
        if (this.props.onRef != null) {
            this.props.onRef(this)
        }
    }

    showDialog(config) {


        this.setState({
            visible: true,
            title: config.title,
            list: config.data || [],
            tempList: config.data || [],
            cancelable: true,
            onSelect: config.onSelect,
            children: config.extraView
        })
    }

    onSearch = (text) => {

        const list = this.state.tempList.filter((l) => l.name?.toLowerCase().includes(text.toLowerCase()))

        this.setState({ list: [...list] })
    }

    render() {

        let { visible, onDismiss, children, cancelable, title, message, positiveButton, negativeButton, onTouchOutside } = { ...this.props, ...this.state }
        if (children)
            console.log(children.length)
        return (
            <KeyboardAvoidingView >
                {/* <StatusBar backgroundColor={"transparent"} /> */}
                <Dialog

                    useNativeDriver={true}
                    dialogAnimation={new SlideAnimation({
                        slideFrom: 'bottom',


                    })}
                    visible={visible || false}
                    containerStyle={{
                        justifyContent: "flex-end", paddingTop: 150,
                    }}
                    dialogStyle={styles.dialog}
                    onTouchOutside={() => {
                        if (cancelable) {
                            this.hideDialog()
                        }
                        if (onTouchOutside)
                            onTouchOutside()
                    }}
                    onHardwareBackPress={() => {
                        if (cancelable) {
                            this.hideDialog()
                        }

                        return true
                    }}
                    onDismiss={onDismiss}
                    dialogTitle={
                        title ? <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <DialogTitle textStyle={styles.titleStyle}
                                style={styles.titleContainerStyle}
                                align='left' title={title}></DialogTitle>
                            <Icon onPress={this.hideDialog} name="close" style={{ marginEnd: 8 }} />
                        </View> : undefined
                    }


                >

                    <DialogContent style={styles.dialogContent}>

                        <SearchBar editable onChangeText={this.onSearch} />
                        {this.state.list && this.state.list.length > 0 ? <FlatList
                            data={this.state.list}
                            style={{ marginBottom: ResponsivePixels.size100 }}
                            keyboardShouldPersistTaps={"handled"}
                            initialNumToRender={100}
                            renderItem={({ item }) =>
                                <Clickable onPress={() => {
                                    this.hideDialog()
                                    if (this.state.onSelect) {
                                        this.state.onSelect(item)
                                    }
                                }} style={{
                                    flexDirection: "row", paddingVertical: 12,
                                    borderBottomColor: Colors.grayColor, borderBottomWidth: 0.5,
                                    paddingBottom: 16,

                                }}>
                                    <Text style={{
                                        color: Colors.black2,
                                        fontFamily: FontName.regular, fontSize: ResponsivePixels.size20,
                                    }}>{item.name}</Text>

                                </Clickable>}
                        /> : <Text style={{
                            color: Colors.black2,
                            alignSelf: "center",
                            fontFamily: FontName.regular, fontSize: ResponsivePixels.size20
                        }}>{"No data found"}</Text>}
                    </DialogContent>
                </Dialog>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({

    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: "#90111111"
    },

    titleContainerStyle: {
        backgroundColor: Colors.white,
        justifyContent: 'center',
        borderBottomWidth: 0,
        flex: 1,

    },
    dialogContent: {
        backgroundColor: Colors.white, width: Dimensions.get("screen").width,
    },

    titleStyle: {
        backgroundColor: Colors.white,
        color: Colors.black2,
        fontFamily: FontName.bold,
        fontSize: ResponsivePixels.size20,
    },
    messageStyle: {
        color: Colors.black2,
        fontFamily: FontName.regular,
        fontSize: ResponsivePixels.size19,
        lineHeight: 19
    },
    dialog: {
        backgroundColor: Colors.white,
        borderRadius: 3,
    },
    btnContainer: {

        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    btnStyle: {
        backgroundColor: Colors.white
    }
    , positiveTextStyle: {

        color: Colors.blue,
        fontFamily: FontName.medium,
        fontSize: ResponsivePixels.size17,
    },
    negativeTextStyle: {

        color: Colors.grayColor,
        fontFamily: FontName.medium,
        fontSize: ResponsivePixels.size17,
    }

})