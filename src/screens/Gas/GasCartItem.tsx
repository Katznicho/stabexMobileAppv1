import { StyleSheet, ScrollView, View, Image, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { generalStyles } from '../utils/generatStyles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { AppDispatch, RootState } from '../../redux/store/dev'
import { useDispatch, useSelector } from 'react-redux'
import { decrementCartItemQuantity, incrementCartItemQuantity, removeFromCart } from '../../redux/store/slices/CartSlice'
import { COLORS } from '../../theme/theme'
import EmptyContainer from '../../components/EmptyContainer'
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { formatCurrency } from '../utils/helpers/helpers'
import DeliveryOptions from '../../components/Modals/DeliveryOptions'
import ActionSheetComponent from '../../components/ActionSheetComponent'

const GasCartItem = () => {

    const [openPicker, setOpenPicker] = useState<boolean>(false)
    const { user, isGuest } = useSelector((state: RootState) => state.user)

    const [visible, setVisible] = useState<boolean>(false);

    const { cartList } = useSelector((state: RootState) => state.cart)

    const totalPrice = cartList.reduce((acc: number, item: any) => {
        return acc + item.unit_price * item.quantity
    }, 0);

    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation<any>()

    useEffect(() => { }, [cartList])

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

    const [selectedDeliveryOption, setSelectedDeliveryOption] = useState<string>("")

    const onFinish = (option_name: string) => {

        navigation.navigate('ConfirmOrder', { deliveryOption: option_name })
    }

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
                    <Text style={[generalStyles.CardSubtitle]}>{item?.currency?.symbol || "UGX"} {item.unit_price}</Text>

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
                <View>
                    <View style={[generalStyles.viewStyles, generalStyles.flexStyles, { alignItems: "center", justifyContent: "space-between" }]}>
                        <Text style={[generalStyles.CardTitle]}>Total

                        </Text>
                        <Text style={[generalStyles.CardTitle]}>
                            {

                                formatCurrency(totalPrice)
                            }
                        </Text>
                    </View>
                </View>
                {/* amount payable */}
                {/* button */}
                {
                    cartList.length > 0 && (
                        <View>
                            <TouchableOpacity
                                style={[generalStyles.loginContainer, styles.buttonStyles]}
                                activeOpacity={1}

                                onPress={() => isGuest ? setVisible(true) : setOpenPicker(true)}
                            >
                                <Text style={generalStyles.loginText}>{'Proceed'}</Text>
                            </TouchableOpacity>

                        </View>
                    )
                }


                {/* button */}

                <DeliveryOptions
                    openPicker={openPicker}
                    setOpenPicker={setOpenPicker}
                    deliveryOptions={deliveryOptions}
                    selectedDeliveryOption={selectedDeliveryOption}
                    setSelectedDeliveryOption={setSelectedDeliveryOption}
                    onFinish={onFinish}
                />

                <ActionSheetComponent
                    visible={visible}
                    setVisible={setVisible}

                />
            </ScrollView>

        </KeyboardAwareScrollView>
    )
}

export default GasCartItem

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
    }
});