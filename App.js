import { StatusBar } from 'expo-status-bar';
import { PermissionsAndroid, Platform } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

const getLocation = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
        return;
    }

    Geolocation.getCurrentPosition(
        (position) => {
            setCoords(position.coords);
            console.log(position);
        },
        (error) => {
            console.error('Code ${error.code}', error.message);
            console.log(error)
        },
        {
            accuracy: {
                android: "high",
            },
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000,
            distanceFilter: 0,
            forceRequestLocation: true,
            forceLocationManager: true,
            showLocationDialog: true,
        }
    );
};

const hasLocationPermission = async () => {
    if (Platform.OS === "android" && Platform.Version < 23) {
        return true;
    }

    const hasPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (hasPermission) {
        return true;
    }

    const status = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
        console.log("Location permission denied by user");
    } else if (status === Permissions.RESULTS.NEVER_ASK_AGAIN) {
        console.log("Location permission denied by user");
    }
    return false;
};

export default function App() {
    return (
        <View style={styles.container}>
            <Text>Open up App.js to start working on your app!</Text>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
