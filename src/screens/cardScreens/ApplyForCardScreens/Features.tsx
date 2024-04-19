import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { generalStyles } from '../../utils/generatStyles'
import { COLORS, FONTFAMILY } from '../../../theme/theme'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { Checkbox } from 'react-native-ui-lib'

const Features = ({ cardApplication, setCardApplication, goToNextStep, errors, setErrors, goBack, products, weekDays }: any) => {
    const tabBarHeight = useBottomTabBarHeight();

    const isDisabled = () => {
        if (cardApplication.products.length == 0 || cardApplication.usageDays.length == 0) {
            return true;

        }
        else {
            return false;
        }
    }

    return (
        <View style={{ flex: 1, paddingBottom: tabBarHeight }}>

            <View style={[styles.viewStyles]}>
                <Text style={[{ fontSize: 20 }, generalStyles.textStyle]}>
                    Choose Your Product?
                </Text>
            </View>
            <View style={[styles.viewStyles]}>
                <Text style={[generalStyles.textStyle]}>
                    Select and  fill appropriate

                </Text>
            </View>

            {/* vehicle registration */}
            <View style={generalStyles.formContainer}>
                <View>
                    <Text style={[generalStyles.formInputTextStyle, styles.labelStyles]}>
                        Vehicle Registration*</Text>
                </View>
                <View>
                    <TextInput
                        style={[generalStyles.formInput, styles.borderStyles]}
                        placeholderTextColor={COLORS.primaryWhiteHex}
                        // placeholderStyle={{ borderColor: 'red' }}
                        keyboardType="default"
                        placeholder={'Enter Vehicle Registration'}
                        onChangeText={text => setCardApplication((prev: any) => {
                            return { ...prev, vehicleRegistration: text }
                        })}
                        value={cardApplication.vehicleRegistration}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                        
                    />
                </View>
                
                <View>
                    {errors.vehicleRegistration && <Text style={generalStyles.errorText}>{errors.vehicleRegistration}</Text>}
                </View>

            </View>
            {/* vehicle registration */}

            {/* products */}
            <View>
                <View style={styles.formContainer}>
                    <View>
                        <Text style={[generalStyles.formInputTextStyle, styles.labelStyles]}>
                            Select Products Category*</Text>
                    </View>
                    <View>
                        {
                            products.map((item: any) => {
                                return (
                                    <Checkbox
                                        key={item.Id}
                                        label={item?.category_name}
                                        value={cardApplication.products?.includes(item.Id)} // Assuming you have a property named "products" in your state
                                        color={COLORS.primaryOrangeHex}
                                        containerStyle={styles.viewStyles}
                                        onValueChange={(isChecked: boolean) => {
                                            // Check if the product ID is already in the array
                                            const isProductInArray = cardApplication.products?.includes(item.Id);

                                            // Create a new array based on the checkbox state
                                            let updatedProducts: any[];

                                            if (isChecked && !isProductInArray) {
                                                // Add the product ID to the array if the checkbox is checked and the ID is not present
                                                updatedProducts = [...(cardApplication.products || []), item.Id];
                                            } else if (!isChecked && isProductInArray) {
                                                // Remove the product ID from the array if the checkbox is unchecked and the ID is present
                                                updatedProducts = (cardApplication.products || []).filter((id: string) => id !== item.Id);
                                            } else {
                                                // No change needed if the checkbox state and array state are consistent
                                                updatedProducts = cardApplication.products;
                                            }

                                            // Update the state
                                            setCardApplication((prev: any) => {
                                                return { ...prev, products: updatedProducts };
                                            });
                                        }}
                                    />
                                );
                            })
                        }
                    </View>
                    <View>
                        {errors.products && <Text style={generalStyles.errorText}>{errors.products}</Text>}
                    </View>
                </View>
            </View>
            {/* products */}

            {/* usage days */}
            <View>
                <View style={styles.formContainer}>
                    <View>
                        <Text style={[generalStyles.formInputTextStyle, styles.labelStyles]}>
                            Select Usage Days*</Text>
                    </View>
                    <View>
                        {
                            weekDays.map((item: any) => {
                                return (
                                    <Checkbox
                                        key={item.Day}
                                        label={item?.Day}
                                        value={cardApplication.usageDays?.includes(item.Day)} // Assuming you have a cardApplication named "usageDays" in your state
                                        color={COLORS.primaryOrangeHex}
                                        containerStyle={styles.viewStyles}
                                        onValueChange={(isChecked: boolean) => {
                                            // Check if the day Day is already in the array
                                            const isDayInArray = cardApplication.usageDays?.includes(item.Day);

                                            // Create a new array based on the checkbox state
                                            let updatedDays: any[];

                                            if (isChecked && !isDayInArray) {
                                                // Add the day Day to the array if the checkbox is checked and the Day is not present
                                                updatedDays = [...(cardApplication.usageDays || []), item.Day];
                                            } else if (!isChecked && isDayInArray) {
                                                // Remove the day Day from the array if the checkbox is unchecked and the Day is present
                                                updatedDays = (cardApplication.usageDays || []).filter((Day: string) => Day !== item.Day);
                                            } else {
                                                // No change needed if the checkbox state and array state are consistent
                                                updatedDays = cardApplication.usageDays;
                                            }

                                            // Update the state
                                            setCardApplication((prev: any) => {
                                                return { ...prev, usageDays: updatedDays };
                                            });
                                        }}
                                    />
                                );
                            })
                        }
                    </View>
                    <View>
                        {errors.usageDays && <Text style={generalStyles.errorText}>{errors.usageDays}</Text>}
                    </View>
                </View>

            </View>
            {/* usage days */}



            <View>
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

                    <TouchableOpacity
                        activeOpacity={1}
                        style={[generalStyles.loginContainer,
                        styles.buttonStyles
                        ]}
                        onPress={goBack}
                    // disabled={count.some((item: any) => item.imagePath === null) || uploadingImages}
                    >
                        <Text style={generalStyles.loginText}>{'Back'}</Text>
                    </TouchableOpacity>

                </View>
                {/* button section */}
            </View>
        </View>
    )
}

export default Features

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
        fontFamily: FONTFAMILY.Lovato_Bold,
        fontSize: 15
    },
})