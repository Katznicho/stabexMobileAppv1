import { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import React from 'react';
import { StyleSheet, View, Image, Platform, Text, TouchableOpacity, Linking } from 'react-native';
import MapHeader from './MapHeader';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../theme/theme';
import MapView from "react-native-map-clustering";
import { generalStyles } from '../screens/utils/generatStyles';
import { calculateDistance } from '../screens/utils/helpers/helpers';


export default ({ stations, position }: any) => {

    const navigation = useNavigation<any>();
    // const { position } = useGetUserLocation()

    const onMarkerSelected = (marker: any) => {
        return navigation.navigate('StationDetails', { data: marker, position })
    }
    const openMapsForDirections = (item:any) => {
        const destination = `${item?.latitude},${item?.longitude}`;
        const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
        return Linking.openURL(url);
      };

    return (
        <View style={styles.container}>
            <View>
                <MapHeader />
            </View>
            <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                // mapType={Platform.OS == "android" ? "none" : "standard"}
                region={{
                    latitude: position?.latitude,
                    longitude: position?.longitude,
                    latitudeDelta: 0.9,
                    longitudeDelta: 0.9,

                }}
                showsUserLocation
                showsMyLocationButton
            >
                {
                    stations?.map((item: any, index: number) => {

                        return (<Marker
                            draggable
                            key={index}
                            coordinate={{
                                latitude: parseFloat(item?.latitude),
                                longitude: parseFloat(item?.longitude)
                            }}
                            pinColor={COLORS.primaryOrangeHex}

                            title={item?.name}
                            description={item?.name}
                        // onPress={() => onMarkerSelected(item)}
                        >
                            <Image
                                source={require('../assets/app_images/red-maker.png')}
                                style={{ width: 40, height: 60 }}
                            />
                            <Callout
                                onPress={() => onMarkerSelected(item)}
                                style={styles.containerCalloutStyle}
                            >
                                <View  style={[generalStyles.centerContent]}>
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
                                          <Text style={[generalStyles.CardTitle , {color:COLORS.primaryRedHex}]}>Get Directions</Text>
                                    </TouchableOpacity>

                                </View>


                            </Callout>
                        </Marker>)
                    }
                    )
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
    containerCalloutStyle:{
        width: 200,
        // height: 300,
        backgroundColor: COLORS.primaryBlackHex,
        borderRadius: 20,
    }
});