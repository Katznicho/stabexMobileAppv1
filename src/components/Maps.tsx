import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import MapHeader from './MapHeader';
import { useNavigation } from '@react-navigation/native';


export default ({ stations, position }: any) => {



    const navigation = useNavigation<any>();

    const onMarkerSelected = (marker: any) => {

        return navigation.navigate('StationDetails', { data: marker })
    }

    return (
        <View style={styles.container}>
            <View>
                <MapHeader />
            </View>
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
                {
                    stations?.map((item: any, index: number) => (

                        <Marker
                            key={item?.id}
                            coordinate={{
                                latitude: parseFloat(item?.lat),
                                longitude: parseFloat(item?.lon)
                            }}
                            // pinColor={COLORS.primaryOrangeHex}

                            title={item?.name}
                            description={item?.name}
                            onPress={() => onMarkerSelected(item)}
                        >
                            <Image
                                source={require('../assets/app_images/red-maker.png')}
                                style={{ width: 40, height: 60 }}
                            />
                        </Marker>
                    ))
                }
            </MapView>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: "100%",
        width: "100%",
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});