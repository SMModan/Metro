import { getDistance } from "geolib";
import { Platform } from "react-native";
import backgroundServer from "react-native-background-actions";
import Geolocation from 'react-native-geolocation-service';
import { PERMISSIONS, requestMultiple } from "react-native-permissions";
import { store } from "../../App";
import { setSessionField } from "../../reducers/SessionReducer";
import { Colors } from "../../utils";
export const subscribeForLocationAndRequestService = () => {
    const options = {
        taskName: 'MetroBgTask',
        taskTitle: 'Car Trip',
        taskDesc: 'Running',
        taskIcon: {
            name: 'launch_screen',
            type: 'drawable'
        },
        color: Colors.primary,
        linkingURI: 'MetroBgTask://fromNotification', // See Deep Linking for more info
        parameters: {
            delay: 5000,
        },
    };

    backgroundServer.start(doBgTask, options)
}

const doBgTask = async (taskDataArguments) => {


    return new Promise(() => {

        subscribeForLocation()

    })
}

export const unSubscribeForLocation =()=>{
console.log("unSubscribeForLocation {{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}")

    Geolocation.stopObserving();
}

const subscribeForLocation = () => {

    Geolocation.watchPosition((geoPosition) => {
console.log("geoPosition {{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}",geoPosition)
        const { coords } = geoPosition
        const session = store.getState().session
        const currentTrip ="123"
        let distances = session.distances || 0
        distances=  parseInt(distances);
        console.log("distances  =================>>>>>>>>>>",distances)

        if (session.current_location  && session.current_location.latitude && session.current_location.longitude) {
            const distanceGot = getDistance({ latitude: session.current_location.latitude, longitude: session.current_location.longitude },
                { latitude: coords.latitude, longitude: coords.longitude }
            )

            
            distances += distanceGot
            console.log("distanceGot  =================>>>>>>>>>>",distanceGot)
        console.log("distancesafterrrr  =================>>>>>>>>>>",distances)

            store.dispatch(setSessionField("distances", distances))

        }
        // console.log("current_location", coords)
        // console.log("lastDistance", distances)

        store.dispatch(setSessionField("current_location", coords))

        console.log("Stored longitude=================>>>>>>>>>>",coords.longitude)
        console.log("Stored latitude=================>>>>>>>>>>",coords.latitude)

        // store.dispatch(setSessionField("current_location", coords))
    }, (error) => {
        console.log("error  =================>>>>>>>>>>",error)
    }, {
        distanceFilter: 0,
        interval: 30,
        forceRequestLocation: true,
        showLocationDialog: true
    })
}

export const askForLocationPermission = (onGrant) => {

    if (Platform.OS == "android") {

        // 29
        requestMultiple([PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION, PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION], { message: "We required your location to get to food deliveries requests.", title: "Location Permission", buttonPositive: "Go to Settings" })
            .then((res) => {


                console.log("LocationPermission", res)
                if (res["android.permission.ACCESS_BACKGROUND_LOCATION"] == "granted"
                    && res["android.permission.ACCESS_COARSE_LOCATION"] == "granted"
                    && res["android.permission.ACCESS_FINE_LOCATION"] == "granted"
                    && onGrant)
                    onGrant()

            })
    } else {

        requestMultiple([PERMISSIONS.IOS.LOCATION_WHEN_IN_USE, PERMISSIONS.IOS.LOCATION_ALWAYS], { message: "We required your location to get to food deliveries requests.", title: "Location Permission", buttonPositive: "Go to Settings" })
            .then((res) => {


                console.log("LocationPermission", res)
                if (res["ios.permission.LOCATION_WHEN_IN_USE"] == "granted"
                    || res["ios.permission.LOCATION_ALWAYS"] == "granted"
                    && onGrant)
                    onGrant()

            })
    }
}