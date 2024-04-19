import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React  from 'react'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { generalStyles } from '../../utils/generatStyles';
import { COLORS, FONTFAMILY } from '../../../theme/theme';
import Entypo from "react-native-vector-icons/Entypo";
import { Picker } from 'react-native-ui-lib';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/dev';



const CardInfo = ({ cardApplication, setCardApplication, goToNextStep, errors, setErrors, idTypes }: any) => {

    const tabBarHeight = useBottomTabBarHeight();



    const isDisabled = () =>
        !cardApplication.idType || !cardApplication.idNumber;

    const { user } = useSelector((state: RootState) => state.user);


    return (
        <View style={{ flex: 1, paddingBottom: tabBarHeight }}>

            <View style={[styles.viewStyles]}>
                <Text style={[{ fontSize: 20 }, generalStyles.textStyle]}>
                    Provide Card Information
                </Text>
            </View>
            <View style={[styles.viewStyles]}>
                <Text style={[generalStyles.textStyle]}>
                    This will be displayed on your card once it is issued
                </Text>
            </View>


            {/* card holder name */}
            <View style={styles.formContainer}>
                <View>
                    <Text style={[generalStyles.formInputTextStyle, styles.labelStyles]}>
                        Card Holder Name*</Text>
                </View>
                <View>
                    <TextInput
                        style={[generalStyles.formInput, styles.borderStyles]}
                        placeholderTextColor={COLORS.primaryWhiteHex}
                        // placeholderStyle={{ borderColor: 'red' }}
                        keyboardType="default"
                        placeholder={'enter card holder name'}
                        onChangeText={text => setCardApplication((prev: any) => {
                            return { ...prev, cardHolderName: text }
                        })}
                        value={user?.fullName}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                        editable={false}

                    />
                </View>

                <View>
                    {errors.cardHolderName && <Text style={generalStyles.errorText}>{errors.cardHolderName}</Text>}
                </View>

            </View>
            {/* card holder name */}


            {/* card holder email */}
            <View style={styles.formContainer}>
                <View>
                    <Text style={[generalStyles.formInputTextStyle, styles.labelStyles]}>
                        Card Holder Email*</Text>
                </View>
                <View>
                    <TextInput
                        style={[generalStyles.formInput, styles.borderStyles]}
                        placeholderTextColor={COLORS.primaryWhiteHex}
                        // placeholderStyle={{ borderColor: 'red' }}
                        keyboardType="default"
                        placeholder={'enter card holder name'}
                        onChangeText={text => setCardApplication((prev: any) => {
                            return { ...prev, cardHolderEmail: text }
                        })}
                        value={user?.email}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                        editable={false}

                    />
                </View>

                <View>
                    {errors.cardHolderEmail && <Text style={generalStyles.errorText}>{errors.cardHolderEmail}</Text>}
                </View>

            </View>
            {/* card holder email */}


            {/* mobile number */}
            <View style={generalStyles.formContainer}>
                <View>
                    <Text style={[generalStyles.formInputTextStyle, styles.labelStyles]}>
                        Mobile Number*</Text>
                </View>
                <View>
                    <TextInput
                        style={[generalStyles.formInput, styles.borderStyles]}
                        placeholderTextColor={COLORS.primaryWhiteHex}
                        // placeholderStyle={{ borderColor: 'red' }}
                        keyboardType="default"
                        placeholder={'enter card holder name'}
                        onChangeText={text => setCardApplication((prev: any) => {
                            return { ...prev, cardHolderEmail: text }
                        })}
                        value={user?.phone}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                        editable={false}
                    />
                </View>
                
                <View>
                    {errors.phoneNumber && <Text style={generalStyles.errorText}>{errors.phoneNumber}</Text>}
                </View>

            </View>
            {/* mobile number */}


            {/* id type */}
            <View style={styles.formContainer}>
                <View>
                    <Text style={[generalStyles.formInputTextStyle, styles.labelStyles]}>
                        Select ID Type*</Text>
                </View>
                <Picker
                    placeholder="select Id type"
                    placeholderTextColor={COLORS.primaryLightGreyHex}
                    value={cardApplication.idType}
                    style={[generalStyles.formInput, styles.borderStyles, styles.inlineTextInputStyles]}
                    enableModalBlur={false}
                    onChange={item => {
                        return setCardApplication((prev: any) => {
                            return { ...prev, idType: item }
                        })
                    }}
                    trailingAccessory={<View style={styles.iconStyles}>
                        <Entypo name="chevron-down" size={20} color={COLORS.primaryWhiteHex} />
                    </View>}
                    color={COLORS.primaryWhiteHex}
                    topBarProps={{ title: 'Property Payment Period' }}

                    showSearch
                    searchPlaceholder={'Search  payment periods'}
                    searchStyle={{ color: COLORS.primaryBlackHex, placeholderTextColor: COLORS.primaryLightGreyHex }}
                // onSearchChange={value => console.warn('value', value)}
                >
                    {idTypes.map((item: any) => (
                        <Picker.Item key={item.id}
                            value={item.id}
                            label={item.name}
                        />
                    ))}
                </Picker>
            </View>
            {/* id type */}

            {/* id number */}
            {
                 cardApplication.idType &&(
                    <View style={styles.formContainer}>
                    <View>
                        <Text style={[generalStyles.formInputTextStyle, styles.labelStyles]}>
                            {cardApplication.idType} Number*</Text>
                    </View>
                    <View>
                        <TextInput
                            style={[generalStyles.formInput, styles.borderStyles, styles.extraMargingRight]}
                            placeholderTextColor={COLORS.primaryWhiteHex}
                            // placeholderStyle={{ borderColor: 'red' }}
                            keyboardType="default"
                            placeholder={`Enter ${cardApplication.idType} number`}
                            onChangeText={text => setCardApplication((prev: any) => {
                                return { ...prev, idNumber: text }
                            })}
                            value={cardApplication.idNumber}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                    </View>
    
                    <View>
                        {errors.id_number && <Text style={generalStyles.errorText}>{errors.id_number}</Text>}
                    </View>
    
                </View>
                 )
            }

            {/* id number */}

            {/* button section */}
            <View>
                <TouchableOpacity
                    activeOpacity={1}
                    style={[generalStyles.loginContainer,
                    styles.buttonStyles,
                    { backgroundColor: isDisabled() ? COLORS.primaryLightGreyHex : COLORS.primaryOrangeHex }
                    ]}
                    onPress={goToNextStep}
                    disabled={isDisabled()}
                >
                    <Text style={generalStyles.loginText}>{'Proceed'}</Text>
                </TouchableOpacity>

            </View>
            {/* button section */}
        </View>
    )
}

export default CardInfo

const styles = StyleSheet.create({
    viewStyles: {
        marginHorizontal: 10, marginVertical: 5
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
    formContainer: {
        marginVertical: 10,
        marginHorizontal: 15
    },
    inlineTextInputStyles: {
        width: "100%"
    },
    buttonStyles: {
        width: "80%",
        marginTop: 10,
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 10
    },
    extraMargingRight: {
        marginRight: 30
    },
    labelStyles: {
        color: COLORS.primaryWhiteHex,
        fontFamily: FONTFAMILY.Lovato_Regular,
        fontSize: 15
    },
    iconStyles: {
        position: 'absolute',
        right: 10,
        fontFamily: FONTFAMILY.Lovato_Regular,
    },
})