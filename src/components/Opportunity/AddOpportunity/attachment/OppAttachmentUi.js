import React from 'react'
import { Image } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { strings } from '../../../../language/Language'
import { push } from '../../../../navigation/Navigator'
import { Colors, Images, Utils } from '../../../../utils'
import ResponsivePixels from '../../../../utils/ResponsivePixels'
import { Button, ChipViewContainer, FloatingEditText, ScrollContainer, ViewWithTitle } from '../../../common'

const OppAttachmentUi = () => {
    return (
        <ScrollContainer>
            <View style={styles.mainView}>

                <View style={styles.uploadView}>

                    <Image source={Images.ic_upload} />
                    <Text style={styles.uploadText}>Upload here</Text>
                </View>
                <ViewWithTitle innerStyle={{
                    backgroundColor: Colors.white, paddingHorizontal: ResponsivePixels.size16,
                }} title="Document(s)">

                    <FloatingEditText onPress={() => {
                        // Utils.showToast("Test")
                        console.log("Print")
                    }} label={"Business Presentation"} editable={false} rightIcon={Images.ic_dot_menu} />
                    <FloatingEditText label={"Project Proposal"} editable={false} rightIcon={Images.ic_dot_menu} />
                </ViewWithTitle>


                {/* <Button title={strings.save} style={{ margin: ResponsivePixels.size16 }} /> */}
            </View>
        </ScrollContainer>
    )
}

export default OppAttachmentUi

const styles = StyleSheet.create({

    mainView: {
        flex: 1,
        backgroundColor: Colors.secondary50
    },
    uploadView: {
        height: ResponsivePixels.size150,
        borderRadius: ResponsivePixels.size16,
        borderColor: Colors.blueGray400,
        borderStyle: "dashed",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.blueGray200,
        borderWidth: 1,
        margin: ResponsivePixels.size16
    },
    uploadText: {
        color: Colors.blueGray900,
        fontSize: ResponsivePixels.size15,
        lineHeight: ResponsivePixels.size22,
        fontWeight: "600"
    }
})
