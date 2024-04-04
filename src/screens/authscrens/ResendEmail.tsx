import {
    Text,
    View,
    TextInput,
    ScrollView,
} from 'react-native';
import React, { useState, useRef } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated';
import { causeVibration, validateEmail } from '../utils/helpers/helpers';
import { RESEND_OTP } from '../utils/constants/routes';
import { generalStyles } from '../utils/generatStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TouchableOpacity } from 'react-native';
import { COLORS } from '../../theme/theme';
import { ActivityIndicator } from '../../components/ActivityIndicator';
import { showMessage } from 'react-native-flash-message';
import PhoneInput from "react-native-phone-number-input";
import AsyncStorage from '@react-native-async-storage/async-storage';


const ResendEmailScreen = () => {
    const navigation = useNavigation<any>();


    const [loading, setLoading] = useState<boolean>(false);

    //phone number details
    const [phoneNumber, setPhoneNumber] = React.useState<any>('');
    const phoneInput = useRef<PhoneInput>(null);
    //phone number details

    const { params } = useRoute<any>();
    const { email } = params;

    const [errors, setErrors] = useState<any>({});

    const rotation = useSharedValue(0);
    const ANGLE = 10;

    const errorStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: rotation.value,
                },
            ],
            marginLeft: 17,
        };
    });

    function triggerErrorAnimation() {
        rotation.value = withSequence(
            withTiming(-10, { duration: 50 }),
            withRepeat(withTiming(ANGLE, { duration: 100 }), 4, true),
            withTiming(0, { duration: 50 }),
        );
    }

    //
    //Resend OTP
    function resendOtp() {
        if (email == "") {
            setErrors((prevErrors: any) => ({
                ...prevErrors,
                email: "Email is required"
            }));
            return;
        }

        if (!validateEmail(email)) {

            setErrors((prevErrors: any) => ({
                ...prevErrors,
                email: 'Invalid email format',
            }));
            return;

        } else {
            setErrors((prevErrors: any) => ({
                ...prevErrors,
                email: '',
            }));
        }
        setLoading(true);

        const headers = new Headers();
        headers.append('Accept', 'application/json');

        const body = new FormData();
        // body.append('email', email.toLowerCase());
        body.append("phone_number", phoneNumber);

        fetch(`${RESEND_OTP}`, {
            method: 'POST',
            headers,
            body,
        })
            .then(response => response.json())
            .then(async result => {

                if (result?.errors) {
                    setErrors(result.errors);
                    causeVibration();
                    triggerErrorAnimation();
                    return setLoading(false);
                }

                if (result.response === 'failure') {
                    setErrors({
                        // email: [result?.message],
                        password: [result?.message],
                    });
                    causeVibration();
                    triggerErrorAnimation();
                    return setLoading(false);
                }
                showMessage({
                    message: "Code Resent",
                    description: "An otp has been resent to your email",
                    icon: "success",
                    type: "success",
                    autoHide: true,
                    duration: 3000
                })

                navigation.navigate('VerifyEmail', { email: email });


                setLoading(false);
            })
            .catch(error => {

                setLoading(false);
            });
    }

    return (
        <KeyboardAwareScrollView
            style={[{ flex: 1, width: '100%' }, generalStyles.ScreenContainer]}
            keyboardShouldPersistTaps="always"
        >
            <ScrollView keyboardShouldPersistTaps="always"
                contentContainerStyle={{
                    margin: 20,
                }}
            >


                <Text style={[{ fontSize: 20 }, generalStyles.textStyle]}>Resend OTP Code</Text>

                <Text style={[generalStyles.textStyle]}>
                    Please re-enter your phone number again to resend verification code
                </Text>

                {/* phone number */}
                <View style={generalStyles.formContainer}>
                    <View>
                        <Text style={generalStyles.formInputTextStyle}>
                            Phone Number </Text>
                    </View>
                    <PhoneInput
                        ref={phoneInput}
                        defaultValue={phoneNumber}
                        defaultCode="UG"
                        layout="second"
                        countryPickerProps={{
                            countryCodes: ['UG', 'KE'],

                        }}
                        onChangeFormattedText={(text) => {
                            setPhoneNumber(text);
                        }}
                        placeholder={'enter phone number'}
                        containerStyle={[generalStyles.formInput, { backgroundColor: COLORS.primaryLightWhiteGrey, }]}
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

                {/* button */}
                <TouchableOpacity
                    activeOpacity={1}
                    style={generalStyles.loginContainer}
                    onPress={() => resendOtp()}>
                    <Text style={generalStyles.loginText}>{'Resend Code'}</Text>
                </TouchableOpacity>
                {/* button */}
                {loading && <ActivityIndicator />}
            </ScrollView>
        </KeyboardAwareScrollView>
    );
};

export default ResendEmailScreen;


