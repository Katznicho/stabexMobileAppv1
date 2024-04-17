import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { generalStyles } from '../utils/generatStyles'
import { COLORS, FONTFAMILY, SPACING } from '../../theme/theme'
import { Checkbox, Picker } from 'react-native-ui-lib';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Entypo from 'react-native-vector-icons/Entypo';
import { ActivityIndicator } from '../../components/ActivityIndicator';
import { useSelector } from 'react-redux';
import {  SUMBIT_DELIVERY_ADDRESS } from '../utils/constants/routes';
import { showMessage } from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';

const AddAddress = () => {

    const { authToken } = useSelector((state: any) => state.user)

    const navigation = useNavigation<any>()

    const [deliveryAddress, setDeliveryAddress] = useState<any>({
        address_type: "",
        address: "",
        state: "",
        city: "",
        country: "Uganda",
        is_default: false,
        latitude: "",
        longitude: ""

    })

    const [addressType, setAddressType] = useState<any>([
        {
            label: "Home",
            value: "home"
        }, {
            label: "Office",
            value: "office"
        }, {
            label: "Other",
            value: "other"
        }
    ])

    const [loading, setLoading] = useState<boolean>(false)


    const onStoreAddress = () => {

        try {
            const myHeaders = new Headers();

            myHeaders.append("Authorization", `Bearer ${authToken}`);
            myHeaders.append("Content-Type", "application/json");
            setLoading(true)


            const postData = JSON.stringify({
                address_type: deliveryAddress.address_type,
                address: deliveryAddress.address,
                state: deliveryAddress.state,
                city: deliveryAddress.city,
                country: deliveryAddress.country,
                is_default: deliveryAddress.is_default ? 1 : 0,
                latitude: deliveryAddress.latitude,
                longitude: deliveryAddress.longitude
            })

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: postData
            };

            fetch(SUMBIT_DELIVERY_ADDRESS, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    console.log(result)
                    if (result.status == 1) {

                        showMessage({
                            message: "Success",
                            description: "Customer address created successfully",
                            type: "success",
                            autoHide: true,
                            duration: 3000,
                            icon: "success"
                        })
                        return navigation.goBack()

                    }
                    else {

                    }

                })
                .catch((error) => {
                    setLoading(false)
                    return showMessage({
                        message: "Error",
                        description: "Failed to update customer address",
                        type: "info",
                        autoHide: true,
                        duration: 3000,
                        icon: "danger"
                    })
                });

        }
        catch (err) {
            setLoading(false)
            return showMessage({
                message: "Error",
                description: "Failed to update customer address",
                type: "info",
                autoHide: true,
                duration: 3000,
                icon: "danger"
            })
        }

    }


    return (
        <View style={[generalStyles.ScreenContainer, { backgroundColor: COLORS.primaryBlackHex, elevation: 0 }]}>
            
            <View style={[generalStyles.centerContent, {marginVertical:20}]}>
            <Text style={[generalStyles.authTitle, {fontSize:15, color:COLORS.primaryBlackRGBA}]}>
                Add Address
            </Text>

        </View>
            {/* address type */}
            <View style={styles.formContainer}>
                <View>
                    <Text style={[generalStyles.formInputTextStyle, styles.labelStyles]}>Select Address Type*</Text>
                </View>
                <Picker
                    placeholder="select address type"
                    placeholderTextColor={COLORS.primaryWhiteHex}
                    value={deliveryAddress.address_type}
                    style={[generalStyles.formInput, styles.borderStyles, styles.inlineTextInputStyles]}
                    enableModalBlur={false}
                    onChange={item => {
                        setDeliveryAddress((prev: any) => {
                            return { ...prev, address_type: item }
                        })
                    }}
                    trailingAccessory={<View style={styles.iconStyles}>
                        <Entypo name="chevron-down" size={20} color={COLORS.primaryWhiteHex} />
                    </View>}
                    color={COLORS.primaryWhiteHex}
                    topBarProps={{ title: 'select address type' }}

                    showSearch
                    searchPlaceholder={'search address type'}
                    searchStyle={{ color: COLORS.primaryBlackHex, placeholderTextColor: COLORS.primaryBlackHex }}
                // onSearchChange={value => console.warn('value', value)}
                >
                    {addressType.map((item: any) => (
                        <Picker.Item key={item.value}
                            value={item.value}
                            label={item.label}
                        />
                    ))}
                </Picker>
            </View>
            {/* address type */}

            {/* location */}
            <View style={[{ marginHorizontal: 15, marginBottom: -5 }]}>
                <Text style={[generalStyles.formInputTextStyle, styles.labelStyles]}>Your Actual Address*</Text>
            </View>
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
                            // backgroundColor: COLORS.primaryBlackHex,
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
                            marginTop: 10,
                            zIndex: 5,
                        },
                        row: {
                            // backgroundColor: COLORS.primaryBlackHex,
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
                        setDeliveryAddress((prev: any) => {
                            return {
                                ...prev,
                                address: data.description,
                                latitude: details?.geometry.location.lat,
                                longitude: details?.geometry.location.lng
                            }
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


                    }}
                />
            </View>

            {/* location */}

            {/* set address as default */}
            <View style={styles.formContainer}>
                <Checkbox
                    value={deliveryAddress.is_default}
                    label={'Set Address as default'}
                    onValueChange={
                        (value) => {
                            setDeliveryAddress((prev: any) => {
                                return { ...prev, is_default: value }
                            })
                        }
                    }
                />

            </View>
            {/* set address as default */}


            {/* create button */}
            <View style={styles.formContainer}>
                <TouchableOpacity
                    style={[generalStyles.loginContainer, styles.buttonStyles]}
                    activeOpacity={1}
                    onPress={onStoreAddress}
                >
                    <Text style={generalStyles.loginText}>{'Add Address'}</Text>
                </TouchableOpacity>

            </View>
            {/* create button */}

            {
                loading && (<ActivityIndicator />)
            }

        </View >
    )
}

export default AddAddress

const styles = StyleSheet.create({
    viewStyles: {
        marginHorizontal: 10, marginVertical: 5
    },
    borderStyles: {
        borderWidth: 0.5,
        borderBottomWidth: 0.5,
        height: 45,
        borderColor: COLORS.primaryWhiteHex,
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10
    },
    formContainer: {
        marginVertical: 10,
        marginHorizontal: 15
    },
    inlineTextInputStyles: {
        width: "100%"
    },
    buttonStyles: {
        width: "95%",
        marginTop: 10,
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 10
    },
    extraMargingRight: {
        marginRight: 30
    },
    labelStyles: {
        color: COLORS.primaryWhiteHex,
        fontFamily: FONTFAMILY.Lovato_Regular,
        fontSize: 15
    },
    iconStyles: {
        position: 'absolute',
        right: 10
    },
    InputContainerComponent: {
        flexDirection: 'row',
        marginHorizontal: 0,
        marginVertical: SPACING.space_10,
        backgroundColor: COLORS.primaryBlackHex,
        // borderRadius: BORDERRADIUS.radius_20,
        // backgroundColor: COLORS.primaryBlackHex,
        alignItems: 'center',
    },

})