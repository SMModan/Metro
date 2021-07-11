import { ActionSheet, Item } from 'native-base'
import React, { useState } from 'react'
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import { strings } from '../../../../language/Language'
import { push } from '../../../../navigation/Navigator'
import { Colors, Images, Utils } from '../../../../utils'
import ResponsivePixels from '../../../../utils/ResponsivePixels'
import { Button, MainContainer, ChipViewContainer, Clickable, FloatingEditText, ScrollContainer, ViewWithTitle, MyFlatList, ProgressView, ImageButton } from '../../../common'
import { Button as DialogButton, TextInput, Dialog, Portal, RadioButton, Menu } from 'react-native-paper'

const OppAttachmentUi = ({ onBrowse, documentName, onEdit, attachments, selectedAttachment, onDone, loading, onDismissed, visibleDialog, editMode, onDocumentNameChanged, onDelete, onEditDone, visibleEditDialog }) => {
    console.log("selectedAttachment", selectedAttachment)


    const showOption = (item) => {
        ActionSheet.show({
            options: ["Edit", "Delete", "Cancel"],
            title: "Select Option",
            cancelButtonIndex: 2,

        }, (optionIndex) => {

            if (optionIndex == 0) {
                onEdit(item)
            } else if (optionIndex == 1) {
                onDelete(item)

            }
        })
    }

    return (
        <MainContainer header={!editMode ? { title: "Attachment" } : undefined}>
            <ScrollContainer>
                <View style={styles.mainView}>
                    {loading ? <ProgressView /> : <View style={styles.mainView}>
                        <View style={styles.mainView}>
                            <MyFlatList
                                noDataMsg={" "}
                                data={attachments}
                                style={{ flex: 1 }}
                                renderItem={({ item, index }) => {
                                    return (

                                        <View>
                                            <Clickable onPress={() => {
                                                // onBrowse(true)
                                            }} style={{ height: ResponsivePixels.size200 }} >
                                                <ImageBackground imageStyle={{ borderRadius: ResponsivePixels.size16 }} source={item?.file?.source} style={styles.uploadView}>

                                                    {!item.file.source ? <View style={{ justifyContent: "center", alignItems: "center" }}>
                                                        <Image source={Images.ic_upload} />
                                                        <Text style={styles.uploadText}>Upload here</Text>
                                                    </View> : null}
                                                </ImageBackground>
                                            </Clickable>

                                            <ViewWithTitle titleStyle={{ paddingTop: 8 }} innerStyle={{
                                                backgroundColor: Colors.white, paddingHorizontal: ResponsivePixels.size16,
                                            }} title="Document(s)">
                                                <FloatingEditText onPress={() => {
                                                    showOption({ ...item, index })
                                                }} onPressRightIcon={() => {
                                                    showOption({ ...item, index })
                                                }} value={item.name} label={"Document Name"} editable={false} rightIcon={Images.ic_dot_menu} />

                                            </ViewWithTitle>
                                        </View>
                                    )
                                }}
                            />
                        </View>

                        <Button title={"Browse Attachment"} onPress={() => {
                            onBrowse(false)
                        }} style={{ margin: ResponsivePixels.size16 }} />
                    </View>}
                </View>
            </ScrollContainer>

            <Portal>
                <Dialog visible={visibleDialog} onDismiss={onDismissed}>
                    <Dialog.Title>{"Attachment"}</Dialog.Title>
                    <Dialog.Content>
                        <View style={{ paddingVertical: 8 }}>
                            <TextInput label={"Enter Document Name"} onChangeText={onDocumentNameChanged} />
                        </View>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <DialogButton color={Colors.blueGray600} style={{}} onPress={onDismissed}>Cancel</DialogButton>
                        <DialogButton color={Colors.primaryColor500} onPress={onDone}>Done</DialogButton>
                    </Dialog.Actions>
                </Dialog>
            </Portal>


            <Portal>
                <Dialog visible={visibleEditDialog} onDismiss={onDismissed}>
                    <Dialog.Title>{"Edit Attachment"}</Dialog.Title>
                    <Dialog.Content>
                        <View style={{ paddingVertical: 8 }}>
                            <TextInput label={"Enter Document Name"} value={documentName} onChangeText={onDocumentNameChanged} />

                            {/* <Button style={{ marginTop: 8 }} title="Edit Attachment" onPress={onBrowse} /> */}
                            <ImageButton imageStyle={{ height: 100, width: "100%", marginTop: 16 }} onPress={() => {
                                onBrowse(true)
                            }} source={selectedAttachment?.file?.source} />

                        </View>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <DialogButton color={Colors.blueGray600} style={{}} onPress={onDismissed}>Cancel</DialogButton>
                        <DialogButton color={Colors.primaryColor500} onPress={onEditDone}>Save</DialogButton>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </MainContainer>
    )
}

export default OppAttachmentUi

const styles = StyleSheet.create({

    mainView: {
        flex: 1,
        backgroundColor: Colors.secondary50
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
        margin: ResponsivePixels.size16
    },
    uploadText: {
        color: Colors.blueGray900,
        fontSize: ResponsivePixels.size15,
        lineHeight: ResponsivePixels.size22,
        fontWeight: "600"
    }
})
