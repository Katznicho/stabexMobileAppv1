import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import React, { useState, useEffect } from 'react'
import { generalStyles } from '../utils/generatStyles'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Keyboard, Linking } from 'react-native'
import { COLORS, FONTFAMILY } from '../../theme/theme'
import { useNavigation } from '@react-navigation/native'
import { ActivityIndicator } from '../../components/ActivityIndicator'
import { showMessage } from 'react-native-flash-message'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { FETCH_COUNTRIES, REQUEST_EMAIL_OTP, REQUEST_STABEX_OTP } from '../utils/constants/routes'
import { validateConfirmPassword, validateEmail, validatePassword, validatePhoneNumber } from '../utils/helpers/helpers';
import useGetUserLocation from '../../hooks/useGetUserLocation';
import DeviceInfo from 'react-native-device-info';
import { Checkbox, Picker, } from 'react-native-ui-lib';
import Entypo from "react-native-vector-icons/Entypo";
import { addEventListener } from "@react-native-community/netinfo";
import WifiManager from 'react-native-wifi-reborn';
import { skipFirstLogin } from '../../redux/store/slices/UserSlice'
import { AppDispatch } from '../../redux/store/dev'
import { useDispatch } from 'react-redux'



const Register = () => {

  const navigation = useNavigation<any>();

  const handleTermsPress = () => {
    // Replace 'https://example.com/terms' with your actual terms and conditions URL
    Linking.openURL('https://example.com/terms');
  };

  const handlePrivacyPress = () => {
    // Replace 'https://example.com/privacy' with your actual privacy policy URL
    Linking.openURL('https://example.com/privacy');
  };

  const dispatch =  useDispatch<AppDispatch>()


  const [ssid, setSSID] = useState('');
  const [bssid, setBSSID] = useState('');

  const [firstName, setfirstName] = React.useState<any>('');
  const [lastName, setlastName] = React.useState<any>('');
  const [email, setEmail] = React.useState<any>('');
  const [password, setPassword] = React.useState<any>('');
  const [confirmPassword, setConfirmPassword] = React.useState<any>('');
  const [countryCode, setCountryCode] = useState<any>("");
  const [deviceInfo, setDeviceInfo] = useState<any>(null);
  const [Iaccept, setIaccept] = useState<boolean>(false);

  useEffect(() => { }, [countryCode])

  const [networkInfo, setNetworkInfo] = useState<any>(null);

  useEffect(() => {
    // Subscribe
    const unsubscribe = addEventListener(state => {
      setNetworkInfo(state);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  //wifi
  useEffect(() => {
    async function fetchNetworkInfo() {
      try {
        const ssid = await WifiManager.getCurrentWifiSSID();
        const bssid = await WifiManager.getBSSID();
        setSSID(ssid);
        setBSSID(bssid);
      } catch (error) {
        setSSID('No Network');
        setBSSID('No Network');
      }
    }
    fetchNetworkInfo();
  }, []);
  //wifi

  //use effect for device info
  useEffect(() => {
    async function fetchDeviceInfo() {
      try {

        let deviceId = await DeviceInfo.getDeviceId();
        let model = await DeviceInfo.getModel();
        let readableVersion = await DeviceInfo.getReadableVersion();
        let type = await DeviceInfo.getDeviceType()
        let ipAddress = await DeviceInfo.getIpAddress();
        let hardWare = await DeviceInfo.getHardware();
        let fingerPrint = await DeviceInfo.getFingerprint();
        let host = await DeviceInfo.getHost();
        let brand = await DeviceInfo.getBrand();
        let bootLoader = await DeviceInfo.getBootloader();
        let androidId = await DeviceInfo.getAndroidId();
        let manufacturer = await DeviceInfo.getManufacturer();
        let product = await DeviceInfo.getProduct();
        let tags = await DeviceInfo.getTags();
        let device = await DeviceInfo.getDevice();
        let display = await DeviceInfo.getDisplay();
        setDeviceInfo({
          deviceId,
          model,
          readableVersion,
          type,
          ipAddress,
          hardWare,
          fingerPrint,
          host,
          brand,
          bootLoader,
          androidId,
          manufacturer,
          product,
          tags,
          device,
          display
        });
      } catch (error) {
        console.error('Error fetching device info: ', error);
      }
    }
    fetchDeviceInfo();
  }, []);
  //use effect for device info

  const { position } = useGetUserLocation();

  const [countries, setCountries] = useState<any>([]);



  const handleEmailChange = (text: any) => {
    setEmail(text);
    if (!validateEmail(text)) {
      setErrors({ ...errors, email: 'Invalid email address' });
    } else {
      setErrors({ ...errors, email: '' });
    }
  };

  const handlePhoneNumberChange = (text: any) => {
    setPhoneNumber(text);
    if (!validatePhoneNumber(text)) {
      setErrors({ phoneNumber: 'Phone number must be 10 digits' });
    } else {
      setErrors({ phoneNumber: '' });
    }

  };

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


  useEffect(() => {
    fetch(FETCH_COUNTRIES, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

    }).then((data) => data.json()).then((data) => {
      setCountries(data?.data)
    })
  }, [])

  //phone number details
  const [phoneNumber, setPhoneNumber] = React.useState<any>('');

  //phone number details

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
  });

  const [showPassword, setShowPassword] = useState<boolean>(false)
  // Function to toggle the password visibility state 
  const toggleShowPassword = () => { setShowPassword(!showPassword); };


  const onRegister = async () => {

    //incase all fields are empty
    if (!firstName && !lastName && !phoneNumber && !email && !password && !confirmPassword || !countryCode) {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        firstName: 'First name is required',
        lastName: 'Last name is required',
        phoneNumber: 'Phone number is required',
        email: 'Email is required',
        password: 'Password is required',
        confirmpassword: 'Confirm password is required',
        countryCode: 'Country  is required',

      }));
      return;
    }

    // Validate first name
    if (!firstName) {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        firstName: 'First name is required',
      }));
      return;
    } else {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        firstName: '',
      }));
    }

    // Validate last name
    if (!lastName) {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        lastName: 'Last name is required',
      }));
      return;
    } else {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        lastName: '',
      }));
    }

    // Validate phone number
    if (!validatePhoneNumber(phoneNumber)) {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        phoneNumber: 'Phone number must be 10 digits',
      }));
      return;
    } else {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        phoneNumber: '',
      }));
    }

    // Validate email format
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

    // Validate password matching
    if (password !== confirmPassword) {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        passwordMatch: 'Passwords do not match',
      }));
      return;
    } else {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        passwordMatch: '',
      }));
    }

    setLoading(true)
    Keyboard.dismiss()

    try {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");


      const registerBody = {
        "Email": email,
        "Password": password,
        "MobileNumber": phoneNumber.slice(1),
        "FirstName": firstName,
        "Company": "STABEX INTERNATIONAL",
        "CountryCode": countryCode,
        "LastName": lastName,
        "confirmpassword": confirmPassword,
        "LocationModel": {
          "latitude": position?.latitude,
          "longitude": position?.longitude
        },
        "DeviceInfoModel": {
          "deviceUUID": deviceInfo.deviceId,
          "version": parseInt(deviceInfo.readableVersion),
          "board": "sample string 5",
          "bootloader": deviceInfo.bootLoader,
          "brand": deviceInfo.brand,
          "device": deviceInfo.device,
          "display": deviceInfo.display,
          "fingerprint": deviceInfo.fingerPrint,
          "hardware": deviceInfo.hardWare,
          "host": deviceInfo.host,
          "manufacturer": deviceInfo.manufacturer,
          "model": deviceInfo.model,
          "product": deviceInfo.product,
          "tags": deviceInfo.tags,
          "type": deviceInfo.type,
          "androidId": deviceInfo.androidId,
          "isPhysicalDevice": true,
          "isDeviceRooted": true,
          "isAndroidDevice": true,
          "isIosDevice": true
        },
        "NetworkInfoModel": {
          "connectionType": networkInfo.type,
          "ssid": ssid,
          "bssid": bssid,
          "ipAddress": deviceInfo.ipAddress
        },
      }

      const body = JSON.stringify(
        {
          "Email": email,
          "Password": password,
          "ConfirmPassword": confirmPassword,
          "CountryCode": countryCode,
          "PhoneNumber": phoneNumber.slice(1),
          "MobileNumber": phoneNumber.slice(1),
        }
      )
       console.log(body)
      fetch(`${REQUEST_STABEX_OTP}`, {
        method: 'POST',
        headers,
        body: body
      })
        .then(response => response.json())
        .then(async result => {
            console.log("==================")
            console.log(result)
            console.log("==================")
          if (result.status == 1) {
            navigation.navigate("VerifyEmail", {
              phoneNumber: countryCode + phoneNumber.slice(1),
              email,
              body: registerBody
            })

          }
          else {
            // failure
            showMessage({
              message: "Failed to register",
              description: result?.message,
              type: "info",
              autoHide: true,
              duration: 3000,
              icon: "danger"
            })
            return setLoading(false);
          }
        })
        .catch(error => {
          setLoading(false);
        });
    }
    catch (error) {
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
    <View style={generalStyles.ScreenContainer}>
      <KeyboardAwareScrollView
        style={{
          flex: 1,
          width: '100%',
        }}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}

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
          <View>
            <TouchableOpacity
              onPress={() => {

                navigation.navigate('Login');
              }}
            >
              <Text style={generalStyles.authTitle}>Login</Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity>
              <Text style={generalStyles.authTitle}>Register</Text>
            </TouchableOpacity>
            <View style={generalStyles.bottomHairline} />

          </View>
        </View>
        {/*  register */}

        {/* Enter details below to create an account */}
        <Text style={[generalStyles.authTitle, {fontSize:15, color:COLORS.primaryWhiteHex}]}>Enter details below to create an account.</Text>

        {/* first name */}
        <View style={generalStyles.formContainer}>
          <TextInput
            style={[generalStyles.formInput, styles.borderStyles, styles.textInputMarginRight, errors.firstName && styles.errorInput]}
            placeholder={'First Name'}
            keyboardType="default"
            placeholderTextColor={COLORS.primaryWhiteHex}
            onChangeText={text => setfirstName(text)}
            value={firstName}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <View>
            {errors.firstName && <Text style={generalStyles.errorText}>{errors.firstName}</Text>}
          </View>

        </View>
        {/* first name */}

        {/* second name */}
        <View style={generalStyles.formContainer}>
          <TextInput
            style={[generalStyles.formInput,styles.borderStyles, styles.textInputMarginRight, errors.lastName && styles.errorInput]}
            placeholder={'Last Name'}
            keyboardType="default"
            placeholderTextColor={COLORS.primaryWhiteHex}
            onChangeText={text => setlastName(text)}
            value={lastName}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <View>
            {errors.lastName && <Text style={generalStyles.errorText}>{errors.lastName}</Text>}
          </View>

        </View>
        {/* second name */}

        {/* country */}

        {
          countries.length > 0 && (
            <View style={generalStyles.formContainer}>
              <Picker
                placeholder="Select Country"
                placeholderTextColor={COLORS.primaryLightGreyHex}
                value={countryCode}
                style={[generalStyles.formInput,styles.borderStyles ,errors.countryCode && styles.errorInput]}
                enableModalBlur={false}
                onChange={item => setCountryCode(item)}
                trailingAccessory={<View style={styles.iconStyles}>
                  <Entypo name="chevron-down" size={20} color={COLORS.primaryWhiteHex} />
                </View>}
                color={COLORS.primaryWhiteHex}
                topBarProps={{ title: 'Countries' }}
                showSearch
                searchPlaceholder={'Search countries'}
                searchStyle={{ color: COLORS.primaryBlackHex, placeholderTextColor: COLORS.primaryLightGreyHex }}
              // onSearchChange={value => console.warn('value', value)}
              >
                {
                  countries.map((item: any) => (
                    <Picker.Item key={item.Code}
                      value={item.Code}
                      label={item.CountryName}
                    />
                  ))}
              </Picker>
              <View>
                {errors.countryCode && <Text style={generalStyles.errorText}>{errors.countryCode}</Text>}
              </View>
            </View>
          )
        }
        {/* country */}

        {/* phone number */}
        <View style={generalStyles.formContainer}>
          <TextInput
            style={[
              generalStyles.formInput,
              styles.borderStyles,
              styles.textInputMarginRight,
              errors.phoneNumber && styles.errorInput
            ]}
            placeholder={'Phone Number'}
            placeholderTextColor={COLORS.primaryWhiteHex}
            onChangeText={handlePhoneNumberChange}
            value={phoneNumber}
            keyboardType="number-pad"
            maxLength={10}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <View>
            {errors.phoneNumber && <Text style={[generalStyles.errorText]}>{errors.phoneNumber}</Text>}
          </View>

        </View>
        {/* phone number */}

        {/* email */}
        <View style={generalStyles.formContainer}>
          <TextInput
            style={[
              generalStyles.formInput,
              styles.borderStyles,
              styles.textInputMarginRight,
              errors.email && styles.errorInput
            ]}
            placeholder={'Email Address'}
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

        {/* password */}
        {/* password */}
        <View style={[generalStyles.formContainer]}>
          <View style={[generalStyles.flexStyles, {alignItems: 'center'}]}>
            <TextInput
              style={[generalStyles.formInput,styles.borderStyles , errors.password && styles.errorInput]}
              placeholderTextColor={COLORS.primaryWhiteHex}
              secureTextEntry={!showPassword}
              placeholder={'Password'}
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
          <View style={[generalStyles.flexStyles, {alignItems: 'center'}]}>
            <TextInput
              style={[generalStyles.formInput,styles.borderStyles , errors.confirmpassword && styles.errorInput]}
              placeholderTextColor={COLORS.primaryWhiteHex}
              secureTextEntry={!showPassword}
              placeholder={'Confirm Password'}
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

        {/* conform to terms and conditions */}
        <View style={[generalStyles.flexStyles, { alignItems: 'center' }, generalStyles.formContainer]}>
          <View style={{ marginHorizontal: 3 }}>
            <Checkbox
              value={Iaccept}
              onValueChange={() => setIaccept(!Iaccept)}
              borderRadius={0}
              size={20}
            />
          </View>

          <View>
            <TouchableOpacity onPress={handleTermsPress} style={{marginHorizontal:10}}>
              <View style={[generalStyles.flexStyles, {marginRight:5}]}>
                <Text style={generalStyles.CardTitle}> 
                  I accept the
                   <Text style={[generalStyles.CardTitle, { color: 'blue', fontFamily:FONTFAMILY.Lovato_Bold }]}> Terms and Conditions</Text>
                   <Text style={generalStyles.CardTitle}> and have read </Text>
                 </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={handlePrivacyPress} style={{marginHorizontal:10}}>
              <View style={[generalStyles.flexStyles]}>
                 <Text style={generalStyles.CardTitle}>the</Text>
                <Text style={[generalStyles.CardTitle, { color: 'blue', fontFamily:FONTFAMILY.Lovato_Bold }]}> Privacy Policy</Text>
              </View>
            </TouchableOpacity>
          </View>

        </View>

        {/* conform to terms and conditions */}

        <TouchableOpacity
          activeOpacity={Iaccept ? 1 : 0.5} // Set activeOpacity to 1 when enabled, and 0.5 when disabled
          style={[generalStyles.loginContainer, { opacity: Iaccept ? 1 : 0.5 }]} // Adjust opacity based on Iaccept state
          disabled={!Iaccept}
          onPress={onRegister}>
          <Text style={generalStyles.loginText}>{'Register'}</Text>
        </TouchableOpacity>

        {/* already have an account login */}
        <View style={[generalStyles.centerContent , {marginTop:20}]}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate("Login")}
            style={[generalStyles.centerContent, { flexDirection: 'row' }]}
          >
             <Text style={generalStyles.CardTitle}>Already have an account? </Text>
            <Text style={generalStyles.forgotText}>
              {'Login'}
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

export default Register

const styles = StyleSheet.create({
  icon: {
    marginLeft: -40,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  viewStyles: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 15
  },
  phoneInput: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    paddingHorizontal: 10,
    fontFamily:FONTFAMILY.Lovato_Regular
  },
  countryButton: {
    marginBottom: 20,
  },
  countryPickerButton: {
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  countryPickerCloseButton: {
    width: 20,
    height: 20,
  },
  submitButton: {
    width: '100%',
  },
  textInputMarginRight: {
    marginRight: 15
  },
  iconStyles: {
    position: 'absolute',
    right: 10
  },
  errorInput: {
    borderColor: COLORS.primaryRedHex,
    // borderWidth: 2,
    fontFamily:FONTFAMILY.Lovato_Regular
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