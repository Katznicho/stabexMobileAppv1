import { ScrollView, TouchableOpacity, Text, View, Image } from 'react-native'
import React, { useEffect, useRef } from 'react';
import RBSheet from "react-native-raw-bottom-sheet";
import { COLORS } from '../../theme/theme';
import { generalStyles } from '../../screens/utils/generatStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';

type Props = {
    openPicker: boolean;
    setOpenPicker: (openPicker: boolean) => void;
    paymentOptions: any[],
    onFinish: (option: any) => void,
    selectedPaymentOption: string,
    setSelectedPaymentOption: (selectedPaymentOption: string) => void

};

const PaymentMethodOptionsModal: React.FC<Props> = ({ openPicker, setOpenPicker, paymentOptions, onFinish, selectedPaymentOption, setSelectedPaymentOption }: Props) => {

    const refRBSheet = useRef<any>();

    useEffect(() => {
        if (openPicker) {
            refRBSheet.current?.open();
        } else {
            refRBSheet.current?.close();
        }
    }, [openPicker]);

    return (
        <RBSheet
            ref={refRBSheet}
            height={550}
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
                    style={[generalStyles.centerContent, { position: 'absolute', top: 10, right: 10, padding: 2 }]}
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
                            Select a Payment Method
                        </Text>
                    </View>
                </View>

                {
                    paymentOptions?.map((option: any) => (
                        <TouchableOpacity
                            activeOpacity={1}
                            key={option.id}

                            onPress={() => {
                                setSelectedPaymentOption(option)
                                return onFinish(option)
                            }}
                        >
                            <View style={[generalStyles.flexStyles, { alignItems: "center", borderWidth: 0.5, borderColor: COLORS.primaryBlackHex, borderRadius: 10, padding: 10, backgroundColor: COLORS.primaryBlackHex, elevation: 10 }, generalStyles.viewStyles]}>
                                <View>
                                    <Image
                                        source={{
                                            uri: option.image
                                        }}
                                        style={{ width: 60, height: 60, borderRadius: 10, backgroundColor: COLORS.primaryBlackHex }}
                                    />

                                </View>
                                <View style={{ marginHorizontal: 20 }}>
                                    <Text style={[generalStyles.CardTitle, { color: COLORS.primaryWhiteHex }]}>{option.name}</Text>
                                    <Text style={[generalStyles.CardSubtitle, { color: COLORS.primaryWhiteHex }]}>{`Pay With ${option?.payment_mode}`}</Text>

                                </View>

                            </View>


                        </TouchableOpacity>
                    ))
                }


            </ScrollView>

        </RBSheet>
    )
}

export default PaymentMethodOptionsModal

