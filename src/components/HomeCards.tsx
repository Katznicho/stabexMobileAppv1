import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native'
import { generalStyles } from '../screens/utils/generatStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';



const HomeCards: React.FC<any> = () => {

    const navigation = useNavigation<any>();
    return (
        <View>
            <View style={[generalStyles.viewStyles, generalStyles.flexStyles, styles.overAllContainer, { alignItems: 'center', justifyContent: 'space-between' }]}>
                <TouchableOpacity style={[styles.CardContainer, styles.additionCardContainerStyles]}
                    activeOpacity={1}
                    onPress={() => navigation.navigate('Stations')}

                >
                    <View style={[generalStyles.flexStyles, { alignItems: 'center', justifyContent: 'space-between' }]}>
                        <AntDesign
                            name="find"
                            size={30}
                            color={COLORS.primaryOrangeHex}
                        // onPress={() => navigation.navigate('Stations')}
                        />
                        <Text style={[styles.CardSubtitle]}>Station Discovery</Text>

                    </View>


                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={1}
                    style={[styles.CardContainer]}
                    onPress={() => navigation.navigate('Card')}
                >
                    <View style={[generalStyles.flexStyles, { alignItems: 'center', justifyContent: 'space-between' }]}>
                        <AntDesign
                            name="creditcard"
                            size={30}
                            color={COLORS.primaryOrangeHex}
                        />
                        <Text style={[styles.CardSubtitle]}>Stabex Card </Text>

                    </View>

                </TouchableOpacity>

            </View>

            <View style={[generalStyles.viewStyles, generalStyles.flexStyles, styles.overAllContainer, { alignItems: 'center', justifyContent: 'space-between' }]}>
                <TouchableOpacity style={[styles.CardContainer, styles.additionCardContainerStyles]}
                    activeOpacity={1}
                    onPress={() => navigation.navigate('PayOnSite')}
                >
                    <View style={[generalStyles.flexStyles, { alignItems: 'center', justifyContent: 'space-between' }]}>
                        <MaterialIcons
                            name="payments"
                            size={30}
                            color={COLORS.primaryOrangeHex}
                        />
                        <Text style={[styles.CardSubtitle]}>Pay On Site</Text>

                    </View>


                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={1}
                    style={[styles.CardContainer]}
                    onPress={() => navigation.navigate('Gas')}
                >
                    <View style={[generalStyles.flexStyles, { alignItems: 'center', justifyContent: 'space-between' }]}>
                        <MaterialCommunityIcons
                            name="gas-cylinder"
                            size={30}
                            color={COLORS.primaryOrangeHex}
                            onPress={() => navigation.navigate('ProductStations')}
                        />
                        <Text style={[styles.CardSubtitle]}>Stabex Products </Text>

                    </View>

                </TouchableOpacity>

            </View>

            {/* last section */}
            <View style={[generalStyles.viewStyles, generalStyles.flexStyles, styles.overAllContainer, { alignItems: 'center', justifyContent: 'space-between' }]}>
                <TouchableOpacity style={[styles.CardContainer, styles.additionCardContainerStyles]}
                    activeOpacity={1}
                    onPress={() => navigation.navigate('LubricantStack')}
                >
                    <View style={[generalStyles.flexStyles, { alignItems: 'center', justifyContent: 'space-between' }]}>
                        <MaterialCommunityIcons
                            name="tools"
                            size={30}
                            color={COLORS.primaryOrangeHex}
                            onPress={() => navigation.navigate('LubricantStack')}
                        />
                        <Text style={[styles.CardSubtitle]}>Lubricants</Text>

                    </View>


                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={1}
                    style={[styles.CardContainer]}
                    onPress={() => navigation.navigate('ServiceBayStack')}
                >
                    <View style={[generalStyles.flexStyles, { alignItems: 'center', justifyContent: 'space-between' }]}>
                        <MaterialIcons
                            name="miscellaneous-services"
                            size={25}
                            color={COLORS.primaryOrangeHex}
                            onPress={() => navigation.navigate('ServiceBayStack')}
                        />
                        <Text style={[styles.CardSubtitle]}>Service Bay</Text>

                    </View>

                </TouchableOpacity>

            </View>
            {/* last section */}
        </View>
    )
}

export default HomeCards

const styles = StyleSheet.create({
    CardTitle: {
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_16,
    },
    CardSubtitle: {
        fontFamily: FONTFAMILY.poppins_light,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_14,
        marginHorizontal: SPACING.space_10
    },
    CardPriceCurrency: {
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryOrangeHex,
        fontSize: FONTSIZE.size_18,
    },

    CardContainer: {
        // backgroundColor: COLORS.primaryBlackHex,
        paddingHorizontal: SPACING.space_28,
        paddingVertical: SPACING.space_15,
        // borderRadius: SPACING.space_8,
        width: 150
    },
    overAllContainer: {
        backgroundColor: Platform.OS === 'android' ? COLORS.primaryBlackHex : COLORS.primaryLightWhiteGrey,
        borderRadius: SPACING.space_8,
        padding: SPACING.space_10,
        elevation: 10
    },
    additionCardContainerStyles: {
        borderRightWidth: 0.5,
        borderRightColor: COLORS.primaryLightGreyHex
    }
})