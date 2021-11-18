import backgroundServer from "react-native-background-actions"
import { PERMISSIONS, request, requestMultiple } from "react-native-permissions";
import Geolocation from 'react-native-geolocation-service';
import { store } from "../../App";
import { AppState, Linking, Platform } from "react-native";
import { setSessionField } from "../../reducers/SessionReducer";
import { Colors } from "../../utils";
import { getDistance } from "geolib"
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
            delay: 1000,
        },
    };

    backgroundServer.start(doBgTask, options)
}

const doBgTask = async (taskDataArguments) => {


    return new Promise(() => {

        subscribeForLocation()

    })
}

const subscribeForLocation = () => {

    Geolocation.watchPosition((geoPosition) => {

        const { coords } = geoPosition
        const session = store.getState().session
        const { currentTrip } = session
        const distances = session.distances || []
        const lastDistanceIndex = distances.findIndex((item) => item.id == currentTrip)
        let lastDistance = lastDistanceIndex >= 0 ? distances[lastDistanceIndex]?.distance : 0
        if (session.current_location && session.currentTrip && session.current_location.latitude && session.current_location.longitude) {
            const distanceGot = getDistance({ latitude: session.current_location.latitude, longitude: session.current_location.longitude },
                { latitude: coords.latitude, longitude: coords.longitude }
            )

            lastDistance += distanceGot
            if (lastDistanceIndex >= 0) {
                distances.splice(lastDistanceIndex, 1, { ...distances[lastDistanceIndex], distance: lastDistance })
            } else {
                distances.push({ id: currentTrip, distance: lastDistance })

            }
            store.dispatch(setSessionField("distances", [...distances]))

        }
        // console.log("current_location", coords)
        // console.log("lastDistance", distances)
        store.dispatch(setSessionField("current_location", coords))
    }, (error) => {

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