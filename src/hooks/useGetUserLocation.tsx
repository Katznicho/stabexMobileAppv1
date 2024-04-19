import React from 'react';
import Geolocation from '@react-native-community/geolocation';
import { isLocationEnabled, promptForEnableLocationIfNeeded } from 'react-native-android-location-enabler';
import { Platform } from 'react-native';



const useGetUserLocation = () => {
    const [position, setPosition] = React.useState<any>(null);

    const getCurrentPosition = () => {
        Geolocation.getCurrentPosition(
            (pos: { coords: { latitude: any; longitude: any; }; }) => {
                const { latitude, longitude } = pos.coords;
                return setPosition({ latitude, longitude });
                // return setPosition({ "latitude": "1.2921", "longitude": "36.8219" });

            },
            (error: any) => {
                console.error("Error getting current position:", error);
                console.log("Error getting current position:", error);
            },
            { enableHighAccuracy: true }
        );
    };

    React.useEffect(() => {
        if(Platform.OS === 'android'){
            isLocationEnabled().then((isLocationEnabled) => {
                if (!isLocationEnabled) {
                    promptForEnableLocationIfNeeded();
                } else {
                    getCurrentPosition();
                }
            });
        }
        else{
            getCurrentPosition();
        }

    }, []);

    return {
        position
    };
};

export default useGetUserLocation

