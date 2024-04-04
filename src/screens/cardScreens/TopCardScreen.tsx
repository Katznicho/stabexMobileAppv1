import { StyleSheet, ScrollView, View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useRef } from 'react'
import { generalStyles } from '../utils/generatStyles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { COLORS } from '../../theme/theme'
import { useNavigation } from '@react-navigation/native'
import { RootState } from '../../redux/store/dev'
import { useSelector } from 'react-redux';
import PhoneInput from "react-native-phone-number-input";
import { showMessage } from 'react-native-flash-message';
import { TOPUP, GET_MTN_TRANSACTION_STATUS, GET_AIRTEL_TRANSACTION_STATUS } from '../utils/constants/routes'
import SelectPaymentMethod from '../../components/SelectPaymentMethod'
import { ActivityIndicator } from '../../components/ActivityIndicator'
import { Dialog, PanningProvider, RadioButton, RadioGroup } from 'react-native-ui-lib'
import CardPaySummary from '../../components/Modals/CardPaySummary';
import * as Progress from 'react-native-progress';



const TopCardScreen = () => {

    const [errors, setErrors] = React.useState<any>({});
    const { authToken, user } = useSelector((state: RootState) => state.user);


    const { linkedCard } = useSelector((state: RootState) => state.user);

    const [progress, setProgress] = useState<number>(0)


    const [useMyNumber, setUseMyNumber] = useState<string>('Yes')
    const [openPicker, setOpenPicker] = useState<boolean>(false)

    const [countryCode, setCountryCode] = React.useState<string>('UG')
    const [selectedPaymentOption, setSelectedPaymentOption] = useState<any>(null)

    //phone number details
    const [phoneNumber, setPhoneNumber] = React.useState<any>(user?.phone.slice(4));
    const phoneInput = useRef<PhoneInput>(null);

    const [otherPhoneNumber, setOtherPhoneNumber] = React.useState<any>('');

    //phone number details

    const handleUseMyNumberChange = (value: string) => {

        setUseMyNumber(value);
    }

    const [isVisible, setIsVisible] = useState<boolean>(false)


    const [amount, setAmount] = React.useState<string>('');
    const [loading, setLoading] = React.useState<boolean>(false)

    const navigation = useNavigation<any>();

    const handleTopUp = () => {

        if (!selectedPaymentOption) {
            return showMessage({
                message: "Please select a payment method",
                type: "danger",
                icon: "danger",
                duration: 3000
            })
        }

        try {

            const headers = new Headers();
            headers.append('Accept', 'application/json');
            headers.append('Authorization', `Bearer ${authToken}`);

            if (amount == "") {
                return showMessage({
                    message: "All fields are required",
                    type: "danger",
                    icon: "danger",
                    duration: 3000
                })

            }
            setOpenPicker(false)
            setLoading(true);

            let paymentMethod = selectedPaymentOption.id == 1 ? 'MTN' : selectedPaymentOption.id == 3 ? 'AIRTEL' : 'PESAPAL';
            let newPhoneNumber = useMyNumber == 'Yes' ? user?.phone : otherPhoneNumber

            newPhoneNumber = selectedPaymentOption.id == 1 ? newPhoneNumber.slice(1) : selectedPaymentOption.id == 3 ? newPhoneNumber.slice(4) : otherPhoneNumber

            const formData = new FormData();
            formData.append('amount', amount);
            formData.append('phone_number', newPhoneNumber);
            formData.append('currency', 'UGX');
            formData.append('country', "UG");
            formData.append('transaction_category', 'CardTopUp');
            formData.append('gateway', paymentMethod);
            formData.append('description', 'topping up card');
            formData.append('payment_method', 'Mobile Money');
            formData.append('transaction type', 'Credit');
            formData.append('customer_card_id', linkedCard.id);

            fetch(`${TOPUP}`, {
                headers,
                method: 'POST',
                body: formData
            })
                .then(a => a.json())
                .then(result => {
                    setLoading(false)
                    setOpenPicker(false)
                    if (result.response == 'success') {
                        setIsVisible(true)
                        showMessage({
                            message: "A Top Up request has been sent to your phone. You will receive an a pop up shortly.",
                            type: "success",
                            icon: "success",
                            duration: 3000
                        })
                        setTimeout(() => checkTransactionStatus(result.transaction_reference, paymentMethod, 0), 5000); // Start checking after 5 seconds
                    }
                    else {
                        setIsVisible(false)
                        return showMessage({
                            message: "Top Up Failed",
                            type: "info",
                            icon: "info",
                            duration: 3000
                        })

                    }

                })
        }
        catch (err) {
            setLoading(false)
            return showMessage({
                message: "Top Up Failed",
                type: "info",
                icon: "info",
                duration: 3000
            })
        }
    }

    const checkTransactionStatus = (transactionReference: string, paymentMethod: string, elapsedSeconds: number) => {


        // Check if elapsed time exceeds 60 seconds
        if (elapsedSeconds >= 60) {
            showMessage({
                message: "We are going to try again later.",
                type: "info",
                icon: "info",
                duration: 3000
            });
            setIsVisible(false);
            setOpenPicker(false);
            return navigation.goBack();
        }
        //increment progress by 0.1
        setProgress(progress + 0.1);

        // Make API call to check transaction status using the provided transactionReference
        // For example:
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append("X-Requested-With", "XMLHttpRequest");
        headers.append('Authorization', `Bearer ${authToken}`);
        const formData = new FormData();
        formData.append('transaction_reference', transactionReference);
        formData.append('transaction_type', "CardTopUp");

        let endpoint = paymentMethod === 'MTN' ? GET_MTN_TRANSACTION_STATUS : GET_AIRTEL_TRANSACTION_STATUS;

        fetch(endpoint, {
            headers,
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(result => {

                if (result.success) {
                    showMessage({
                        message: "Transaction Successful",
                        type: "success",
                        icon: "success",
                        duration: 3000
                    });
                    setIsVisible(false);
                    setOpenPicker(false);
                    return navigation.goBack();
                }
                else {
                    // Transaction failed or pending
                    // Continue checking if elapsed time is less than 60 seconds
                    setTimeout(() => checkTransactionStatus(transactionReference, paymentMethod, elapsedSeconds + 5), 5000); // 5000 milliseconds = 5 seconds
                }
            })
            .catch(err => {
                console.error(err);
                // Handle error
            });
    };
    return (
        <KeyboardAwareScrollView
            style={[{ flex: 1, width: '100%' }, generalStyles.ScreenContainer]}
            keyboardShouldPersistTaps="always"
        >
            <Dialog
                visible={isVisible}
                onDismiss={() => {
                    setIsVisible(false)
                    setOpenPicker(false)
                    setLoading(false)
                    return navigation.goBack()
                }}

                height={150}
                panDirection={PanningProvider.Directions.DOWN}
                containerStyle={[{
                    backgroundColor: COLORS.primaryBlackHex,
                    borderRadius: 20
                },
                ]}

            >
                <View style={[generalStyles.viewStyles, generalStyles.centerContent]}>
                    <Text style={[generalStyles.CardPriceCurrency]}>processing ....</Text>
                    <Progress.Bar
                        progress={progress}
                        width={200}
                    />

                </View>
                <View style={[generalStyles.viewStyles]}>
                    <TouchableOpacity
                        style={[generalStyles.loginContainer, styles.buttonCardStyles, { backgroundColor: COLORS.primaryRedHex, width: "90%" }]}
                        onPress={() => {
                            setIsVisible(false)
                            setOpenPicker(false)
                            setLoading(false)
                            return navigation.goBack()
                        }}

                    >
                        <Text style={[generalStyles.loginText, { color: COLORS.primaryBlackHex }]}>
                            {'Cancel'}
                        </Text>
                    </TouchableOpacity>

                </View>
            </Dialog>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="always"
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <View style={[generalStyles.formContainer]}>

                    <Text style={[generalStyles.textStyle, { marginVertical: 20 }]}>Please follow the prompts below to top up your card</Text>
                    <View>
                        <TextInput
                            style={styles.formInput}
                            placeholder={' Enter amount'}
                            keyboardType="number-pad"
                            placeholderTextColor={COLORS.secondaryGreyHex}
                            onChangeText={text => setAmount(text)}
                            value={amount}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                    </View>



                    {/* select payment method */}
                    <SelectPaymentMethod
                        selectedPaymentOption={selectedPaymentOption}
                        setSelectedPaymentOption={setSelectedPaymentOption}
                    />
                    {/* select payment method */}

                    {/* radio buttons */}
                    <View style={{ marginVertical: 20, marginHorizontal: 20 }}>
                        <RadioGroup initialValue={useMyNumber}
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
                            <RadioButton value={'No'}
                                label={'Other Number'}
                                animated
                                color={COLORS.primaryOrangeHex}
                                onPress={() => handleUseMyNumberChange('No')}
                                style={{ marginHorizontal: 5 }}
                                size={15}

                            />
                        </RadioGroup>
                    </View>
                    {/* radio buttons */}


                    {/* my number */}

                    {
                        useMyNumber === "Yes" && (<View style={[generalStyles.formContainer, { marginHorizontal: 0 }]}>
                            <View>
                                <Text style={generalStyles.formInputTextStyle}>
                                    Phone Number </Text>
                            </View>
                            <PhoneInput
                                ref={phoneInput}
                                defaultValue={phoneNumber}
                                defaultCode="UG"
                                layout="second"
                                onChangeFormattedText={(text) => {
                                    setPhoneNumber(text);
                                }}
                                onChangeCountry={(e) => console}
                                placeholder={'enter phone number'}
                                containerStyle={[generalStyles.formInput, styles.borderStyles, { backgroundColor: COLORS.primaryLightWhiteGrey, }]}
                                textContainerStyle={{ paddingVertical: 0, backgroundColor: COLORS.primaryLightWhiteGrey }}
                                textInputProps={{
                                    placeholderTextColor: COLORS.primaryWhiteHex,

                                }}
                            />
                            <View>
                                {errors.phoneNumber && <Text style={generalStyles.errorText}>{errors.phoneNumber}</Text>}
                            </View>

                        </View>)
                    }

                    {/* my  number */}

                    {/* my other number */}
                    {
                        useMyNumber === "No" && (<View style={[generalStyles.formContainer, { marginHorizontal: 0 }]}>
                            <View>
                                <Text style={generalStyles.formInputTextStyle}>
                                    Phone Number </Text>
                            </View>
                            <PhoneInput
                                ref={phoneInput}
                                defaultValue={otherPhoneNumber}
                                defaultCode="UG"
                                layout="second"
                                onChangeFormattedText={(text) => {
                                    setOtherPhoneNumber(text);
                                }}
                                onChangeCountry={(e) => console}
                                placeholder={'enter phone number'}
                                containerStyle={[generalStyles.formInput, styles.borderStyles, { backgroundColor: COLORS.primaryLightWhiteGrey, }]}
                                textContainerStyle={{ paddingVertical: 0, backgroundColor: COLORS.primaryLightWhiteGrey }}
                                textInputProps={{
                                    placeholderTextColor: COLORS.primaryWhiteHex,
                                }}
                            />
                            <View>
                                {errors.phoneNumber && <Text style={generalStyles.errorText}>{errors.phoneNumber}</Text>}
                            </View>

                        </View>)
                    }
                    {/* my other number */}

                    <TouchableOpacity
                        style={[generalStyles.loginContainer, styles.buttonCardStyles]}
                        onPress={() => setOpenPicker(true)}

                    >
                        <Text style={[generalStyles.loginText, { color: COLORS.primaryBlackHex }]}>
                            {'Proceed'}
                        </Text>
                    </TouchableOpacity>
                    {loading && <ActivityIndicator />}
                </View>

                <CardPaySummary
                    openPicker={openPicker}
                    setOpenPicker={setOpenPicker}
                    onMakePayment={handleTopUp}
                    amount={amount}
                    selectedPaymentOption={selectedPaymentOption}
                    phoneNumber={phoneNumber}
                    otherPhoneNumber={otherPhoneNumber}
                    useMyNumber={useMyNumber}
                />
            </ScrollView>

        </KeyboardAwareScrollView>
    )
}

export default TopCardScreen

const styles = StyleSheet.create({
    formInput: {
        color: COLORS.primaryWhiteHex,
        fontSize: 15,
        borderWidth: 0.4,
        borderColor: COLORS.primaryLightGreyHex,
        borderRadius: 10,
    },
    buttonCardStyles: {
        width: "95%",
        backgroundColor: COLORS.primaryOrangeHex,
        marginTop: 10
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
})