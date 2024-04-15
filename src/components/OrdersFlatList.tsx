import { Pressable, StyleSheet, Text, View, FlatList, Platform } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../theme/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { generalStyles } from '../screens/utils/generatStyles';
import { Image } from 'react-native-ui-lib';
import { formatCurrency, formatTime } from '../screens/utils/helpers/helpers';

const OrdersFlatList = ({ ordersData }: any) => {

    const navigation = useNavigation<any>();

    return (
        <FlatList
            data={ordersData}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => String(item?.Id)}
            renderItem={({ item, index }: any) => {
                console.log("===================")
                console.log(item)
                console.log("===================")

                return (
                    <Pressable style={styles.container}
                        key={index}

                        onPress={() =>
                            navigation.navigate('OrderDetails', {
                                item: item
                            }
                            )}
                    >
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
                                    source={require("../assets/app_images/stabex_logo.jpg")}
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

                    </Pressable>
                )
            }
            }
            // onEndReached={() => {
            //     loadMoreData()
            // }}
            onEndReachedThreshold={0.5}
            // ListFooterComponent={isFetching && <ActivityIndicator />}
            // refreshControl={isFetching && <ActivityIndicator />}
            // onRefresh={loadMoreData}
            // refreshing={isFetching}
            contentContainerStyle={{ paddingBottom: 50 }}



        />
    )
}

export default OrdersFlatList

const styles = StyleSheet.create({
    container: {
        backgroundColor: Platform.OS === 'ios' ? COLORS.primaryBlackHex : COLORS.primaryLightWhiteGrey,
        borderRadius: 10,
        padding: 10,
        elevation: 50,
        // margin: 5,
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignContent: 'center',
        // alignItems: 'center',
        margin: 5
    },
})