import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { generalStyles } from '../screens/utils/generatStyles';
import { COLORS } from '../theme/theme';
import { useApi } from '../hooks/useApi';
import PaymentMethodOptionsModal from './Modals/PaymentMethodOptionsModal';
import { usePostQuery } from '../hooks/usePostQuery';

const SelectPaymentMethod = ({ selectedPaymentOption, setSelectedPaymentOption }: any) => {

    const [openPicker, setOpenPicker] = useState<boolean>(false)



    const { data, error, isLoading, refetch } = usePostQuery<any>({
        endpoint: '/api/Payment/PaymentModes',

        queryOptions: {
            enabled: true,
            refetchInterval: 20000,
            refetchOnWindowFocus: true,
            refetchOnMount: true,
        },
    })



    const onFinish = (option: any) => {

        setSelectedPaymentOption(option)
        return setOpenPicker(!openPicker)
    }


    return (
        <View style={[styles.container]}>
            <TouchableOpacity
                style={[generalStyles.flexStyles, { alignItems: "center", justifyContent: "space-evenly" }]}
                onPress={() => setOpenPicker(!openPicker)}
            >
                <View>
                    {
                        selectedPaymentOption
                            ?
                            <Image
                                source={{ uri: selectedPaymentOption?.image }}
                                style={{ width: 50, height: 50, borderRadius: 10 }}
                            />
                            :
                            <AntDesign
                                name="creditcard"
                                size={23}
                                color={COLORS.primaryWhiteHex}
                            />
                    }


                </View>
                <View>
                    <Text style={[generalStyles.CardTitle]}>
                        {selectedPaymentOption ? selectedPaymentOption?.payment_mode : "Select Payment Method"}
                    </Text>
                </View>
                <View>
                    <AntDesign
                        name='right'
                        size={22}
                        color={COLORS.primaryWhiteHex}
                    />
                </View>
            </TouchableOpacity>
            <PaymentMethodOptionsModal
                openPicker={openPicker}
                setOpenPicker={setOpenPicker}
                paymentOptions={data?.data}
                onFinish={onFinish}
                selectedPaymentOption={selectedPaymentOption}
                setSelectedPaymentOption={setSelectedPaymentOption}
            />
        </View>
    )
}

export default SelectPaymentMethod

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.primaryLightWhiteGrey,
        elevation: 0,
        borderRadius: 10,
        marginVertical: 10,
        paddingVertical: 10
    }
})