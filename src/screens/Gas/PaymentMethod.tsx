import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { generalStyles } from '../utils/generatStyles'
import { KeyboardAwareScrollView } from 'react-native-ui-lib'
import { COLORS } from '../../theme/theme'
import { useNavigation } from '@react-navigation/native'

const PaymentMethod = () => {

    const [paymentOptions, setPaymentOptions] = useState<any>([
        {
            id: 1,
            name: "Pay On Delivery"
        }, {
            id: 2,
            name: "Pay At Station"
        }, {
            id: 3,
            name: "Pay Online"
        }

    ])

    const [selectedDeliveryOption, setSelectedDeliveryOption] = useState<any>(null)

    const navigation = useNavigation<any>();

    return (
        <KeyboardAwareScrollView
            style={[{ flex: 1, width: '100%' }, generalStyles.ScreenContainer]}
            keyboardShouldPersistTaps="always"
        >
            <ScrollView
                contentContainerStyle={{ margin: 10 }}
                keyboardShouldPersistTaps="always"
            >
                <View>
                    <View style={[generalStyles.viewStyles]}>
                        <Text style={generalStyles.formInputTextStyle}>
                            Select Delivery Option
                        </Text>
                    </View>

                </View>

                {
                    paymentOptions?.map((option: any) => (
                        <TouchableOpacity
                            activeOpacity={1}
                            key={option.id}
                            style={[styles.circleStyles, {
                                backgroundColor: selectedDeliveryOption === option.name ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
                            }]}
                            onPress={() => {
                                setSelectedDeliveryOption(option.name)
                                if (option.name === "Pay On Delivery") {
                                    // return navigation.navigate("PaymentMethod")
                                }
                                else if (option.name === "Pay At Station") {

                                }
                                else {
                                    //return navigation.navigate("DeliveryLocation")
                                }
                            }}
                        >
                            <Text style={[generalStyles.CardTitle, { color: COLORS.primaryBlackHex }]}>{option.name}</Text>
                        </TouchableOpacity>
                    ))
                }

            </ScrollView>
        </KeyboardAwareScrollView>
    )
}

export default PaymentMethod

const styles = StyleSheet.create({
    circleStyles: {
        marginHorizontal: 10,
        marginVertical: 10,
        // width: 50,
        height: 50,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
})