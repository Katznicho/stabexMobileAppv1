import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import call from 'react-native-phone-call'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScrollView } from 'react-native';
import { generalStyles } from '../utils/generatStyles';
import { useRoute } from '@react-navigation/native';

const PaymentSiteSummary = () => {
     const { station, amount, selectedPaymentMethod } = useRoute<any>().params;
    const onMakePayment = ()=>{
        // if (selectedPaymentMethod === "AIRTEL") {

        //     return call({
        //         number: `*185*9*${station?.airtel_merchant_code ?? '1191184'}*${amount}*${station?.airtel_merchant_code ?? '1191184#'}`,
        //         prompt: false,
        //         skipCanOpen: true
        //     }).catch(console.error);

        // }
        // else {
        //     return call({
        //         number: `*165*3*${station?.mtn_merchant_code ?? '319142'}*${amount}*1#`,
        //         prompt: false,
        //         skipCanOpen: true
        //     }).catch(console.error);

        // }
    }
  return (
    <KeyboardAwareScrollView
      style={[generalStyles.ScreenContainer]}
      keyboardShouldPersistTaps="always"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{ paddingBottom:  100 }}
      >
        {/* payment method */}
        {/* payment method */}
      </ScrollView>
    </KeyboardAwareScrollView>
  )
}

export default PaymentSiteSummary

const styles = StyleSheet.create({})