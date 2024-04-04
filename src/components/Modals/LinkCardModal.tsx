import { StyleSheet, ScrollView, TouchableOpacity, View, Text, TextInput } from 'react-native'
import React, { useRef, useState, useEffect } from 'react';
import RBSheet from "react-native-raw-bottom-sheet";
import { COLORS, FONTSIZE } from '../../theme/theme';
import { generalStyles } from '../../screens/utils/generatStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
import { LINK_CARD } from '../../screens/utils/constants/routes';
import { RootState } from '../../redux/store/dev';
import { useSelector } from 'react-redux';
import { ActivityIndicator } from '../ActivityIndicator';


type Props = {
    openPicker: boolean;
    setOpenPicker: (openPicker: boolean) => void;
};

const LinkCardModal: React.FC<Props> = ({ openPicker, setOpenPicker }: Props) => {

    useEffect(() => {
        if (openPicker) {
            refRBSheet.current?.open();
        } else {
            refRBSheet.current?.close();
        }
    }, [openPicker]);

    const refRBSheet = useRef<any>();

    const navigation = useNavigation<any>();

    const { authToken } = useSelector((state: RootState) => state.user);


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
                body.append('card_number', card.replace(/\s/g, ''))




                fetch(`${LINK_CARD}`, {
                    method: 'POST',
                    headers,
                    body,
                }).then((response) => response.json())
                    .then(async (result) => {


                        setLoading(false)
                        if (result?.response == "success") {

                            showMessage({
                                message: "Otp Sent",
                                description: "OTP has been sent to your phone number and email you registered with us",
                                type: "success",
                                icon: "success",
                                duration: 3000
                            })
                            setOpenPicker(false)
                            return navigation.navigate('VerifyCardOtp', { cardNumber: card })

                        }
                        else {
                            setLoading(false)
                            showMessage({
                                message: "Card Not Found",
                                type: "danger",
                                icon: "danger",
                                duration: 3000
                            })
                            return setOpenPicker(false)
                        }

                    }).catch((error) => {
                        setLoading(false)
                        showMessage({
                            message: "Card Not Found",
                            type: "danger",
                            icon: "danger",
                            duration: 3000
                        })
                        return setOpenPicker(false)
                    })


            }

        } catch (error) {
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
        <RBSheet
            ref={refRBSheet}
            height={230}
            closeOnDragDown={false}
            closeOnPressMask={false}
            // openDuration={250}
            customStyles={{
                container: {
                    // justifyContent: 'center',
                    // alignItems: 'center',
                    backgroundColor: COLORS.primaryBlackHex,
                    borderRadius: 10,
                    elevation: 10
                },

                wrapper: {
                    backgroundColor: 'transparent',
                },
                draggableIcon: {
                    backgroundColor: '#000',
                },

            }}
        >
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 20 }}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => setOpenPicker(false)}
                    style={[generalStyles.centerContent, { position: 'absolute', top: 10, right: 10 }]}
                >
                    <AntDesign
                        name="close"
                        size={25}
                        color={COLORS.primaryRedHex}
                        onPress={() => setOpenPicker(false)}
                    />

                </TouchableOpacity>
                <View>
                    <View style={[generalStyles.viewStyles]}>
                        <Text style={[generalStyles.CardTitle, { fontWeight: "bold", fontSize: FONTSIZE.size_20 }]}>
                            Link an existing card
                        </Text>
                    </View>
                </View>

                <View style={[generalStyles.formContainer]}>

                    <View>
                        <TextInput
                            style={generalStyles.formInput}
                            placeholder={'Enter card number'}
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
                    style={[generalStyles.loginContainer, { marginTop: 10, borderRadius: 10, width: "90%" }]}
                    onPress={() => onLinkCard()}>
                    <Text style={generalStyles.loginText}>{'Proceed'}</Text>
                </TouchableOpacity>

            </ScrollView>
        </RBSheet>
    )
}

export default LinkCardModal

const styles = StyleSheet.create({})