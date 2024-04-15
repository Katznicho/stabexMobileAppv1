import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import { generalStyles } from '../utils/generatStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { formatCurrency } from '../utils/helpers/helpers';
import { COLORS } from '../../theme/theme';

const OrderDetails = () => {

    const { item } = useRoute<any>().params;

    console.log("======item============")
    console.log(item)
    console.log("=================")

    return (
        <KeyboardAwareScrollView
            style={[{ flex: 1, width: '100%' }, generalStyles.ScreenContainer]}
            keyboardShouldPersistTaps="always"
            contentContainerStyle={{ paddingBottom: 100 }}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ marginHorizontal: 10 }}
                keyboardShouldPersistTaps="always"
            >
                <View style={[generalStyles.bottomHairline, styles.hairLineStyles]} />
                                        {/* top */}
                                        <View
                            style={[generalStyles.flexStyles, {
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                borderBottomColor: "grey",
                                borderBottomWidth: 1

                            }]}
                        >
                            <View>
                                <Image
                                    source={require("../../assets/app_images/stabex_logo.jpg")}
                                    style={{
                                        height: 50,
                                        width: 50,
                                        borderRadius: 10
                                    }}
                                />
                            </View>
                            <View
                              style={{
                                  backgroundColor: item?.payment_status === "Paid" ? COLORS.primaryGreenHex : COLORS.primaryRedHex,
                                  padding: 5,
                                  borderRadius: 5
                              }}
                            >
                                <Text style={[generalStyles.CardSubtitle, {color:COLORS.primaryBlackHex}]} >{item?.payment_status}</Text>
                            </View>
                            <View>
                                <View>
                                    <Text style={[generalStyles.CardSubtitle, { fontWeight: "bold" }]} >#{item?.order_number}</Text>
                                    <Text style={[generalStyles.CardSubtitle]}>{new Date(item?.date_created).toISOString().slice(0, 10)}</Text>
                                </View>
                            </View>
                        </View>
                        {/* top */}

                        {/* middle */}
                        <View style={{
                            paddingVertical:5 
                        }}>
                            <View>
                                <View style={[generalStyles.flexStyles, { justifyContent: 'space-between', alignItems: 'center' }]}>
                                    <Text style={[generalStyles.CardPriceCurrency]}>Total Items :</Text>
                                    <Text style={[generalStyles.CardSubtitle, { fontWeight: "bold" }]}>{item?.orderItems?.length}</Text>
                                </View>
                                <View>
                                    {
                                        item?.orderItems?.map((item: any) => {
                                            return (
                                                <View key={item?.id} style={[generalStyles.flexStyles, { justifyContent: 'space-between', alignItems: 'center' }]}>
                                                    <Text style={[generalStyles.CardSubtitle]}>{item?.name}</Text>
                                                    {/* <Text style={[generalStyles.CardSubtitle]}>{item?.price}</Text> */}
                                                    <Text style={[generalStyles.CardSubtitle]}>X {item?.quantity} ({formatCurrency(parseInt(item?.price))})</Text>
                                                    {/* <Text style={[generalStyles.CardSubtitle]}>UGX {item?.total_price}</Text> */}
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                                <View>
                                    <View style={[generalStyles.flexStyles, { justifyContent: 'space-between', alignItems: 'center' }]}>
                                        <Text style={[generalStyles.CardPriceCurrency]}>Payment Mode</Text>
                                        <Text style={[generalStyles.CardSubtitle, { fontWeight: "bold" }]}>{item?.payment_mode}</Text>
                                    </View>
                                    <View style={[generalStyles.flexStyles, { justifyContent: 'space-between', alignItems: 'center' }]}>
                                        <Text style={[generalStyles.CardSubtitle]}>Purchase Cost:</Text>
                                        <Text style={[generalStyles.CardSubtitle]}>{formatCurrency(parseInt(item?.purchase_cost))}</Text>
                                    </View>
                                    <View style={[generalStyles.flexStyles, { justifyContent: 'space-between', alignItems: 'center' }]}>
                                        <Text style={[generalStyles.CardSubtitle]}>Delivery Cost:</Text>
                                        <Text style={[generalStyles.CardSubtitle]}>{formatCurrency(parseInt(item?.delivery_cost))}</Text>
                                    </View>
                                    <View style={[generalStyles.flexStyles, { justifyContent: 'space-between', alignItems: 'center' }]}>
                                        <Text style={[generalStyles.CardSubtitle, { fontWeight: "bold" }]}>Total Cost:</Text>
                                        <Text style={[generalStyles.CardSubtitle, { fontWeight: "bold" }]}>{formatCurrency(parseInt(item?.delivery_cost + item?.purchase_cost))}</Text>
                                    </View>
                                </View>
                            </View>
                            <View>

                            </View>
                        </View>

                        {/* middle */}

                        {/* bottom */}
                        {/* bottom */}



            </ScrollView>

        </KeyboardAwareScrollView>
    )
}

export default OrderDetails

const styles = StyleSheet.create({
    hairLineStyles: {
        width: "80%",
        marginVertical: 10
    },
})