import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react';
import RBSheet from "react-native-raw-bottom-sheet";
import { COLORS, SPACING } from '../../theme/theme';
import { generalStyles } from '../../screens/utils/generatStyles';
import { useNavigation } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Entypo from 'react-native-vector-icons/Entypo';


type Props = {
    openPicker: boolean;
    setOpenPicker: (openPicker: boolean) => void;
};


const HomeDeliveryPlace: React.FC<Props> = ({ openPicker, setOpenPicker }: Props) => {

    const [location, setLocation] = useState<any>({ lat: 0, lng: 0 })

    const navigation = useNavigation<any>()

    const refRBSheet = useRef<any>();

    useEffect(() => {
        if (openPicker) {
            refRBSheet.current?.open();
        } else {
            refRBSheet.current?.close();
        }
    }, [openPicker]);


    return (
        <RBSheet
            ref={refRBSheet}
            height={500}
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
            <View style={styles.headerContainer}>

                <View style={styles.InputContainerComponent}>

                    {/* location */}
                    <GooglePlacesAutocomplete
                        nearbyPlacesAPI="GooglePlacesSearch"
                        placeholder={"enter delivery location"}

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
                </View>

                <View>
                    <TouchableOpacity
                        style={[generalStyles.loginContainer, styles.buttonStyles]}
                        activeOpacity={1}

                        onPress={() => navigation.navigate("PaymentMethod")}
                    >
                        <Text style={generalStyles.loginText}>{'Proceed'}</Text>
                    </TouchableOpacity>

                </View>
            </View>

        </RBSheet>
    )
}

export default HomeDeliveryPlace

const styles = StyleSheet.create({
    headerContainer: {
    },
    InputContainerComponent: {
        flexDirection: 'row',
        marginHorizontal: SPACING.space_10,
        marginVertical: SPACING.space_10,
        // borderRadius: BORDERRADIUS.radius_20,
        backgroundColor: COLORS.primaryBlackHex,
        alignItems: 'center',
    },
    buttonStyles: {
        width: "85%",
        marginTop: 10,
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 10
    },
})