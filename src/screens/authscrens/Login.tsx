import { Text, View, TouchableOpacity, TextInput, Image, StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import React, { useState, useRef } from 'react'
import { generalStyles } from '../utils/generatStyles';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTFAMILY } from '../../theme/theme';
import { ActivityIndicator } from '../../components/ActivityIndicator';
import { showMessage } from 'react-native-flash-message';
import { LOGIN_IN_USER } from '../utils/constants/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { skipFirstLogin, updateUserState } from '../../redux/store/slices/UserSlice';
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

      var details = {
        'userName': phoneNumber,
        'password': password,
        'grant_type': 'password'
      };

      var formBody:any = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");


      fetch(LOGIN_IN_USER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
      })
        .then((response) => response.text())
        .then((result) => {
          setLoading(false);
          // Parse the response text into individual JSON objects
          const jsonObjects = result.trim().split(/\}\s*\{/);

          // Parse only the first JSON object
          try {
            const firstObject = JSON.parse(jsonObjects[0] + (jsonObjects.length > 1 ? '}' : ''));
            // Check if the parsed object has the 'status' property

            if (firstObject && firstObject.status) {
              if (firstObject.status == 3) {
                showMessage({
                  message: "Verify Phone Number",
                  description: "Please verify your phone number",
                  type: "success",
                  autoHide: true,
                  duration: 3000,
                  icon: "success"
                });
                navigation.navigate("VerifyPhoneNumber", {
                  phoneNumber: phoneNumber,
                  email: password
                })
                // Handle verify phone number logic
              } else if (firstObject.status == 0) {
                showMessage({
                  message: "Login Failed",
                  description: "Invalid phone number or password",
                  type: "info",
                  autoHide: true,
                  duration: 3000,
                  icon: "danger"
                });
                // Handle login failed logic
              } else if (firstObject.status == 1) {
                // Handle login successful logic
                let token = firstObject?.access_token;

                console.log("=====================")
                console.log(token)
                console.log("=====================")

                AsyncStorage.setItem('token', token);
                let name = `${firstObject?.FirstName} ${firstObject?.LastName}`
                let email = `${firstObject?.Email}`;
                let phone = `${firstObject?.MobileNumber}`;
                let displayPicture = `${firstObject?.Avatar}`;
                let role = `${firstObject?.role}`;
                dispatch(
                  updateUserState({
                    isLoggedIn: true,
                    user: {
                      UID: token,
                      fullName: name,
                      email: email,
                      phone: phone,
                      displayPicture: displayPicture,
                      role: role
                    },
                    authToken: token,
                    isGuest: false,
                    linkedCard: null,
                    station: []
                  }),
                );
              } else {
                showMessage({
                  message: "Login Failed",
                  description: "Invalid phone number or password",
                  type: "info",
                  autoHide: true,
                  duration: 3000,
                  icon: "danger"
                });
                // Handle other status codes
              }
            } else {
              showMessage({
                message: "Login Failed",
                description: "Invalid phone number or password",
                type: "info",
                autoHide: true,
                duration: 3000,
                icon: "danger"
              });
              // Handle invalid response format
            }
          } catch (error) {
            showMessage({
              message: "Error",
              description: "Invalid phone number or password",
              type: "info",
              autoHide: true,
              duration: 3000,
              icon: "danger"
            });
            // Handle JSON parsing error
          }
        })
        .catch((error) => {
          setLoading(false);
          showMessage({
            message: "Error",
            description: "Invalid phone number or password",
            type: "info",
            autoHide: true,
            duration: 3000,
            icon: "danger"
          });
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
        <View style={[generalStyles.centerContent, {marginVertical:20}]}>
            <Text style={[generalStyles.authTitle, {fontSize:15, color:COLORS.primaryBlackRGBA}]}>
               Enter registered email or phone number and
            </Text>
            <Text style={[{fontSize:15, color:COLORS.primaryBlackRGBA, fontFamily:FONTFAMILY.Lovato_Bold}]}>password to login into your account</Text>

        </View>
        {/* center logo */}

        {/* phone number */}
        <View style={[generalStyles.formContainer]}>
          <PhoneInput
            ref={phoneInput}
            defaultValue={phoneNumber}
            defaultCode="UG"
            layout="second"
            onChangeFormattedText={(text) => {
              setPhoneNumber(text);
            }}
            placeholder={'Phone Number'}
          
            containerStyle={[generalStyles.formInput, generalStyles.borderStyles,{ backgroundColor: COLORS.primaryBlackHex, }]}
            textContainerStyle={{ paddingVertical: 0, backgroundColor: COLORS.primaryBlackHex, }}
            textInputProps={{
              placeholderTextColor: COLORS.primaryWhiteHex,
              // fontFamily: FONTFAMILY.Lovato_Bold,

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


        <View style={[generalStyles.formContainer, {marginVertical:10}]}>
          
          <View style={[generalStyles.flexStyles,generalStyles.borderStyles , {alignItems:"center"}]}>
            <TextInput
              style={[generalStyles.formInput]}
              placeholderTextColor={COLORS.primaryWhiteHex}
              secureTextEntry={!showPassword}
              placeholder={'Password'}
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



        <View style={[generalStyles.forgotPasswordContainer]}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate("ForgotPasswordEmail")}
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

                {/* already have an account login */}
                <View style={[generalStyles.centerContent , {marginTop:20}]}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate("Register")}
            style={[generalStyles.centerContent, { flexDirection: 'row' }]}
          >
             <Text style={generalStyles.CardTitle}>Dont have an account? </Text>
            <Text style={generalStyles.forgotText}>
              {'Register'}
            </Text>
          </TouchableOpacity>
        </View>
        {/* already have an account login */}

        {/* add skip  word */}
        <TouchableOpacity
                     activeOpacity={1}
                     onPress={() =>dispatch(skipFirstLogin())}
                     style={[generalStyles.centerContent, { flexDirection: 'row' }]}
        >
          <Text style={[generalStyles.forgotText, {marginTop: 10}]}>Skip for now</Text>
        </TouchableOpacity>
        {/* add skip  word */}


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

