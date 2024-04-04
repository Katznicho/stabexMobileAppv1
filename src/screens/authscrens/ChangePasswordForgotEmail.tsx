import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated';
import { showMessage } from 'react-native-flash-message';
import { causeVibration, getErrorMessage, validateConfirmPassword, validatePassword } from '../utils/helpers/helpers';
import { USER_SET_PASSWORD } from '../utils/constants/routes';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { generalStyles } from '../utils/generatStyles';
import { COLORS } from '../../theme/theme';
import { ActivityIndicator } from '../../components/ActivityIndicator';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


const ChangePasswordForgotEmail = () => {
    const { params } = useRoute<any>();

    const [otpCode, setOtpCode] = useState<any>('');

    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const [loading, setLoading] = useState<boolean>(false);

    const [showPassword, setShowPassword] = useState<boolean>(false)
    // Function to toggle the password visibility state 
    const toggleShowPassword = () => { setShowPassword(!showPassword) };

    const handlePasswordChange = (text: any) => {
        setPassword(text);
        if (!validatePassword(text)) {
            setErrors({ ...errors, password: 'Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be 8-20 characters long' });
        } else {
            setErrors({ ...errors, password: '' });
        }
    };

    const handleConfirmPasswordChange = (text: string) => {
        setConfirmPassword(text);
        if (!validateConfirmPassword(text, password)) {
            setErrors({ ...errors, confirmpassword: 'Passwords do not match' });
        } else {
            setErrors({ ...errors, confirmpassword: '' });
        }
    };

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
            marginLeft: 14,
        };
    });

    function triggerErrorAnimation() {
        rotation.value = withSequence(
            withTiming(-10, { duration: 50 }),
            withRepeat(withTiming(ANGLE, { duration: 100 }), 4, true),
            withTiming(0, { duration: 50 }),
        );
    }

    const navigation = useNavigation<any>();

    function changePassword() {
        try {
            if (!otpCode || !password || !confirmPassword) {
                return setErrors((prevErrors: any) => ({
                    ...prevErrors,
                    otpCode: "Code is required",
                    password: "Password is required",
                    confirmpassword: "Confirm Password is required"
                }))
            }
            if (otpCode == "") {
                setErrors((prevErrors: any) => ({
                    ...prevErrors,
                    otpCode: "Code is required"
                }));
                return;
            }
            if (password == "") {
                setErrors((prevErrors: any) => ({
                    ...prevErrors,
                    password: "Password is required"
                }));
                return;
            }
            if (confirmPassword == "") {
                setErrors((prevErrors: any) => ({
                    ...prevErrors,
                    confirmpassword: "Confirm Password is required"
                }));
                return;
            }

            if (password != confirmPassword) {
                showMessage({
                    message: 'Password Mismatch',
                    description: 'Passwords must match',
                    type: 'info',
                    icon: 'info',
                    duration: 3000,
                    autoHide: true,
                });
                return;
            }

            setLoading(true);
            const headers = new Headers();
            headers.append('Accept', 'application/json');
            headers.append('Content-Type', 'application/json');
            const body = JSON.stringify(
                {
                    "Email": params?.email.trim().toLowerCase(),
                    "Code": otpCode,
                    "NewPassword": password,
                    "ConfirmPassword": confirmPassword
                }
            )

            fetch(`${USER_SET_PASSWORD}`, {
                method: 'POST',
                headers,
                body,
            })
                .then(response => response.json())
                .then(async result => {


                    if (result?.status == 1) {
                        showMessage({
                            message: 'Password Changed Successfully',
                            description:
                                'Your password has been changed successfully',
                            type: 'success',
                            icon: 'success',
                            duration: 3000,
                            autoHide: true,
                        });
                        return navigation.navigate('Login');
                    }
                    else {
                        // setErrors(result.message);
                        causeVibration();
                        triggerErrorAnimation();
                        showMessage({
                            message: 'Failed to change password',
                            description: 'Please try again',
                            type: 'info',
                            icon: 'info',
                            duration: 3000,
                            autoHide: true,
                        });
                        return setLoading(false);

                    }
                })
                .catch(error => {
                    showMessage({
                        message: 'Failed to change password',
                        description: 'Please try again',
                        type: 'info',
                        icon: 'info',
                        duration: 3000,
                        autoHide: true,
                    });

                    return setLoading(false);
                });
        } catch (error) {
            showMessage({
                message: 'Failed to change password',
                description: 'Please try again',
                type: 'info',
                icon: 'info',
                duration: 3000,
                autoHide: true,
            });
            setLoading(false);
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
                    <Text style={[{ fontSize: 20 }, generalStyles.textStyle]}>
                        Change Password?
                    </Text>
                </View>
                <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                    <Text style={[generalStyles.textStyle]}>
                        Check your email. We have sent you a code. You need the
                        code to change your password
                    </Text>
                </View>

                {/* code */}
                <View style={generalStyles.formContainer}>
                    <View>
                        <Text style={generalStyles.formInputTextStyle}>
                            Code </Text>
                    </View>
                    <TextInput
                        style={generalStyles.formInput}
                        placeholder="Enter Code"
                        placeholderTextColor={COLORS.primaryLightGreyHex}
                        keyboardType="number-pad"
                        value={otpCode}
                        onChangeText={text => {
                            setOtpCode(text);

                            if (errors?.otp) {
                                setErrors({
                                    ...errors,
                                    otp: '',
                                });
                            }
                        }}
                        maxLength={4}
                    />

                    <Animated.Text style={[styles.errorColor, errorStyle]}>
                        {getErrorMessage(errors, 'otp')}
                    </Animated.Text>
                    <View>
                        {errors?.otpCode && <Text style={generalStyles?.errorText}>{errors?.otpCode}</Text>}
                    </View>

                </View>

                {/* code */}
                {/* password */}
                <View style={[generalStyles.formContainer]}>
                    <View>
                        <Text style={generalStyles.formInputTextStyle}>
                            Password</Text>
                    </View>
                    <View style={[generalStyles.flexStyles, styles.viewStyles]}>
                        <TextInput
                            style={[generalStyles.formInput, { flex: 1 }, errors.password && generalStyles.errorInput]}
                            placeholderTextColor={COLORS.primaryWhiteHex}
                            secureTextEntry={!showPassword}
                            placeholder={'enter password'}
                            onChangeText={handlePasswordChange}
                            value={password}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                        <MaterialCommunityIcons
                            name={showPassword ? 'eye-off' : 'eye'}
                            size={24}
                            color={COLORS.secondaryGreyHex}
                            style={styles.icon}
                            onPress={toggleShowPassword}
                        />
                    </View>

                    <View>
                        {errors.password && <Text style={generalStyles.errorText}>{errors.password}</Text>}
                    </View>

                </View>

                {/* password */}
                {/* password */}

                {/* confirm password */}
                {/* confirm password */}
                <View style={generalStyles.formContainer}>
                    <View>
                        <Text style={generalStyles.formInputTextStyle}>
                            Confirm Password</Text>
                    </View>
                    <View style={[generalStyles.flexStyles, styles.viewStyles]}>
                        <TextInput
                            style={[generalStyles.formInput, { flex: 1 }, errors.confirmpassword && generalStyles.errorInput]}
                            placeholderTextColor={COLORS.primaryWhiteHex}
                            secureTextEntry={!showPassword}
                            placeholder={'confirm  password'}
                            onChangeText={handleConfirmPasswordChange}
                            value={confirmPassword}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                        <MaterialCommunityIcons
                            name={showPassword ? 'eye-off' : 'eye'}
                            size={24}
                            color={COLORS.secondaryGreyHex}
                            style={styles.icon}
                            onPress={toggleShowPassword}
                        />

                    </View>

                    <View>
                        {errors.confirmpassword && <Text style={generalStyles.errorText}>{errors.confirmpassword}</Text>}
                    </View>

                </View>

                {/* confirm  password*/}

                <View>
                    {/* remember me */}

                    <View style={generalStyles.forgotPasswordContainer}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => navigation.navigate("Login")}
                        >
                            <Text style={generalStyles.forgotText}>
                                {'Back to Login'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {/* remember me */}

                    {/* button */}
                    <TouchableOpacity
                        activeOpacity={1}
                        style={generalStyles.loginContainer}
                        onPress={() => changePassword()}>
                        <Text style={generalStyles.loginText}>{'Reset Password'}</Text>
                    </TouchableOpacity>
                    {/* button */}
                    {loading && <ActivityIndicator />}
                </View>
            </ScrollView>
        </KeyboardAwareScrollView>
    );
};

export default ChangePasswordForgotEmail;

const styles = StyleSheet.create({
    spacing: {
        marginBottom: 10,
    },
    icon: {
        marginLeft: -20,
    },
    viewStyles: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    errorColor: { color: '#EF4444', fontSize: 12 },
});
