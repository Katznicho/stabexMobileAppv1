import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../theme/theme'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { showMessage } from 'react-native-flash-message'
import { LINK_CARD } from '../utils/constants/routes'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { RootState } from '../../redux/store/dev'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { generalStyles } from '../utils/generatStyles'
import { ActivityIndicator } from '../../components/ActivityIndicator'

const LinkCard = () => {

    const tabBarHeight = useBottomTabBarHeight();
    const { user, isGuest, authToken } = useSelector((state: RootState) => state.user);

    const navigation = useNavigation<any>();
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [card, setCard] = useState<any>("");
    const [loading, setLoading] = useState<boolean>(false)

    const onLinkCard = () => {

        try {

            if (card == "") {
                // setIsVisible(true)
                return showMessage({
                    message: "Error",
                    description: "Please enter card serial number",
                    type: "danger",
                    icon: "danger",
                    duration: 3000,
                    autoHide: true,
                })
            }
            else {
                setLoading(true);
                const headers = new Headers();
                headers.append('Accept', 'application/json');
                headers.append('Authorization', `Bearer ${authToken}`);


                const body = new FormData();
                body.append('card_number', card);


                fetch(`${LINK_CARD}`, {
                    method: 'POST',
                    headers,
                    body,
                }).then((response) => response.json())
                    .then(async (result) => {

                        setIsVisible(true)
                        setLoading(false)
                        if (result?.response == "success") {

                            showMessage({
                                message: "Card Linked",
                                type: "success",
                                icon: "success",
                                duration: 3000
                            })
                            return navigation.goBack()

                        }
                        else {
                            setIsVisible(true)
                            setLoading(false)
                            return showMessage({
                                message: "Card Not Found",
                                type: "danger",
                                icon: "danger",
                                duration: 3000
                            })
                        }

                    }).catch((error) => {
                        setIsVisible(true)
                        setLoading(false)
                        return showMessage({
                            message: "Card Not Found",
                            type: "danger",
                            icon: "danger",
                            duration: 3000
                        })
                    })


            }

        } catch (error) {
            setIsVisible(true)
            setLoading(false)
            return showMessage({
                message: "Card Not Found",
                type: "danger",
                icon: "danger",
                duration: 3000
            })

        }

    }

    return (
        <KeyboardAwareScrollView
            style={[generalStyles.ScreenContainer]}
            keyboardShouldPersistTaps="always"
        >
            <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                <Text style={[{ fontSize: 20 }, generalStyles.textStyle]}>
                    Link Card?
                </Text>
            </View>
            
            <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                <Text style={[generalStyles.textStyle]}>
                    Enter your card serial number and it will be linked with the app
                </Text>
            </View>

            <View style={[generalStyles.formContainer]}>
                <View>
                    <Text style={generalStyles.formInputTextStyle}>
                        Card Serial Number
                    </Text>
                </View>
                <View>
                    <TextInput
                        style={generalStyles.formInput}
                        placeholder={'Enter card serial number'}
                        keyboardType='email-address'
                        placeholderTextColor={COLORS.secondaryGreyHex}
                        onChangeText={text => setCard(text)}
                        value={card}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                </View>

            </View>

            {loading && <ActivityIndicator />}

            <TouchableOpacity
                activeOpacity={1}
                style={generalStyles.loginContainer}
                onPress={() => onLinkCard()}>
                <Text style={generalStyles.loginText}>{'Proceed'}</Text>
            </TouchableOpacity>
        </KeyboardAwareScrollView>
    )
}

export default LinkCard

const styles = StyleSheet.create({

    buttonCardStyles: {
        width: "40%",
        marginHorizontal: 20,
        backgroundColor: COLORS.primaryBlackHex,
    },
    formInput: {
        color: COLORS.primaryWhiteHex,
        fontSize: 15,
        borderWidth: 0.4,
        borderColor: COLORS.primaryLightGreyHex,
        borderRadius: 10,
    },
})