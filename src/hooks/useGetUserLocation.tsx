import React from 'react';
import Geolocation from '@react-native-community/geolocation';
import { RootState } from '../redux/store/dev';
import { useSelector } from 'react-redux';


const useGetUserLocation = () => {
    const [position, setPosition] = React.useState<any>(null);

    const getCurrentPosition = () => {
        Geolocation.getCurrentPosition(
            (pos: { coords: { latitude: any; longitude: any; }; }) => {
                const { latitude, longitude } = pos.coords;
                return setPosition({ latitude, longitude });

            },
            (error: any) => {
                console.error("Error getting current position:", error);
                console.log("Error getting current position:", error);
            },
            { enableHighAccuracy: true }
        );
    };

    React.useEffect(() => {
        getCurrentPosition();
    }, []);

    return {
        position
    };
};

export default useGetUserLocation

