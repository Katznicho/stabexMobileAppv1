import { StyleSheet, ScrollView, TouchableOpacity, View, TextInput, Text } from 'react-native'
import React, { useRef, useEffect, useState } from 'react';
import RBSheet from "react-native-raw-bottom-sheet";
import { COLORS, FONTFAMILY, FONTSIZE } from '../../theme/theme';
import { generalStyles } from '../../screens/utils/generatStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { showMessage } from 'react-native-flash-message';
import call from 'react-native-phone-call'
import { useNavigation } from '@react-navigation/native';
import SelectPaymentMethod from '../SelectPaymentMethod';
type Props = {
    openPicker: boolean;
    setOpenPicker: (openPicker: boolean) => void;
    station: any
};




const SitePay: React.FC<Props> = ({ openPicker, setOpenPicker, station }: Props) => {



    const refRBSheet = useRef<any>();
    const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState<any>(null);
    const navigation = useNavigation<any>();

    useEffect(() => {
        if (openPicker) {
            refRBSheet.current?.open();
        } else {
            refRBSheet.current?.close();
        }
    }, [openPicker]);

    const [amount, setAmount] = React.useState<string>('');
    const [loading, setLoading] = React.useState<boolean>(false)

    const handlePayNow = () => {

        if (amount === '') {
            showMessage({
                message: "Please enter amount",
                type: "danger",
            });
            return;
        }
        else if (selectedPaymentMethod === null) {
            showMessage({
                message: "Please select payment method",
                type: "danger",
            });
            return;
        }

        else {
            if (selectedPaymentMethod === "AIRTEL") {

                return call({
                    number: `*185*9*${station?.airtel_merchant_code ?? '1191184'}*${amount}*${station?.airtel_merchant_code ?? '1191184#'}`,
                    prompt: false,
                    skipCanOpen: true
                }).catch(console.error);

            }
            else {
                return call({
                    number: `*165*3*${station?.mtn_merchant_code ?? '319142'}*${amount}*1#`,
                    prompt: false,
                    skipCanOpen: true
                }).catch(console.error);

            }
        }

    }

    const [selectedPaymentOption, setSelectedPaymentOption] = useState<any>(null)

    return (
        <RBSheet
            ref={refRBSheet}
            height={600}
            closeOnPressMask={false}
            // openDuration={250}
            customStyles={{
                container: {
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
                {/* pay area */}
                <View style={{ marginTop: 30 }}>
                    {/* station details area */}
                    <View>
                        <Text style={[generalStyles.authTitle, { fontSize: 20, color: COLORS.primaryBlackRGBA }]}>
                            {`Station Details`}
                        </Text>
                        <View style={[generalStyles.formContainer, styles.stationCard]}>
                        <View>
                            <Text style={[generalStyles.CardPriceCurrency, styles.stationCardText, { fontSize: 15, color: COLORS.primaryBlackRGBA, fontFamily:FONTFAMILY.Lovato_Demi }]}>Station Name</Text>
                            <Text style={[generalStyles.CardTitle, styles.stationCardText, {fontSize:22}]}>{station?.station_name}</Text>
                        </View>
                        <View>
                            {/* button  area*/}
                            <View>

                                <TouchableOpacity
                                    activeOpacity={1}
                                    style={[generalStyles.loginContainer, styles.buttonStyles]}
                                    onPress={() => {
                                        setOpenPicker(false)
                                        return navigation.navigate("PayOnSite");

                                    }}
                                >
                                    <Text style={[generalStyles.loginText, { fontSize: FONTSIZE.size_14,  }, generalStyles.centerContent]}>{'Change'}</Text>
                                </TouchableOpacity>

                            </View>

                            {/* button  area*/}
                        </View>

                        </View>

                    </View>
                    {/* station details area */}
                    <View style={[generalStyles.formContainer]}>
                        <View>
                            <Text style={[generalStyles.formInputTextStyle, { fontSize: 22, color: COLORS.primaryBlackRGBA, fontFamily:FONTFAMILY.Lovato_Demi, marginHorizontal:10, marginVertical:10 }]}>
                                Pay Now
                            </Text>
                        </View>
                        <View>
                            <TextInput
                                style={styles.formInput}
                                placeholder={'  Enter Amount'}
                                keyboardType="number-pad"
                                placeholderTextColor={COLORS.secondaryGreyHex}
                                onChangeText={text => setAmount(text)}
                                value={amount}
                                underlineColorAndroid="transparent"
                                autoCapitalize="none"
                            />
                        </View>

                          {/* payment method */}
                                          {/* select payment method */}
                <SelectPaymentMethod
                    selectedPaymentOption={selectedPaymentOption}
                    setSelectedPaymentOption={setSelectedPaymentOption}

                />
                {/* select payment method */}
                          {/* payment method */}

                    </View>

                    <TouchableOpacity
                        style={[generalStyles.loginContainer, styles.buttonCardStyles]}
                        onPress={() => handlePayNow()}

                    >
                        <Text style={[generalStyles.loginText, { color: COLORS.primaryBlackHex, paddingBottom: 10 }]}>
                            {'Proceed'}
                        </Text>
                    </TouchableOpacity>

                </View>


                {/* pay area */}



            </ScrollView>


        </RBSheet>
    )
}

export default SitePay

const styles = StyleSheet.create({
    formInput: {
        color: COLORS.primaryWhiteHex,
        fontSize: 15,
        borderWidth: 0.4,
        borderColor: COLORS.primaryLightGreyHex,
        borderRadius: 10,
    },
    buttonCardStyles: {
        width: "80%",
        backgroundColor: COLORS.primaryGreenHex,
    },
    stationCard: {
        backgroundColor: COLORS.primaryBlackHex, elevation: 10, padding: 10, borderRadius: 10
    },
    stationCardText: {
        paddingVertical: 5,
        marginHorizontal:10
    },
    buttonStyles: {
        // width: 100,
        width: "100%",
        marginTop: 5,
        height: 40,
        // marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 10
    },

})