import { Text, View, TouchableOpacity, TextInput, Image, StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import React, { useState, useRef } from 'react'
import { generalStyles } from '../utils/generatStyles';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../theme/theme';
import { ActivityIndicator } from '../../components/ActivityIndicator';
import { showMessage } from 'react-native-flash-message';
import { LOGIN, LOGIN_IN_USER } from '../utils/constants/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateUserState } from '../../redux/store/slices/UserSlice';
import { useDispatch } from 'react-redux';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import PhoneInput from "react-native-phone-number-input";



const Login = () => {
  const dispatch = useDispatch<any>()

  const navigation = useNavigation<any>();
  const [password, setPassword] = React.useState<any>('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false)
  // Function to toggle the password visibility state 

  //phone number details
  const [phoneNumber, setPhoneNumber] = React.useState<any>('');
  const phoneInput = useRef<PhoneInput>(null);
  //phone number details

  const toggleShowPassword = () => { setShowPassword(!showPassword); };

  const [errors, setErrors] = useState<any>({
    phoneNumber: '',
    password: '',
  });



  const onPressLogin = async () => {
    if (phoneNumber == "") {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        phoneNumber: "Phone number is required"
      }));
      return;
    }
    else {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        phoneNumber: ""
      }));
    }


    if (password == "") {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        password: "Passsword is required"
      }));
      return;
    }
    else {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        password: ""
      }));
    }

    try {
      setLoading(true)

      const headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Content-Type', 'application/json');


      const body = JSON.stringify(
        {
          "username": phoneNumber,
          "password": password
        }
      )

      fetch(`${LOGIN_IN_USER}`, {
        method: 'POST',
        headers,
        body,
      })
        .then(response => response.json())
        .then(async result => {

          if (result?.errors) {
            setErrors(result.errors);
            showMessage({
              message: "Error",
              description: "Invalid email or password",
              type: "info",
              autoHide: true,
              duration: 3000,
              icon: "danger"
            })
            return setLoading(false);
          }

          if (result.response === 'failure') {

            if (result.isVerified === false) {
              setErrors({
                // email: [result?.message],
                password: [result?.message],
              });

              showMessage({
                message: "Verify Phone number",
                description: "Phone number not verified",
                type: "info",
                autoHide: true,
                duration: 3000,
                icon: "danger"
              })
              navigation.navigate("VerifyEmail", { email: "", phoneNumber: phoneNumber })
              return setLoading(false);
            }
            setErrors({
              // email: [result?.message],
              password: [result?.message],
            });
            showMessage({
              message: "Error",
              description: "Login Failed",
              type: "info",
              autoHide: true,
              duration: 3000,
              icon: "danger"
            })
            return setLoading(false);
          }

          if (result?.response === 'success') {
            AsyncStorage.setItem('token', result?.authToken);
            dispatch(
              updateUserState({
                isLoggedIn: true,
                user: {
                  UID: result?.user.id,
                  fullName: result?.user.name,
                  email: result?.user?.email,
                  phone: result?.user?.phone_number,
                  displayPicture: result?.user?.avatar,
                  role: result?.user.role
                },
                authToken: result?.authToken,
                isGuest: false,
                linkedCard: null
              }),
            );

            setLoading(false);
            setPhoneNumber('');
            setPassword('');
          }

          setLoading(false);
        })
        .catch(error => {

          setLoading(false);
        });


    } catch (error) {
      setLoading(false)
      showMessage({
        message: "Error",
        description: "Invalid phone number or password",
        type: "info",
        autoHide: true,
        duration: 3000,
        icon: "danger"
      })
    }

  }

  return (
    <View style={generalStyles.ScreenContainer}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%', backgroundColor: COLORS.primaryBlackHex }}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        {/* login and register */}
        {/* <Text style={styles.title}>{'Login'}</Text> */}

        {/* login and register */}
        <View
          style={[
            generalStyles.flexStyles,
            {
              alignItems: 'center',
            },
          ]}
        >
          <View

          >
            <TouchableOpacity>
              <Text style={generalStyles.authTitle}>Login</Text>
            </TouchableOpacity>
            <View style={generalStyles.bottomHairline} />

          </View>

          <View>
            <TouchableOpacity
              onPress={() => {

                navigation.navigate('Register');
              }}
            >
              <Text style={generalStyles.authTitle}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* login and register */}

        {/* center logo */}
        <View style={generalStyles.centerContent}>
          <Image
            source={require('../../assets/app_images/stabex_logo.jpg')}
            style={{
              width: 100,
              height: 100,
              // tintColor: COLORS.primaryBlackHex,
              borderRadius: 20
            }}
            resizeMode="contain"
          />

        </View>
        {/* center logo */}

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
            onChangeFormattedText={(text) => {
              setPhoneNumber(text);
            }}
            placeholder={'enter phone number'}
            containerStyle={[generalStyles.formInput, { backgroundColor: COLORS.primaryBlackHex, }]}
            textContainerStyle={{ paddingVertical: 0, backgroundColor: COLORS.primaryBlackHex, }}
            textInputProps={{
              placeholderTextColor: COLORS.primaryWhiteHex
            }}
            // countries={['UG', 'KE']}
            countryPickerProps={{
              countryCodes: ['UG', 'KE'],

            }}
          />
          <View>
            {errors.phoneNumber && <Text style={generalStyles.errorText}>{errors.phoneNumber}</Text>}
          </View>

        </View>
        {/* phone number */}


        <View style={generalStyles.formContainer}>
          <View>
            <Text style={generalStyles.formInputTextStyle}>
              Password</Text>
          </View >
          <View style={[generalStyles.flexStyles, styles.viewStyles]}>
            <TextInput
              style={[generalStyles.formInput, { flex: 1 }]}
              placeholderTextColor={COLORS.primaryWhiteHex}
              secureTextEntry={!showPassword}
              placeholder={'enter password'}
              onChangeText={text => setPassword(text)}
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



        <View style={generalStyles.forgotPasswordContainer}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text style={generalStyles.forgotText}>
              {'Forgot password?'}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          activeOpacity={1}
          style={generalStyles.loginContainer}
          onPress={() => onPressLogin()}>
          <Text style={generalStyles.loginText}>{'Login'}</Text>
        </TouchableOpacity>


        {loading && <ActivityIndicator />}
      </KeyboardAwareScrollView>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({

  icon: {
    marginLeft: -20,
  },
  viewStyles: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 15
  },

});

