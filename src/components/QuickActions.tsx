import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { generalStyles } from '../screens/utils/generatStyles';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';



const QuickActions: React.FC<any> = ({ onSelectTopUp }: any) => {

    const navigation = useNavigation<any>();

    return (
        <View style={[styles.overAllContainer]}>
            <View style={[generalStyles.centerContent, styles.quickStyles]}>
                <Text style={[styles.CardTitle]}>Quick Actions</Text>
            </View>

            <View style={[generalStyles.flexStyles, { alignItems: 'center', justifyContent: 'space-between' }]}>
                <TouchableOpacity style={[styles.CardContainer]}
                    activeOpacity={1}
                    onPress={onSelectTopUp}
                >
                    <View style={[{ alignItems: 'center', justifyContent: 'space-between' }]}>

                        <Entypo
                            name="mobile"
                            size={28}
                            color={COLORS.primaryGreenHex}
                            onPress={() => navigation.navigate("CardTopUP")}
                        />
                        <Text style={[styles.CardSubtitle, styles.textStyles]}>Top Up</Text>

                    </View>


                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={1}
                    style={[styles.CardContainer]}
                >
                    <View style={[{ alignItems: 'center', justifyContent: 'space-between' }]}>

                        <MaterialCommunityIcons
                            name="account-lock"
                            size={25}
                            color={COLORS.primaryGreenHex}
                        />
                        <Text style={[styles.CardSubtitle, styles.textStyles]}>Change Pin </Text>

                    </View>

                </TouchableOpacity>



                <TouchableOpacity
                    activeOpacity={1}
                    style={[styles.CardContainer]}
                >
                    <View style={[{ alignItems: 'center', justifyContent: 'space-between' }]}>

                        <MaterialCommunityIcons
                            name="link-off"
                            size={25}
                            color={COLORS.primaryRedHex}
                        />
                        <Text style={[styles.CardSubtitle, styles.textStyles]}>Delink Card </Text>

                    </View>

                </TouchableOpacity>

                <TouchableOpacity style={[styles.CardContainer]}
                    activeOpacity={1}
                >
                    <View style={[{ alignItems: 'center', justifyContent: 'space-between' }]}>

                        <Feather
                            name="settings"
                            size={25}
                            color={COLORS.primaryRedHex}
                        />
                        <Text style={[styles.CardSubtitle, styles.textStyles]}>Settings</Text>

                    </View>


                </TouchableOpacity>

            </View>



            {/* more options */}

            {/* more options */}
        </View>
    )
}

export default QuickActions

const styles = StyleSheet.create({
    CardTitle: {
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_16,
    },
    CardSubtitle: {
        fontFamily: FONTFAMILY.poppins_light,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_10,
        marginHorizontal: SPACING.space_10
    },
    CardPriceCurrency: {
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryOrangeHex,
        fontSize: FONTSIZE.size_18,
    },

    CardContainer: {
        backgroundColor: COLORS.primaryBlackHex,
        paddingVertical: 10,
        width: 80,
        height: 80,
    },
    overAllContainer: {
        elevation: 5,
        backgroundColor: COLORS.primaryBlackHex,
        borderRadius: 10,
        marginHorizontal: 10,
        paddingBottom: 5
    },
    quickStyles: {
        marginVertical: 10
    },
    textStyles: {
        marginVertical: 10
    }
})