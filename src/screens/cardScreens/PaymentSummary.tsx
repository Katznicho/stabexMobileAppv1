import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { generalStyles } from '../utils/generatStyles'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useNavigation, useRoute } from '@react-navigation/native'
import PaymentCard from '../../components/PaymentCard'
import { COLORS } from '../../theme/theme'
import { ActivityIndicator } from '../../components/ActivityIndicator'
import { showMessage } from 'react-native-flash-message'
import CardHolderDetails from '../../components/CardHolderDetails'

const PaymentSummary: React.FC = () => {
    const tabBarHeight = useBottomTabBarHeight();

    const { data } = useRoute<any>().params

    const [phone, setPhone] = React.useState<string>("0759983853");

    const [loading, setLoading] = React.useState<boolean>(false);

    const navigation = useNavigation<any>();

    const onPay = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            showMessage({
                message: "Payment Successful",
                description: "Your payment was successful",
                type: "success",
                icon: "success",
                duration: 3000,
                autoHide: true,
            })
        }, 2000);

        navigation.navigate('HomeTab')
    }


    return (
        <KeyboardAwareScrollView
            style={[{ flex: 1, width: '100%' }, generalStyles.ScreenContainer]}
            keyboardShouldPersistTaps="always"
            contentContainerStyle={{ paddingBottom: tabBarHeight }}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: tabBarHeight }}
                keyboardShouldPersistTaps="always"
            >
                <View style={[generalStyles.viewStyles]}>
                    <Text style={generalStyles.formInputTextStyle}>Payment Method</Text>
                </View>
                {/* payment method */}
                <PaymentCard data={data} />
                {/* payment method */}

                {/* details */}
                <View style={[generalStyles.formContainer]}>
                    <View>
                        <Text style={generalStyles.formInputTextStyle}>
                            Phone Number *
                        </Text>
                    </View>
                    <View>
                        <TextInput
                            style={styles.formInput}
                            placeholder={'enter amount'}
                            keyboardType="number-pad"
                            placeholderTextColor={COLORS.secondaryGreyHex}
                            onChangeText={text => setPhone(text)}
                            value={phone}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                    </View>
                </View>
                {/* details */}

                {/* payment summary */}
                <View style={[generalStyles.viewStyles]}>
                    <CardHolderDetails />

                </View>

                {/* payment summary */}



                {/* confirm  */}
                <TouchableOpacity
                    style={[generalStyles.loginContainer, styles.buttonCardStyles]}
                    onPress={onPay}
                >
                    <Text style={[generalStyles.loginText, { color: COLORS.primaryBlackHex }]}>
                        {'Confirm'}
                    </Text>
                </TouchableOpacity>
                {/* confirm */}
                {loading && <ActivityIndicator />}

            </ScrollView>
        </KeyboardAwareScrollView>
    )
}

export default PaymentSummary

const styles = StyleSheet.create({
    formInput: {
        color: COLORS.primaryWhiteHex,
        fontSize: 15,
        borderWidth: 0.4,
        borderColor: COLORS.primaryLightGreyHex,
        borderRadius: 10,
    },
    buttonCardStyles: {
        width: "80%",
        // marginHorizontal: 20,
        backgroundColor: COLORS.primaryGreenHex,
    },
})