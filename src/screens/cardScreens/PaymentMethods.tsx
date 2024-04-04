import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { generalStyles } from '../utils/generatStyles'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import SavedPaymentMethods from '../../components/SavedPaymentMethods'
import OtherPaymentMethods from '../../components/OtherPaymentMethods'
import { useRoute } from '@react-navigation/native'

const PaymentMethods: React.FC = () => {

    const tabBarHeight = useBottomTabBarHeight();

    const { amount } = useRoute<any>()?.params;

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
                {/* saved payment methods */}
                <SavedPaymentMethods
                    amount={amount}
                />
                {/* saved payment methods */}

                {/* other payment methods */}
                {/* <OtherPaymentMethods /> */}
                {/* other payment methods */}
            </ScrollView>
        </KeyboardAwareScrollView>
    )
}

export default PaymentMethods

const styles = StyleSheet.create({})