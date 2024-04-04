import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    TextInput
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated';
import { showMessage } from 'react-native-flash-message';
import { FORGOT_PASSWORD, USER_FORGOT_PASSWORD } from '../utils/constants/routes';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { generalStyles } from '../utils/generatStyles';
import { COLORS } from '../../theme/theme';
import { causeVibration, validateEmail } from '../utils/helpers/helpers';
import { ActivityIndicator } from '../../components/ActivityIndicator';


const ForgotPasswordEmail = () => {

    const [errors, setErrors] = useState<any>({ email: '', });

    const [email, setEmail] = React.useState<any>('');

    const handleEmailChange = (text: any) => {
        setEmail(text);
        if (!validateEmail(text)) {
            setErrors({ ...errors, email: 'Invalid email address' });
        } else {
            setErrors({ ...errors, email: '' });
        }
    };



    const rotation = useSharedValue(0);
    const ANGLE = 10;

    function triggerErrorAnimation() {
        rotation.value = withSequence(
            withTiming(-10, { duration: 50 }),
            withRepeat(withTiming(ANGLE, { duration: 100 }), 4, true),
            withTiming(0, { duration: 50 }),
        );
    }

    const [loading, setLoading] = useState<boolean>(false);

    const navigation = useNavigation<any>();

    function onForgotPassword() {

        try {
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
            // Validate email format
            const headers = new Headers();
            headers.append('Accept', 'application/json');
            headers.append('Content-Type', 'application/json');


            const body = JSON.stringify(
                {
                    "Email": email.trim().toLowerCase(),
                }
            )
            fetch(`${USER_FORGOT_PASSWORD}`, {
                method: 'POST',
                headers,
                body: body
            }).then(response => response.json())
                .then(async result => {
                    console.log("========res in forgot===========")
                    console.log(result)
                    console.log("========res in forgot===========")
                    if (result.status === 1) {
                        setLoading(false);
                        showMessage({
                            message: 'A code has been sent to your  email',
                            description: 'Please check ',
                            type: 'success',
                            icon: 'success',
                            duration: 3000,
                            autoHide: true,
                        });
                        return navigation.navigate('ChangePasswordForgotEmail', { email: email });

                    }
                    else {
                        setLoading(false);
                        return showMessage({
                            message: "Invalid Email",
                            description: "The email is not registered with us",
                            icon: "danger",
                            type: "danger",
                            autoHide: true,
                            duration: 3000
                        })
                    }

                    // if (result?.errors) {
                    //     setErrors(result.errors);
                    //     causeVibration();
                    //     triggerErrorAnimation();
                    //     return setLoading(false);
                    // }

                    // if (result.response === 'failure') {
                    //     setErrors({
                    //         // email: [result?.message],
                    //         password: [result?.message],
                    //     });
                    //     causeVibration();
                    //     triggerErrorAnimation();
                    //     return setLoading(false);
                    // }
                    // showMessage({
                    //     message: "Code Resent",
                    //     description: "An otp has been resent to your email",
                    //     icon: "success",
                    //     type: "success",
                    //     autoHide: true,
                    //     duration: 3000
                    // })

                    // navigation.navigate('VerifyEmail', { email: email });


                    setLoading(false);
                })
                .catch(error => {

                    setLoading(false);
                });

        } catch (error) {
            console.log("========error in forgot===========")
            console.log(error)
            console.log("========error in forgot===========")
            setLoading(false);
            return showMessage({
                message: "Registration Failed",
                description: "An error occured while creating your account",
                type: "info",
                autoHide: true,
                duration: 3000,
                icon: "danger"
            })

        }




    }
    return (
        <KeyboardAwareScrollView
            style={[{ flex: 1, width: '100%' }, generalStyles.ScreenContainer]}
            keyboardShouldPersistTaps="always"
        >
            <ScrollView
                contentContainerStyle={{
                    margin: 20,
                }}
                keyboardShouldPersistTaps="always"
            >

                <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                    <Text
                        style={[generalStyles.textStyle, { fontSize: 20 }]}
                    >
                        Forgot Password?
                    </Text>
                </View>

                <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                    <Text
                        style={[generalStyles.textStyle]}
                    >
                        Enter your email. We will send you instructions on how to reset your password on email and phone number
                    </Text>
                </View>

                <View>
                    {/* email */}
                    <View style={generalStyles.formContainer}>
                        <View>
                            <Text style={generalStyles.formInputTextStyle}>
                                Email</Text>
                        </View>

                        <TextInput
                            style={[
                                generalStyles.formInput,
                                generalStyles.textInputMarginRight,
                                errors.email && generalStyles.errorInput
                            ]}
                            placeholder={'enter email'}
                            keyboardType="email-address"
                            placeholderTextColor={COLORS.primaryWhiteHex}
                            onChangeText={handleEmailChange}
                            value={email}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                        <View>
                            {errors.email && <Text style={generalStyles.errorText}>{errors.email}</Text>}
                        </View>

                    </View>

                    {/* email */}

                    {/* button */}
                    <TouchableOpacity
                        activeOpacity={1}
                        style={generalStyles.loginContainer}
                        onPress={() => onForgotPassword()}>
                        <Text style={generalStyles.loginText}>{'Send'}</Text>
                    </TouchableOpacity>
                    {/* button */}
                    {loading && <ActivityIndicator />}
                </View>
            </ScrollView>
        </KeyboardAwareScrollView>
    );
};

export default ForgotPasswordEmail;
