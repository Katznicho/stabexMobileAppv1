import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import MapHeader from './MapHeader';
import { useNavigation } from '@react-navigation/native';
import useGetUserLocation from '../hooks/useGetUserLocation';
import { generalStyles } from '../screens/utils/generatStyles';
import { ActivityIndicator } from './ActivityIndicator';


// {
//     place && (<Marker

//         coordinate={{
//             latitude: parseFloat(place?.latitude),
//             longitude: parseFloat(place?.longitude)
//         }}
//         // pinColor={COLORS.primaryOrangeHex}

//         title={place?.name}
//         description={place?.name}
//         onPress={() => onMarkerSelected(place)}
//     >
//         <Image
//             source={require('../assets/app_images/red-maker.png')}
//             style={{ width: 40, height: 60 }}
//         />
//     </Marker>)
// }


const LocationFinder = () => {

    const onMarkerSelected = (marker: any) => {

        const navigation = useNavigation<any>();

        return navigation.navigate('StationDetails', { data: marker })
    }

    const [place, setPlace] = React.useState<any>({});
    const { position } = useGetUserLocation()

    const [openPicker, setOpenPicker] = React.useState<boolean>(false)

    if (position == null) {
        return <View style={[{ flex: 1 }, generalStyles.ScreenContainer]}>
            <ActivityIndicator />

        </View>
    }




    return (
        <View style={styles.container}>

            <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                region={{
                    latitude: position?.latitude,
                    longitude: position?.longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
                showsUserLocation
                showsMyLocationButton
            >

            </MapView>
        </View>
    )
}

export default LocationFinder

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: "100%",
        width: "100%",
        // justifyContent: 'flex-end',
        // alignItems: 'center',
        // position: 'absolute',
        // top: 0,
        // left: 0,
        // right: 0,
        // bottom: 0,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    
});