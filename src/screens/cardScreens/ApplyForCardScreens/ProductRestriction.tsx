import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { generalStyles } from '../../utils/generatStyles'
import { COLORS, FONTFAMILY } from '../../../theme/theme'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { Checkbox, Picker } from 'react-native-ui-lib';
import Entypo from "react-native-vector-icons/Entypo";

const ProductRestriction = ({ cardApplication, setCardApplication, goToNextStep, errors, setErrors, goBack, regions, stations, onApplyForCard }: any) => {
    const tabBarHeight = useBottomTabBarHeight();

    return (
        <View style={{ flex: 1, paddingBottom: tabBarHeight }}>

            {/* regions */}
            <View>
                <View style={styles.formContainer}>
                    <View>
                        <Text style={[generalStyles.formInputTextStyle, styles.labelStyles]}>
                            Select Regions*</Text>
                    </View>
                    <View>
                        {
                            regions.map((item: any) => {
                                return (
                                    <Checkbox
                                        key={item.id}
                                        label={item.name}
                                        value={cardApplication.regions?.includes(item.id)} // Assuming you have a cardApplication named "regions" in your state
                                        color={COLORS.primaryOrangeHex}
                                        containerStyle={styles.viewStyles}
                                        onValueChange={(isChecked: boolean) => {
                                            // Check if the region ID is already in the array
                                            const isRegionInArray = cardApplication.regions?.includes(item.id);

                                            // Create a new array based on the checkbox state
                                            let updatedRegions: any[];

                                            if (isChecked && !isRegionInArray) {
                                                // Add the region ID to the array if the checkbox is checked and the ID is not present
                                                updatedRegions = [...(cardApplication.regions || []), item.id];
                                            } else if (!isChecked && isRegionInArray) {
                                                // Remove the region ID from the array if the checkbox is unchecked and the ID is present
                                                updatedRegions = (cardApplication.regions || []).filter((id: string) => id !== item.id);
                                            } else {
                                                // No change needed if the checkbox state and array state are consistent
                                                updatedRegions = cardApplication.regions;
                                            }

                                            // Update the state
                                            setCardApplication((prev: any) => {
                                                return { ...prev, regions: updatedRegions };
                                            });
                                        }}
                                    />
                                );
                            })
                        }
                    </View>
                    <View>
                        {errors.regions && <Text style={generalStyles.errorText}>{errors.regions}</Text>}
                    </View>
                </View>

            </View>
            {/* regions */}

            {/* pick up station */}
            {
                stations.length > 0 && (
                    <View style={styles.formContainer}>
                        <View>
                            <Text style={[generalStyles.formInputTextStyle, styles.labelStyles]}>
                                Select Pick Up Station*</Text>
                        </View>
                        <Picker
                            placeholder="select pick up station"
                            placeholderTextColor={COLORS.primaryLightGreyHex}
                            value={cardApplication?.station_id}
                            style={[generalStyles.formInput, styles.borderStyles, styles.inlineTextInputStyles]}
                            enableModalBlur={false}
                            onChange={item => {
                                return setCardApplication((prev: any) => {
                                    return { ...prev, station_id: item }
                                })
                            }}
                            trailingAccessory={<View style={styles.iconStyles}>
                                <Entypo name="chevron-down" size={20} color={COLORS.primaryWhiteHex} />
                            </View>}
                            color={COLORS.primaryWhiteHex}
                            topBarProps={{ title: 'Stations' }}

                            showSearch
                            searchPlaceholder={'Search for a station'}
                            searchStyle={{ color: COLORS.primaryBlackHex, placeholderTextColor: COLORS.primaryLightGreyHex }}
                        // onSearchChange={value => console.warn('value', value)}
                        >
                            {stations.map((item: any) => (
                                <Picker.Item key={item.id}
                                    value={item.id}
                                    label={item.name}
                                />
                            ))}
                        </Picker>
                    </View>
                )
            }
            {/* pick up station */}

            <View>
                {/* button section */}
                <View>
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
                    <TouchableOpacity
                        activeOpacity={1}
                        style={[generalStyles.loginContainer,
                        styles.buttonStyles,
                            // { backgroundColor: isDisabled() ? COLORS.primaryLightGreyHex : COLORS.primaryOrangeHex }
                        ]}
                        onPress={onApplyForCard}
                    // disabled={isDisabled()}
                    // disabled={count.some((item: any) => item.imagePath === null) || uploadingImages}
                    >
                        <Text style={generalStyles.loginText}>{'Finish'}</Text>
                    </TouchableOpacity>

                </View>
                {/* button section */}
            </View>
        </View>
    )
}

export default ProductRestriction

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
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: 15
    },
    iconStyles: {
        position: 'absolute',
        right: 10
    },

})