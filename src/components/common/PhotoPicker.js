import { ActionSheet } from "native-base";
import { Platform, PermissionsAndroid } from "react-native";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export default showPhotoPicker = ({ onFileSelect, crop, document, title, noImage,onlyCamera, extraParam = {} }) => {

    let options = []
    if(onlyCamera){
        options.push({ key: "Camera", title: "Camera" })
    }else if (!noImage) {
        options.push({ key: "Camera", title: "Camera" })
        options.push({ key: "Gallery", title: "Gallery" })
    }
    const config = {
        title: "Select",
        quality: 0.3,
        saveToPhotos: false,
        includeBase64: true

    };


    if (extraParam.value)
        options.push({ key: "extra", title: extraParam.value })

    options.push({ key: "cancel", title: "Cancel" })

    ActionSheet.show({ options: options.map(v => v.title), title: title || "Select Option", cancelButtonIndex: options.length - 1 }, async (actionIndex) => {

        if (actionIndex > options.length - 1)
            return

        const { key } = options[actionIndex]

        if (!key)
            return

        switch (key) {

            case 'Camera': {

                // ImageCropPicker.openCamera({

                //     width: 300,
                //     height: 400,
                //     cropping: crop,
                //     cropperCircleOverlay: crop
                // }, (image) => {
                //     if (image) {
                //         image.source = { uri: image.path }
                //         onFileSelect(image)
                //     }
                // })

                if (Platform.OS == "android") {

                    let result;
                    try {

                        result = await PermissionsAndroid.request("android.permission.CAMERA", {
                            buttonPositive: "Okay",
                            message: "Please grant camera permission if you want set profile picture from camera.",
                            buttonNegative: "Close",
                        })
                    } catch (error) {
                        console.log("CameraError", error)
                    }

                    if (!result || result != "granted")
                        return


                }

                launchCamera(config, (response) => {

                    const { assets } = response
                    if (response.didCancel) {
                        console.log('User cancelled image picker');
                    } else if (response.errorCode) {
                        console.log('ImagePicker errorCode: ', response.errorCode);
                    } else {

                        const finalResponse = assets[0]
                        // You can also display the image using data:
                        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                        finalResponse.source = { uri: assets[0].uri }
                        // ImageCropPicker.openCropper({
                        //     path: response.path,
                        //     cropping: true,
                        //     cropperCircleOverlay: true,
                        //     width: 1000,
                        //     height: 1000
                        // }, (image) => {

                        // })
                        // console.log("finalResponse", finalResponse)

                        onFileSelect(finalResponse)
                    }

                })

                break;
            }
            case 'Gallery': {


                // ImageCropPicker.openPicker({
                //     width: 300,
                //     height: 400,
                //     cropping: crop,
                //     cropperCircleOverlay: crop,
                // }).then(image => {
                //     image.uri = image.path
                //     image.source = { uri: image.path }
                //     onFileSelect(image)
                // });

                launchImageLibrary(config, (response) => {
                    const { assets } = response

                    if (response.didCancel) {
                        console.log('User cancelled image picker');
                    } else if (response.errorCode) {
                        console.log('ImagePicker errorCode: ', response.errorCode);
                    } else {

                        // You can also displa
                        const finalResponse = assets[0]
                        // You can also display the image using data:
                        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                        finalResponse.source = { uri: assets[0].uri }
                        // ImageCropPicker.openCropper({
                        //     path: response.path,
                        //     cropping: true,
                        //     cropperCircleOverlay: true,
                        //     width: 1000,
                        //     height: 1000
                        // }, (image) => {

                        // })
                        onFileSelect(finalResponse)
                    }
                })
                break;
            }

            case "extra": {

                if (extraParam.callback)
                    extraParam.callback()
            }

        }

    })

}