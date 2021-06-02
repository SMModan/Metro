import React from 'react'
import { ActionSheet } from "native-base";
import ImagePicker from 'react-native-image-picker'
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import Images from '../../Images';

export default showPhotoPicker = ({ onFileSelect, document, title, noImage }) => {

    let options = []
    if (!noImage) {
        options.push('Camera')
        options.push('Gallery')
    }
    const config = {
        title: 'Select photo',
        storageOptions: {
            skipBackup: true,
            waitUntilSaved: true,
            cameraRoll: true,
            path: 'images',
        },
    };

    if (document)
        options.push('Document')

    options.push('Cancel')

    ActionSheet.show({ options: options, title: title || 'Select Option', cancelButtonIndex: 3 }, (actionIndex) => {


        switch (options[actionIndex]) {

            case 'Camera': {
                ImagePicker.launchCamera(config, (response) => {

                    if (response.didCancel) {
                        console.log('User cancelled image picker');
                    } else if (response.error) {
                        console.log('ImagePicker Error: ', response.error);
                    } else if (response.customButton) {
                        console.log('User tapped custom button: ', response.customButton);
                    } else {

                        // You can also display the image using data:
                        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                        response.source = { uri: response.uri }

                        onFileSelect(response)
                    }

                })

                break;
            }
            case 'Gallery': {

                ImagePicker.launchImageLibrary(config, (response) => {
                    if (response.didCancel) {
                        console.log('User cancelled image picker');
                    } else if (response.error) {
                        console.log('ImagePicker Error: ', response.error);
                    } else if (response.customButton) {
                        console.log('User tapped custom button: ', response.customButton);
                    } else {

                        // You can also display the image using data:
                        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                        response.source = { uri: response.uri }

                        onFileSelect(response)
                    }
                })
                break;
            }
            case 'Document': {

                DocumentPicker.show({
                    filetype: [DocumentPickerUtil.pdf()],
                }, (error, res) => {
                    // Android

                    if (!error) {
                        res.source = Images.pdf
                        onFileSelect(res)
                    }
                });
                break;
            }

        }

    })

}