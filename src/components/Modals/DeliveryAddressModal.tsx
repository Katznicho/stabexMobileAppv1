import { StyleSheet, ScrollView, TouchableOpacity, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react';
import RBSheet from "react-native-raw-bottom-sheet";
import { COLORS } from '../../theme/theme';
import { generalStyles } from '../../screens/utils/generatStyles';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import useGetUserLocation from '../../hooks/useGetUserLocation';




type Props = {
    openPicker: boolean;
    setOpenPicker: (openPicker: boolean) => void;
    deliveryAddress: any[],
    selectedDeliveryAddress: string,
    setSelectedDeliveryAddress: (selectedDeliveryAddress: any) => void
};

const DeliveryAddressModal: React.FC<Props> = ({ openPicker, setOpenPicker, deliveryAddress, selectedDeliveryAddress, setSelectedDeliveryAddress }: Props) => {

    const { position } = useGetUserLocation()

    const refRBSheet = useRef<any>();

    const [currentLocation, setCurrentLocation] = useState<any>(null)

    useEffect(() => {
        if (openPicker) {
            refRBSheet.current?.open();
        } else {
            refRBSheet.current?.close();
        }
    }, [openPicker]);

    const navigation = useNavigation<any>()

    const reverseGeocode = async (latitude: string, longitude: string) => {
        try {
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBXkd1LbK_vv70_iP2yw7tH1VJJPQF_ho8`
            );
            if (response.data && response.data.results && response.data.results.length > 0) {
                return response.data.results[0];
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error fetching reverse geocoding data:', JSON.stringify(error));
            return null;
        }
    };

    useEffect(() => {
        if (!position) return
        else {

            reverseGeocode(position?.latitude, position?.longitude).then((address: any) => {
                if (!address) return
                else {

                    return setCurrentLocation({
                        address: address?.formatted_address,
                        latitude: address?.geometry?.location?.lat,
                        longitude: address?.geometry?.location?.lng,
                        address_type: "Current Location"
                    })
                }
            }).catch((error) => {

            })

        }

    }, [position])


    return (
        <RBSheet
            ref={refRBSheet}
            height={550}
            closeOnDragDown={false}
            closeOnPressMask={false}
            // openDuration={250}
            customStyles={{
                container: {
                    // justifyContent: 'center',
                    // alignItems: 'center',
                    backgroundColor: COLORS.primaryBlackHex,
                    borderRadius: 10,
                    elevation: 10
                },

                wrapper: {
                    backgroundColor: 'transparent',
                },
                draggableIcon: {
                    backgroundColor: '#000',
                },

            }}
        >
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 20 }}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => setOpenPicker(false)}
                    style={[generalStyles.centerContent, { position: 'absolute', top: 10, right: 10 }]}
                >
                    <AntDesign
                        name="close"
                        size={25}
                        color={COLORS.primaryRedHex}
                        onPress={() => setOpenPicker(false)}
                    />

                </TouchableOpacity>
                <View>
                    <View style={[generalStyles.viewStyles, generalStyles.centerContent]}>
                        <Text style={generalStyles.CardTitle}>
                            Select Delivery Address
                        </Text>
                    </View>
                </View>

                {/* add delivery address */}
                <View>
                    <TouchableOpacity
                        style={[generalStyles.loginContainer, styles.buttonStyles]}
                        activeOpacity={1}

                        onPress={() => {
                            navigation.navigate('AddAddress')
                            return setOpenPicker(false);
                        }}
                    >
                        <Text style={generalStyles.loginText}>{'Add Delivery Address'}</Text>
                    </TouchableOpacity>

                </View>
                {/* add delivery address */}

                <View>
                    <View style={[generalStyles.viewStyles, generalStyles.centerContent]}>
                        <Text style={generalStyles.CardTitle}>Use Current Location</Text>
                    </View>
                    <TouchableOpacity

                        style={{
                            ...generalStyles.flexStyles,
                            alignItems: 'center',
                            borderWidth: 0.5,
                            borderColor: COLORS.primaryBlackHex,
                            borderRadius: 10,
                            padding: 10,
                            backgroundColor: COLORS.primaryBlackHex,
                            elevation: 10,
                            marginVertical: 10,
                            marginHorizontal: 10
                        }}
                        onPress={() => {
                            setSelectedDeliveryAddress(currentLocation)
                            return setOpenPicker(false);
                        }}

                    >
                        <View style={[generalStyles.flexStyles]}>
                            <Entypo
                                name="location-pin"
                                size={25}
                                color={COLORS.primaryOrangeHex}
                            />
                            <View>
                                <Text style={[generalStyles.CardSubtitle, { textTransform: 'capitalize', fontWeight: "bold" }]}>Current Location</Text>
                                <Text style={[generalStyles.CardSubtitle]}>
                                    {currentLocation == null ? "fetching location" : currentLocation?.address}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View>
                    <View style={[generalStyles.viewStyles, generalStyles.centerContent]}>
                        <Text style={generalStyles.CardTitle}>Saved Addresses</Text>
                    </View>
                    {
                        deliveryAddress?.length > 0 ? deliveryAddress?.map((item: any, index: number) => {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                        setSelectedDeliveryAddress(item)
                                        return setOpenPicker(false)
                                    }}
                                    style={{
                                        ...generalStyles.flexStyles,
                                        alignItems: 'center',
                                        borderWidth: 0.5,
                                        borderColor: COLORS.primaryBlackHex,
                                        borderRadius: 10,
                                        padding: 10,
                                        backgroundColor: COLORS.primaryBlackHex,
                                        elevation: 10,
                                        marginVertical: 10,
                                        marginHorizontal: 10
                                    }}

                                >
                                    <View style={[generalStyles.flexStyles]}>
                                        <Entypo
                                            name="location-pin"
                                            size={25}
                                            color={COLORS.primaryOrangeHex}
                                        />
                                        <View>
                                            <Text style={[generalStyles.CardSubtitle, { textTransform: 'capitalize', fontWeight: "bold" }]}>{item.address_type}</Text>
                                            <Text style={[generalStyles.CardSubtitle]}>{item.address}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            );
                        }) : <View style={[generalStyles.viewStyles]}>
                            <Text style={generalStyles.CardSubtitle}>No Saved Addresses</Text>
                        </View>
                    }

                </View>


            </ScrollView>
        </RBSheet>

    )
}

export default DeliveryAddressModal

const styles = StyleSheet.create({
    buttonStyles: {
        width: "95%",
        marginTop: 10,
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 10
    },
})