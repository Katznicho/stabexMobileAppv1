import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, Alert } from 'react-native'
import { generalStyles } from '../screens/utils/generatStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store/dev';
import { logoutUser, showAuthScreen } from '../redux/store/slices/UserSlice';



const HomeCards: React.FC<any> = () => {

    const navigation = useNavigation<any>();
    const dispatch = useDispatch<AppDispatch>();
    const { user,  isGuest } = useSelector((state: RootState) => state.user);

    const handleShowAlert = () => {
        try {
            Alert.alert(
                'Login',
                "You need to login first to see this screen",
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'OK',
                        onPress: () => {
                            dispatch(logoutUser());
                            return dispatch(showAuthScreen(true));
                        },
                    },
                ],
                { cancelable: false },
            );
        } catch (error) {
            console.error('Error handling alert:', error);
        }
    }

    return (
        <View>
            <View style={[generalStyles.viewStyles, generalStyles.flexStyles, styles.overAllContainer, { alignItems: 'center', justifyContent: 'space-between' }]}>
                <TouchableOpacity style={[styles.CardContainer, styles.additionCardContainerStyles]}
                    activeOpacity={1}
                    onPress={() => isGuest ? handleShowAlert() : navigation.navigate('Stations')}

                >
                    <View style={[generalStyles.flexStyles, { alignItems: 'center', justifyContent: 'space-between' }]}>
                        <AntDesign
                            name="find"
                            size={30}
                            color={COLORS.primaryRedHex}
                        // onPress={() => navigation.navigate('Stations')}
                        />
                        <Text style={[styles.CardSubtitle]}>Station Discovery</Text>

                    </View>


                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={1}
                    style={[styles.CardContainer]}
                    onPress={() =>isGuest ? handleShowAlert() : navigation.navigate('Card')}
                >
                    <View style={[generalStyles.flexStyles, { alignItems: 'center', justifyContent: 'space-between' }]}>
                        <AntDesign
                            name="creditcard"
                            size={30}
                            color={COLORS.primaryRedHex}
                        />
                        <Text style={[styles.CardSubtitle]}>Stabex Card </Text>

                    </View>

                </TouchableOpacity>

            </View>

            <View style={[generalStyles.viewStyles, generalStyles.flexStyles, styles.overAllContainer, { alignItems: 'center', justifyContent: 'space-between' }]}>
                <TouchableOpacity style={[styles.CardContainer, styles.additionCardContainerStyles]}
                    activeOpacity={1}
                    onPress={() => isGuest ? handleShowAlert() : navigation.navigate('PayOnSite')}
                >
                    <View style={[generalStyles.flexStyles, { alignItems: 'center', justifyContent: 'space-between' }]}>
                        <MaterialIcons
                            name="payments"
                            size={30}
                            color={COLORS.primaryRedHex}
                            onPress={() => isGuest ? handleShowAlert() : navigation.navigate('PayOnSite')}
                        />
                        <Text style={[styles.CardSubtitle]}>Pay On Site</Text>

                    </View>


                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={1}
                    style={[styles.CardContainer]}
                    onPress={() => isGuest ? handleShowAlert() : navigation.navigate('Gas')}
                >
                    <View style={[generalStyles.flexStyles, { alignItems: 'center', justifyContent: 'space-between' }]}>
                        <MaterialCommunityIcons
                            name="gas-cylinder"
                            size={30}
                            color={COLORS.primaryRedHex}
                        />
                        <Text style={[styles.CardSubtitle]}>Stabex Gas </Text>

                    </View>

                </TouchableOpacity>

            </View>

            {/* last section */}
            <View style={[generalStyles.viewStyles, generalStyles.flexStyles, styles.overAllContainer, { alignItems: 'center', justifyContent: 'space-between' }]}>
                <TouchableOpacity style={[styles.CardContainer, styles.additionCardContainerStyles]}
                    activeOpacity={1}
                    onPress={() =>isGuest ? handleShowAlert() : navigation.navigate('LubricantStack')}
                >
                    <View style={[generalStyles.flexStyles, { alignItems: 'center', justifyContent: 'space-between' }]}>
                        <MaterialCommunityIcons
                            name="tools"
                            size={30}
                            color={COLORS.primaryRedHex}
                            onPress={() =>isGuest ? handleShowAlert() : navigation.navigate('LubricantStack')}
                        />
                        <Text style={[styles.CardSubtitle]}>Lubricants</Text>

                    </View>


                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={1}
                    style={[styles.CardContainer]}
                    onPress={() =>isGuest ? handleShowAlert() : navigation.navigate('ServiceBayStack')}
                >
                    <View style={[generalStyles.flexStyles, { alignItems: 'center', justifyContent: 'space-between' }]}>
                        <MaterialIcons
                            name="miscellaneous-services"
                            size={25}
                            color={COLORS.primaryOrangeHex}
                            onPress={() =>isGuest ? handleShowAlert() : navigation.navigate('ServiceBayStack')}
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
        fontFamily: FONTFAMILY.Lovato_Regular,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_16,
    },
    CardSubtitle: {
        fontFamily: FONTFAMILY.Lovato_Bold,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_14,
        marginHorizontal: SPACING.space_10
    },
    CardPriceCurrency: {
        fontFamily: FONTFAMILY.Lovato_Regular,
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
        padding: SPACING.space_18,
        elevation: 5
    },
    additionCardContainerStyles: {
        borderRightWidth: 2,
        borderRightColor: COLORS.primaryRedHex
    }
})