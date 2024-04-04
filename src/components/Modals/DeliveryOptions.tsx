import { StyleSheet, ScrollView, TouchableOpacity, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react';
import RBSheet from "react-native-raw-bottom-sheet";
import { COLORS } from '../../theme/theme';
import { generalStyles } from '../../screens/utils/generatStyles';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

type Props = {
    openPicker: boolean;
    setOpenPicker: (openPicker: boolean) => void;
    deliveryOptions: any[],
    selectedDeliveryOption: string,
    setSelectedDeliveryOption: (selectedDeliveryOption: string) => void,
    onFinish: (option_name: string) => void
};

const DeliveryOptions: React.FC<Props> = ({ openPicker, setOpenPicker, deliveryOptions, selectedDeliveryOption, setSelectedDeliveryOption, onFinish }: Props) => {

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
                            Select Delivery Option
                        </Text>
                    </View>

                </View>

                {
                    deliveryOptions?.map((option: any) => (
                        <TouchableOpacity
                            activeOpacity={1}
                            key={option.id}
                            style={[styles.circleStyles, {
                                backgroundColor: selectedDeliveryOption === option.name ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
                            }]}
                            onPress={() => {
                                setSelectedDeliveryOption(option.name)
                                onFinish(option.name)
                                return setOpenPicker(false)

                            }}
                        >
                            <Text style={[generalStyles.CardTitle, { color: COLORS.primaryBlackHex }]}>{option.name}</Text>
                        </TouchableOpacity>
                    ))
                }

            </ScrollView>
        </RBSheet>
    )
}

export default DeliveryOptions

const styles = StyleSheet.create({
    circleStyles: {
        marginHorizontal: 10,
        marginVertical: 10,
        // width: 50,
        height: 50,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
})