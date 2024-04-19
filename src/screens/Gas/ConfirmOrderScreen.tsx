import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { generalStyles } from '../utils/generatStyles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store/dev'
import { useNavigation, useRoute } from '@react-navigation/native'
import { COLORS } from '../../theme/theme'
import EmptyContainer from '../../components/EmptyContainer'
import { decrementCartItemQuantity, emptyCart, incrementCartItemQuantity, removeFromCart } from '../../redux/store/slices/CartSlice';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SelectPaymentMethod from '../../components/SelectPaymentMethod'
import DeliveryAddress from '../../components/DeliveryAddress'
import AmountCalculator from '../../components/AmountCalculator'
import { CREATE_CUSTOMER_ORDER_WITH_PAYMENT, CREATE_MY_ORDER, SUBMIT_ORDER, } from '../utils/constants/routes'
import { ActivityIndicator } from '../../components/ActivityIndicator'
import { showMessage } from 'react-native-flash-message'
import { Dialog, PanningProvider, RadioButton, RadioGroup, Switch } from 'react-native-ui-lib';
import * as Progress from 'react-native-progress';


const ConfirmOrderScreen = () => {


    const [payNow, setPayNow] = useState<boolean>(true)
    const [deliveryOptions, setDeliveryOptions] = useState<any[]>([

        {
            id: 2,
            name: "Station Pickup"
        },
        {
            id: 1,
            name: "Home Delivery"
        },
    ])
    const { authToken, user } = useSelector((state: RootState) => state.user);
    const [deliveryCharge, setDeliveryCharge] = useState<number>(0);

    const [useMyNumber, setUseMyNumber] = useState<string>('Yes')
    const handleUseMyNumberChange = (value: string) => {

        setUseMyNumber(value);
    }

    const [progress, setProgress] = useState<number>(0.2)

    //phone number
    const [phoneNumber, setPhoneNumber] = React.useState<any>(user?.phone);
    const [otherPhoneNumber, setOtherPhoneNumber] = React.useState<any>('');

    const [openDeliveryPicker, setOpenDeliveryPicker] = useState<boolean>(true)




    const { cartList, station } = useSelector((state: RootState) => state.cart)
    const totalPrice = cartList.reduce((acc: number, item: any) => acc + item.unit_price * item.quantity, 0);



    const { deliveryOption } = useRoute<any>().params

    const [selectedDeliveryAddress, setSelectedDeliveryAddress] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const [selectedPaymentOption, setSelectedPaymentOption] = useState<any>(null)
    const [isVisible, setIsVisible] = useState<boolean>(false)




    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation<any>()

    const onDelete = (item: any) => {
        //show confirmation
        Alert.alert(
            "Delete Product",
            "Are you sure you want to delete this product?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => dispatch(removeFromCart(item)) }
            ]
        )

    }



    const onPlacePaymentOrder = () => {
        try {
            setLoading(true)

            const extractedData = cartList.map(item => ({
                price: item.unit_price,
                product_id: item.product_id,
                quantity: item.quantity,
                total_price: item.unit_price * item.quantity,

            }));

            const headers = new Headers();
            headers.append('Accept', 'application/json');
            headers.append("Content-Type", "application/json");
            headers.append('Authorization', `Bearer ${authToken}`);

            const totalCost = totalPrice + deliveryCharge

            const bodyData = JSON.stringify({
                "station_id": station?.Id,
                "order_type": deliveryOption,
                "pay_now": payNow,
                "address_type": selectedDeliveryAddress?.address_type,
                "address": selectedDeliveryAddress?.address,
                "longitude": selectedDeliveryAddress?.longitude,
                "latitude": selectedDeliveryAddress?.latitude,
                "payment_method_id": selectedPaymentOption?.Id,
                "purchase_cost": totalPrice,
                // "delivery_cost": deliveryCharge,
                 "delivery_cost": "1000",
                "total_cost": totalCost,
                "delivery_address_id": selectedDeliveryAddress?.Id,
                "OrderedProductRequestModel": extractedData

            })

             console.log(bodyData)

            fetch(`${SUBMIT_ORDER}`, {
                headers,
                method: 'POST',
                body: bodyData
            })
                .then(a => a.json())
                .then(result => {
                    setLoading(false)
                    if (result.status == 1) {
                        setIsVisible(true)
                        showMessage({
                            message: "Your order has been placed.",
                            description: "We will contact you shortly",
                            type: "success",
                            icon: "success",
                            duration: 3000
                        })
                        //empty cart 
                        dispatch(emptyCart());
                        return navigation.navigate("Orders")
                        //navigat

                        // Start checking after 5 seconds
                    }
                    else {
                        setIsVisible(false)
                        return showMessage({
                            message: "Failed to place order. Please try again",
                            type: "info",
                            icon: "info",
                            duration: 3000
                        })

                    }

                })

        } catch (error) {
            setLoading(false)
            return showMessage({
                'message': "Something went wrong",
                "description": "Please try again",
                'type': "danger",
                'icon': "danger",
            })
        }
    }
    //createCustomerOrderWithPayment


    const renderProductItem = ({ item }: any) => (
        <View style={[styles.productContainer, generalStyles.flexStyles, { alignItems: 'center' }]}
            key={item.id}
        >
            <TouchableOpacity
                style={[generalStyles.absoluteStyles, { top: 10, right: 10 }]}
                onPress={() => onDelete(item)}
            >
                <AntDesign
                    name="delete"
                    color={COLORS.primaryRedHex}
                    size={22}
                    onPress={() => onDelete(item)}
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 10
                    }}
                />
            </TouchableOpacity>
            <View>
                <Image source={{ uri: item?.image ? `${item.base_url}/${item.image}` : item?.image }}
                    style={styles.productImage} />

            </View>

            <View style={{ marginHorizontal: 10 }}>
                <View>
                    <Text style={[generalStyles.CardTitle]}>{item?.name}</Text>
                    <Text style={[generalStyles.CardSubtitle]}>{item?.currency?.symbol || "UGX"} {item?.unit_price}</Text>

                </View>


                <View style={styles.quantityContainer}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => {
                            return dispatch(decrementCartItemQuantity(item))
                        }}>
                        <Text style={styles.quantityButton}>-</Text>
                    </TouchableOpacity>
                    <Text style={[generalStyles.CardTitle, { marginHorizontal: 10 }]}>{item.quantity}</Text>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => {
                            return dispatch(incrementCartItemQuantity(item))

                        }}>
                        <Text style={styles.quantityButton}>+</Text>
                    </TouchableOpacity>
                </View>

            </View>


        </View>
    );

    return (
        <KeyboardAwareScrollView
            style={[{ flex: 1, width: '100%' }, generalStyles.ScreenContainer]}
            keyboardShouldPersistTaps="always"
        >

            <ScrollView
                contentContainerStyle={{ margin: 10 }}
                keyboardShouldPersistTaps="always"
            >
                {/* station container */}
                {
                    deliveryOption === "Station Pickup" && station && (
                        <View style={[generalStyles.viewStyles, { alignItems: 'center', elevation: 0, backgroundColor: COLORS.primaryLightWhiteGrey }]}>
                            <Text style={[generalStyles.CardSubtitle]}>You will pick your order from </Text>
                            <Text style={[generalStyles.CardTitle]}>{station?.station_name} Station</Text>
                        </View>

                    )
                }
                {/* station container */}

                {/* address incase of home delivery */}
                {
                    deliveryOption === "Home Delivery" &&
                    <DeliveryAddress
                        setSelectedDeliveryAddress={setSelectedDeliveryAddress}
                        selectedDeliveryAddress={selectedDeliveryAddress}
                        openDeliveryPicker={openDeliveryPicker}
                        setOpenDeliveryPicker={setOpenDeliveryPicker}
                    />
                }
                {/* address incase of home delivery */}
                <View style={[generalStyles.bottomHairline, styles.hairLineStyles]} />


                {
                    cartList.length > 0 ? cartList.map((item: any) => {
                        return renderProductItem({ item })
                    }) : (
                        <View style={[generalStyles.centerContent, generalStyles.viewStyles]} >
                            <EmptyContainer
                                title={'You dont have any cart Items Yet'}
                            />
                            <View >

                                <TouchableOpacity
                                    style={[generalStyles.loginContainer, styles.buttonStyles]}
                                    activeOpacity={1}
                                    onPress={() => navigation.navigate('GasStationList')}
                                >
                                    <Text style={generalStyles.loginText}>{'Add Items'}</Text>
                                </TouchableOpacity>

                            </View>

                        </View>
                    )
                }

                {/* amount payable */}



                {/* amount calculator */}
                <AmountCalculator
                    deliveryOption={deliveryOption}
                    selectedDeliveryAddress={selectedDeliveryAddress}
                    station={station}
                    deliveryCharge={deliveryCharge}
                    setDeliveryCharge={setDeliveryCharge}
                />
                {/* amount calculator */}


                {/* amount payable */}

                {/* select payment method */}
                <SelectPaymentMethod
                    selectedPaymentOption={selectedPaymentOption}
                    setSelectedPaymentOption={setSelectedPaymentOption}

                />
                {/* select payment method */}

                {/* payment section  and area*/}
                {/* radio buttons */}
                {
                    (selectedPaymentOption && (selectedPaymentOption.id === 3 || selectedPaymentOption.id === 1)) && (
                        <View style={{ marginVertical: 20, marginHorizontal: 20 }}>
                            <RadioGroup
                                initialValue={useMyNumber}
                                style={[generalStyles.flexStyles, { alignItems: "center", justifyContent: "space-between" }]}
                                onValueChange={(value: React.SetStateAction<string>) => setUseMyNumber(value)}>
                                <RadioButton
                                    value={'Yes'}
                                    label={'My Number'}
                                    animated
                                    color={COLORS.primaryOrangeHex}
                                    onPress={() => handleUseMyNumberChange('Yes')}
                                    style={{ marginHorizontal: 5 }}
                                    size={15}
                                    labelStyle={{ marginHorizontal: 5 }}
                                />
                                <RadioButton
                                    value={'No'}
                                    label={'Other Number'}
                                    animated
                                    color={COLORS.primaryOrangeHex}
                                    onPress={() => handleUseMyNumberChange('No')}
                                    style={{ marginHorizontal: 5 }}
                                    size={15}
                                />
                            </RadioGroup>
                        </View>
                    )
                }

                {/* radio buttons */}

                {/* my number */}

                {
                    (selectedPaymentOption && (selectedPaymentOption.id === 1 || selectedPaymentOption.id === 3) && useMyNumber === "Yes") && (
                        <View style={styles.formContainer}>
                            <View>
                                <Text style={generalStyles.CardTitle}>
                                    Phone Number*(for example +256 7** ** **)</Text>
                            </View>
                            <View>
                                <TextInput
                                    style={[generalStyles.formInput, styles.borderStyles]}
                                    placeholderTextColor={COLORS.primaryWhiteHex}
                                    keyboardType="default"
                                    placeholder={'enter phone number'}
                                    onChangeText={text => setPhoneNumber(text)}
                                    value={phoneNumber}
                                    underlineColorAndroid="transparent"
                                    autoCapitalize="none"
                                />
                            </View>
                        </View>
                    )
                }


                {/* my  number */}

                {/* my other number */}
                {
                    (selectedPaymentOption && (selectedPaymentOption.id === 1 || selectedPaymentOption.id === 3) && useMyNumber === "No") && (
                        <View style={styles.formContainer}>
                            <View>
                                <Text style={generalStyles.CardTitle}>
                                    Phone Number*(for example +256 7** ** **)</Text>
                            </View>
                            <View>
                                <TextInput
                                    style={[generalStyles.formInput, styles.borderStyles]}
                                    placeholderTextColor={COLORS.primaryWhiteHex}
                                    // placeholderStyle={{ borderColor: 'red' }}
                                    keyboardType="default"

                                    placeholder={'Phone Number'}
                                    onChangeText={text =>
                                        setOtherPhoneNumber(text)
                                    }
                                    value={otherPhoneNumber}
                                    underlineColorAndroid="transparent"
                                    autoCapitalize="none"

                                />
                            </View>

                        </View>
                    )
                }
                {/* my other number */}

                {/* payment section  and area*/}

                {/* pay now or later */}
                <View style={styles.formContainer}>

                    <View style={[generalStyles.flexStyles, { alignItems: 'center' }]}>
                        <Switch
                            value={payNow}
                            onValueChange={() => setPayNow(!payNow)}
                            style={{ marginHorizontal: 10 }}
                            thumbColor={payNow ? COLORS.primaryGreenHex : COLORS.primaryLightGreyHex}
                            onColor={COLORS.primaryOrangeHex}
                            offColor={COLORS.primaryWhiteHex}

                        // width={100}
                        />
                        <Text style={[generalStyles.CardTitle]}>{payNow ? "Pay Now" : "Pay Later"}</Text>

                    </View>


                </View>
                {/* pay now or later */}



                {/* button */}
                {
                    cartList.length > 0 && (
                        <View>
                            <TouchableOpacity
                                style={[
                                    generalStyles.loginContainer,
                                    styles.buttonStyles,
                                    (!selectedPaymentOption) && { opacity: 0.5 }
                                ]}
                                activeOpacity={1}
                                onPress={() => onPlacePaymentOrder()}
                                disabled={!selectedPaymentOption}
                            >
                                <Text style={generalStyles.loginText}>Place Order</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }



                {/* button */}
                {loading && <ActivityIndicator />}


            </ScrollView>

        </KeyboardAwareScrollView>
    )
}

export default ConfirmOrderScreen

const styles = StyleSheet.create({

    productContainer: {
        flex: 1,
        margin: 8,
        alignItems: 'center',
        padding: 5,
        borderRadius: 10,
        elevation: 2,
        backgroundColor: COLORS.primaryLightWhiteGrey,

    },
    productImage: {
        width: 80,
        height: 80,
        marginBottom: 8,
        borderRadius: 20
    },
    quantityContainer: {
        flexDirection: 'row',
        marginTop: 8,
        alignItems: 'center',
    },
    quantityButton: {
        fontSize: 18,
        paddingHorizontal: 8,
        color: COLORS.primaryBlackHex,
        backgroundColor: COLORS.primaryOrangeHex,
        borderRadius: 5,
        // width: 30,
        // height: 30,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonStyles: {
        width: "95%",
        marginTop: 10,
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 10
    },
    priceContainer: {
        elevation: 10,
        backgroundColor: COLORS.primaryBlackHex,
        padding: 5,
        borderRadius: 10
    },
    hairLineStyles: {
        width: "100%",
        marginHorizontal: 0
    },
    formContainer: {
        marginVertical: 10,
        marginHorizontal: 15
    },
    inlineTextInputStyles: {
        width: "100%"
    },
    borderStyles: {
        borderWidth: 0.5,
        borderBottomWidth: 0.5,
        height: 45,
        borderColor: COLORS.primaryLightGreyHex,
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10
    },
    buttonCardStyles: {
        width: "95%",
        backgroundColor: COLORS.primaryOrangeHex,
        marginTop: 10
    },

});