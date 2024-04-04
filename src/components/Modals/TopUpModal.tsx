import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useRef, useEffect, useState } from 'react';
import RBSheet from "react-native-raw-bottom-sheet";
import { COLORS } from '../../theme/theme';
import { generalStyles } from '../../screens/utils/generatStyles';
import AmountScroller from '../AmountScroller';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from '../ActivityIndicator';
import PaymentCard from '../PaymentCard';
import PhoneInput from "react-native-phone-number-input";
import { RootState } from '../../redux/store/dev';
import { useSelector } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import { TOPUP } from '../../screens/utils/constants/routes';
import SelectPaymentMethod from '../SelectPaymentMethod';


type Props = {
    openPicker: boolean;
    setOpenPicker: (openPicker: boolean) => void;
    card: any
};

const amounts = ["1000", "2000", "3000", "50000", "12000", "40000"];

const PaymentList = [
    {
        name: 'AIRTEL',
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3gatG0jIL1ybYTW5-1kCsT6iKKcMtiB_FJpKkxZotaA&s",
        text: "Pay with Airtel"
    },
    {
        name: 'MTN',
        image: "https://upload.wikimedia.org/wikipedia/commons/9/93/New-mtn-logo.jpg",
        text: "Pay with MTN"

    },

];

function getNetworkProvider(phoneNumber: any, provider: string) {
    // Initialize an object to store the result
    let result: any = { provider: '', number: '' };

    // Check if the phone number belongs to MTN
    if (provider === 'MTN') {
        // Set the network provider as MTN and the number in the format 2567 and the rest
        result.provider = 'MTN';

        // Remove the "+" from the phone number
        result.number = phoneNumber.replace(/\+/g, '');
    }


    // Check if the phone number belongs to Airtel
    else if (provider === 'AIRTEL') {
        // Set the network provider as Airtel and the last 9 digits of the number
        result.provider = 'AIRTEL';
        phoneNumber = phoneNumber.replace(/\+?256/, '');
        result.number = phoneNumber.slice(-9);
    }

    // If the phone number doesn't match any of the prefixes, set the number as the last 9 digits
    else {
        result.provider = 'Unknown';
        result.number = phoneNumber.slice(-9);
    }

    return result;
}

const TopUpModal: React.FC<Props> = ({ openPicker, setOpenPicker, card }: Props) => {




    const [errors, setErrors] = React.useState<any>({});
    const { user, isGuest, authToken } = useSelector((state: RootState) => state.user);

    const [countryCode, setCountryCode] = React.useState<string>('UG')
    const [selectedPaymentOption, setSelectedPaymentOption] = useState<any>(null)

    //phone number details
    const [phoneNumber, setPhoneNumber] = React.useState<any>('');
    const phoneInput = useRef<PhoneInput>(null);
    //phone number details

    const refRBSheet = useRef<any>();

    const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState<any>(null)

    useEffect(() => {
        if (openPicker) {
            refRBSheet.current?.open();
        } else {
            refRBSheet.current?.close();
        }
    }, [openPicker]);

    const [amount, setAmount] = React.useState<string>('');
    const [loading, setLoading] = React.useState<boolean>(false)

    const navigation = useNavigation<any>();

    const handleTopUp = () => {

        try {

            const headers = new Headers();
            headers.append('Accept', 'application/json');
            headers.append('Authorization', `Bearer ${authToken}`);

            if (amount == "" || phoneNumber == "") {
                return showMessage({
                    message: "All fields are required",
                    type: "danger",
                    icon: "danger",
                    duration: 3000
                })

            }
            setLoading(true);

            const res = getNetworkProvider(phoneNumber, selectedPaymentMethod);

            const formData = new FormData();
            formData.append('amount', amount);
            formData.append('phone_number', res.number);
            formData.append('currency', 'UGX');
            formData.append('country', "UG");
            formData.append('transaction_category', 'CardTopUp');
            formData.append('gateway', selectedPaymentMethod);
            formData.append('description', 'testing payment');
            formData.append('payment_method', 'Mobile Money');
            formData.append('transaction type', 'Credit');
            formData.append('customer_card_id', card.id);

            fetch(`${TOPUP}`, {
                headers,
                method: 'POST',
                body: formData
            })
                .then(a => a.json())
                .then(result => {
                    setSelectedPaymentMethod("")
                    setPhoneNumber('')
                    setLoading(false)
                    if (result.response === 'success') {
                        // navigation.navigate('TopUpSuccess', { data: result.data })
                        //hide the modal
                        setOpenPicker(false)
                        return showMessage({
                            message: "A Top Up request has been sent to your phone. You will receive an a pop up shortly.",
                            type: "success",
                            icon: "success",
                            duration: 3000
                        })
                    }
                    else {
                        setPhoneNumber('')
                        setLoading(false)
                        setOpenPicker(false)
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
            // setLoading(false)
            setSelectedPaymentMethod("")
            setPhoneNumber('')
            setLoading(false)
            setOpenPicker(false)
            return showMessage({
                message: "Top Up Failed",
                type: "info",
                icon: "info",
                duration: 3000
            })
        }
    }


    return (
        <RBSheet
            ref={refRBSheet}
            height={600}
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
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="always"
                contentContainerStyle={{ paddingBottom: 100 }}
            >

                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => setOpenPicker(false)}
                    style={[generalStyles.centerContent, { position: 'absolute', top: 10, right: 10 }]}
                >
                    <AntDesign
                        name="close"
                        size={25}
                        color={COLORS.primaryRedHex}
                        onPress={() => setOpenPicker(false)}
                    />

                </TouchableOpacity>

                <View style={[generalStyles.formContainer]}>
                    <View>
                        <Text style={generalStyles.formInputTextStyle}>
                            Top Up
                        </Text>
                    </View>
                    <Text style={[generalStyles.textStyle]}>Please follow the prompts below to top up your card</Text>
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

                    {/* amount scroller */}
                    <View>
                        <AmountScroller
                            amounts={amounts} amount={amount}
                            setAmount={setAmount}
                        />
                    </View>
                    {/* amount scroller */}

                    {/* select payment method */}
                    <SelectPaymentMethod
                        selectedPaymentOption={selectedPaymentOption}
                        setSelectedPaymentOption={setSelectedPaymentOption}
                    />
                    {/* select payment method */}

                    {/* phone number */}
                    {/* phone number */}
                    <View style={[generalStyles.formContainer, { marginHorizontal: 0 }]}>
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
                                placeholderTextColor: COLORS.primaryWhiteHex
                            }}
                        />
                        <View>
                            {errors.phoneNumber && <Text style={generalStyles.errorText}>{errors.phoneNumber}</Text>}
                        </View>

                    </View>
                    {/* phone number */}
                    {/* phone number */}


                    <TouchableOpacity
                        style={[generalStyles.loginContainer, styles.buttonCardStyles]}
                        onPress={() => handleTopUp()}

                    >
                        <Text style={[generalStyles.loginText, { color: COLORS.primaryBlackHex }]}>
                            {'Proceed'}
                        </Text>
                    </TouchableOpacity>
                    {loading && <ActivityIndicator />}

                </View>

            </ScrollView>

        </RBSheet>
    )
}

export default TopUpModal

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