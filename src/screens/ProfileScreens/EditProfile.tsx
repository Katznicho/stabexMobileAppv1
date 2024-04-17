import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useRef } from 'react'
import { RootState } from '../../redux/store/dev';
import { useSelector } from 'react-redux';
import { generalStyles } from '../utils/generatStyles';
import { COLORS } from '../../theme/theme';
import PhoneInput from "react-native-phone-number-input";
import HeadProfileCard from '../../components/HeadProfileCard';


const EditProfile = () => {

    const { user } = useSelector(
        (state: RootState) => state.user,
    );
    const [fullName, setFullName] = React.useState<any>(user?.fullName);
    const [email, setEmail] = React.useState<any>(user?.email);
    const [errors, setErrors] = useState<any>({})

    //phone number details
    const [phoneNumber, setPhoneNumber] = React.useState<any>(user?.phone.slice(4));
    const phoneInput = useRef<PhoneInput>(null);
    //phone number details


    //phone number details

    const [loading, setLoading] = useState<boolean>(false);


    const onEdit = () => {

    }

    return (
        <ScrollView
            style={[generalStyles.ScreenContainer]}
            showsVerticalScrollIndicator={false}
        >

          {/* header */}
           <HeadProfileCard />
          {/* header */}

            {/* full name */}
            <View style={generalStyles.formContainer}>
                <View>
                    <Text style={generalStyles.formInputTextStyle}>
                        Full Name</Text>
                </View>

                <TextInput
                    style={[generalStyles.formInput, styles.textInputMarginRight, generalStyles.borderStyles]}
                    placeholder={'enter your full name name'}
                    keyboardType="default"
                    placeholderTextColor={COLORS.primaryWhiteHex}
                    onChangeText={text => setFullName(text)}
                    value={fullName}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <View>
                    {errors.fullName && <Text style={generalStyles.errorText}>{errors.fullName}</Text>}
                </View>

            </View>
            {/* full name */}


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
                    containerStyle={[generalStyles.formInput, { backgroundColor: COLORS.primaryLightWhiteGrey }, generalStyles.borderStyles]}
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

            {/* email */}
            <View style={generalStyles.formContainer}>
                <View>
                    <Text style={generalStyles.formInputTextStyle}>
                        Email</Text>
                </View>

                <TextInput
                    style={[generalStyles.formInput, styles.textInputMarginRight, generalStyles.borderStyles]}
                    placeholder={'enter email'}
                    keyboardType="email-address"
                    placeholderTextColor={COLORS.primaryWhiteHex}
                    onChangeText={text => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <View>
                    {errors.email && <Text style={generalStyles.errorText}>{errors.email}</Text>}
                </View>

            </View>
            {/* email */}


            <TouchableOpacity
                style={generalStyles.loginContainer}
                onPress={() => onEdit()}>
                <Text style={generalStyles.loginText}>{'Edit Profile'}</Text>
            </TouchableOpacity>

        </ScrollView>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    icon: {
        marginLeft: -20,
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
    }
})