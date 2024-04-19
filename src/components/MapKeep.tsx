import { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import MapHeader from './MapHeader';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../theme/theme';
import MapView, { Cluster } from "react-native-map-clustering"; // Import Cluster and Marker as ClusterMarker
import { generalStyles } from '../screens/utils/generatStyles';
import { calculateDistance } from '../screens/utils/helpers/helpers';

export default ({ stations, position }: any) => {
    const navigation = useNavigation<any>();

    const onMarkerSelected = (marker: any) => {
        return navigation.navigate('StationDetails', { data: marker, position });
    };

    const openMapsForDirections = (item: any) => {
        const destination = `${item?.latitude},${item?.longitude}`;
        const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
        return Linking.openURL(url);
    };

    // Calculate distance between two coordinates
    const distance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        const R = 6371; // Radius of the earth in km
        const dLat = (lat2 - lat1) * Math.PI / 180; // deg2rad below
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a =
            0.5 - Math.cos(dLat) / 2 +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            (1 - Math.cos(dLon)) / 2;

        return R * 2 * Math.asin(Math.sqrt(a));
    };

    return (
        <View style={styles.container}>
            <View>
                <MapHeader />
            </View>
            {distance(position.latitude, position.longitude, stations[0]?.latitude, stations[0]?.longitude) < 100 && // Adjust the threshold distance as needed
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    region={{
                        latitude: position?.latitude || 0,
                        longitude: position?.longitude || 0,
                        latitudeDelta: 0.9,
                        longitudeDelta: 0.9,
                    }}
                >
                    {stations?.map((item: any, index: number) => (
                        <Marker
                            draggable
                            key={index}
                            coordinate={{
                                latitude: parseFloat(item?.latitude),
                                longitude: parseFloat(item?.longitude)
                            }}
                            pinColor={COLORS.primaryOrangeHex}
                            title={item?.name}
                            description={item?.name}
                        >
                            <Image
                                source={require('../assets/app_images/red-maker.png')}
                                style={{ width: 40, height: 60 }}
                            />
                            <Callout
                                onPress={() => onMarkerSelected(item)}
                                style={styles.containerCalloutStyle}
                            >
                                <View style={[generalStyles.centerContent]}>
                                    <View>
                                        <Text style={[generalStyles.CardSubtitle]}>Station Name</Text>
                                    </View>
                                    <View>
                                        <Text style={[generalStyles.CardTitle]}>{item?.station_name}</Text>
                                    </View>
                                    <View>
                                        <Text style={[generalStyles.CardSubtitle]}>Distance</Text>
                                    </View>
                                    <View>
                                        <Text style={[generalStyles.CardTitle]}>
                                            {calculateDistance(position?.latitude, position?.longitude, parseFloat(item?.latitude), parseFloat(item?.longitude))} kms away
                                        </Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => openMapsForDirections(item)}
                                    >
                                        <Text style={[generalStyles.CardTitle, { color: COLORS.primaryRedHex }]}>Get Directions</Text>
                                    </TouchableOpacity>
                                </View>
                            </Callout>
                        </Marker>
                    ))}
                </MapView>
            }
        </View>
    );
};

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
    containerCalloutStyle: {
        width: 200,
        backgroundColor: COLORS.primaryBlackHex,
        borderRadius: 20,
    }
});
