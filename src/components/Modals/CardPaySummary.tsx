import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useRef } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RBSheet from "react-native-raw-bottom-sheet";
import { COLORS } from '../../theme/theme';
import { generalStyles } from '../../screens/utils/generatStyles';
import { useNavigation } from '@react-navigation/native';

type Props = {
    openPicker: boolean;
    setOpenPicker: (openPicker: boolean) => void;
    onMakePayment: () => void,
    amount: string,
    selectedPaymentOption: any,
    phoneNumber: string,
    otherPhoneNumber: string,
    useMyNumber: string
};


const CardPaySummary: React.FC<Props> = ({ openPicker, setOpenPicker, onMakePayment, amount, selectedPaymentOption, phoneNumber, otherPhoneNumber, useMyNumber }: Props) => {

    const refRBSheet = useRef<any>();

    useEffect(() => {
        if (openPicker) {
            refRBSheet.current?.open();
        } else {
            refRBSheet.current?.close();
        }
    }, [openPicker]);



    const navigation = useNavigation<any>()

    return (
        <RBSheet
            ref={refRBSheet}
            height={300}
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
                        <Text style={generalStyles.CardTitle}>
                            Payment Summary
                        </Text>
                    </View>

                </View>


                <View style={[generalStyles.bottomHairline, styles.hairLineStyles]} />

                <View style={{ marginHorizontal: 10 }}>
                    {/* summary details */}
                    <View style={[generalStyles.flexStyles, { justifyContent: 'space-between', alignItems: "center", marginHorizontal: 10 }]}>
                        <View>
                            <Text style={generalStyles.CardTitle} >Total Amount</Text>
                            <Text style={generalStyles.CardSubtitle}>UGX  {amount}</Text>
                        </View>
                        <View>
                            <Text style={generalStyles.CardTitle} >Payment Method</Text>
                            <Text style={generalStyles.CardSubtitle}>
                                {selectedPaymentOption?.name}
                            </Text>
                        </View>

                    </View>

                    <View style={{ marginHorizontal: 10 }}>
                        <View>
                            <Text style={generalStyles.CardTitle} >Phone Number</Text>
                            <Text style={generalStyles.CardSubtitle}>{
                                useMyNumber ? phoneNumber : otherPhoneNumber
                            }</Text>
                        </View>

                    </View>

                    {/* summary details */}

                    {/* payment button */}
                    <TouchableOpacity
                        style={[generalStyles.loginContainer, styles.buttonCardStyles]}
                        onPress={onMakePayment}
                    >
                        <Text style={[generalStyles.loginText, { color: COLORS.primaryBlackHex }]}>
                            {'Make Payment'}
                        </Text>
                    </TouchableOpacity>
                    {/* payment button */}


                </View>




            </ScrollView>

        </RBSheet >
    )
}

export default CardPaySummary

const styles = StyleSheet.create({
    hairLineStyles: {
        width: "90%",
        marginVertical: 10
    },
    buttonCardStyles: {
        width: "85%",
        backgroundColor: COLORS.primaryOrangeHex,
        marginTop: 10
    },
})