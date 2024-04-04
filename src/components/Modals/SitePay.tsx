import { StyleSheet, ScrollView, TouchableOpacity, View, TextInput, Text } from 'react-native'
import React, { useRef, useEffect } from 'react';
import RBSheet from "react-native-raw-bottom-sheet";
import { COLORS } from '../../theme/theme';
import { generalStyles } from '../../screens/utils/generatStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AmountScroller from '../AmountScroller';
import PaymentCard from '../PaymentCard';
import { showMessage } from 'react-native-flash-message';
import call from 'react-native-phone-call'


type Props = {
    openPicker: boolean;
    setOpenPicker: (openPicker: boolean) => void;
    station: any

};



const amounts = ["1000", "2000", "3000", "50000", "12000", "40000"];

const PaymentList = [
    {
        name: 'AIRTEL',
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3gatG0jIL1ybYTW5-1kCsT6iKKcMtiB_FJpKkxZotaA&s",
        text: "Pay with Airtel"
    },
    {
        name: 'MTN',
        image: "https://upload.wikimedia.org/wikipedia/commons/9/93/New-mtn-logo.jpg",
        text: "Pay with MTN"

    },

];


const SitePay: React.FC<Props> = ({ openPicker, setOpenPicker, station }: Props) => {

    const refRBSheet = useRef<any>();
    const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState<any>(null)

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

    return (
        <RBSheet
            ref={refRBSheet}
            height={600}
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
                <View style={[generalStyles.formContainer]}>
                    <View>
                        <Text style={generalStyles.formInputTextStyle}>
                            Pay Now
                        </Text>
                    </View>
                    <Text style={[generalStyles.textStyle]}>Please follow the prompts below to top up your card</Text>
                    <View>
                        <TextInput
                            style={styles.formInput}
                            placeholder={'enter amount'}
                            keyboardType="number-pad"
                            placeholderTextColor={COLORS.secondaryGreyHex}
                            onChangeText={text => setAmount(text)}
                            value={amount}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                    </View>

                    {/* amount scroller */}
                    <View>
                        <AmountScroller
                            amounts={amounts} amount={amount}
                            setAmount={setAmount}
                        />
                    </View>
                    {/* amount scroller */}

                    {/* payment methods */}
                    {
                        PaymentList.map((item: any, index: number) => {
                            return (
                                <PaymentCard key={index}
                                    data={item}
                                    // onPress={() => setSelectedPaymentMethod(item)}
                                    selectedPaymentMethod={selectedPaymentMethod}
                                    setSelectedPaymentMethod={setSelectedPaymentMethod}
                                />
                            );
                        })
                    }
                    {/* payment methods */}

                </View>

                <TouchableOpacity
                    style={[generalStyles.loginContainer, styles.buttonCardStyles]}
                    onPress={() => handlePayNow()}

                >
                    <Text style={[generalStyles.loginText, { color: COLORS.primaryBlackHex }]}>
                        {'Proceed'}
                    </Text>
                </TouchableOpacity>



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
        // marginHorizontal: 20,
        backgroundColor: COLORS.primaryGreenHex,
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
})