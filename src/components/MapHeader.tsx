import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import {  COLORS,  SPACING } from '../theme/theme';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { generalStyles } from '../screens/utils/generatStyles';
import Entypo from 'react-native-vector-icons/Entypo';
navigator.geolocation = require("@react-native-community/geolocation")

const MapHeader = () => {



    const [location, setLocation] = useState<any>({ lat: 0, lng: 0 })
    const [loading, setLoading] = useState(true)

    return (
        <View style={styles.headerContainer}>
            <View style={styles.InputContainerComponent}>

                {/* location */}
                <GooglePlacesAutocomplete
                    nearbyPlacesAPI="GooglePlacesSearch"
                    placeholder={"search stabex station "}
                    currentLocation={true}
                    enableHighAccuracyLocation={true}
                    autoFillOnNotFound={true}
                    textInputProps={{
                        placeholderTextColor: COLORS.primaryWhiteHex
                    }}
                    renderRow={(data) => <View style={[generalStyles.flexStyles, { alignItems: 'center' }]}>
                        <Entypo name="location-pin" color={COLORS.primaryOrangeHex} size={20} />
                        <Text style={{ color: COLORS.primaryOrangeHex }}>{data.description}</Text>
                    </View>}

                    renderDescription={(row) => row.description}
                    fetchDetails={true}
                    debounce={400}
                    onFail={(error) => {
                    }}
                    enablePoweredByContainer={false}
                    minLength={2}
                    styles={{
                        container: {
                            flex: 1,
                            width: "100%",
                            backgroundColor: COLORS.primaryBlackHex,
                            marginHorizontal: 0,
                            marginVertical: 10
                        },
                        textInputContainer: {
                            backgroundColor: COLORS.primaryBlackHex,
                            borderTopWidth: 0,
                            borderBottomWidth: 0,
                            marginHorizontal: 20,
                            borderRadius: 20,
                        },
                        textInput: {
                            color: COLORS.primaryWhiteHex,
                            backgroundColor: COLORS.primaryBlackHex,
                            fontSize: 16,
                            borderWidth: 0.5,
                            borderColor: COLORS.primaryWhiteHex,
                            width: "100%",
                        },
                        predefinedPlacesDescription: {
                            color: COLORS.primaryOrangeHex,
                        },
                        listView: {
                            backgroundColor: COLORS.primaryBlackHex,
                            borderRadius: 10,
                            // marginHorizontal: 10,
                            marginTop: 10,
                            // elevation: 5,
                            zIndex: 5,
                        },
                        row: {
                            backgroundColor: COLORS.primaryBlackHex,
                            padding: 13,
                            height: 50,
                            flexDirection: 'row',
                        },
                        separator: {
                            height: 0.5,
                            backgroundColor: COLORS.primaryOrangeHex,
                        },
                        description: {
                            color: COLORS.primaryOrangeHex,
                        },
                        poweredContainer: {
                            backgroundColor: COLORS.primaryBlackHex,
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10,
                            borderColor: COLORS.primaryOrangeHex,
                            borderTopWidth: 0.5,
                        },
                        powered: {
                            color: COLORS.primaryOrangeHex,
                        },
                    }}
                    onPress={(data, details = null) => {
                        setLocation({
                            lat: details?.geometry.location.lat,
                            lng: details?.geometry.location.lng
                        })
                    }}
                    query={{
                        key: 'AIzaSyBXkd1LbK_vv70_iP2yw7tH1VJJPQF_ho8',
                        language: 'en',
                        components: 'country:ug'
                    }}
                    GooglePlacesDetailsQuery={{
                        fields: ['formatted_address', 'geometry'],
                        language: 'en',
                        components: 'country:ug',


                    }}
                />
                {/* location */}
            </View>
        </View>
    )
}

export default MapHeader

const styles = StyleSheet.create({
    headerContainer: {
        position: 'absolute',
        zIndex: 10,
        padding: 5,
        width: "100%"

    },
    InputContainerComponent: {
        flexDirection: 'row',
        marginHorizontal: SPACING.space_10,
        marginVertical: SPACING.space_10,
        // borderRadius: BORDERRADIUS.radius_20,
        backgroundColor: COLORS.primaryBlackHex,
        alignItems: 'center',
    },

})