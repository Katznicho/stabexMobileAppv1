import { Pressable, StyleSheet, Text, View, FlatList, Platform } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../theme/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { generalStyles } from '../screens/utils/generatStyles';

const OrdersFlatList = ({ ordersData }: any) => {

    const navigation = useNavigation<any>();

    return (
        <FlatList
            data={ordersData}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => String(item?.id)}
            renderItem={({ item, index }: any) => {

                return (
                    <Pressable style={styles.container}
                        key={index}

                        onPress={() =>
                            navigation.navigate('OrderDetails', {
                                item: item
                            }
                            )}
                    >

                        <View
                            style={{
                                flexDirection: 'column',
                                flex: 1,
                                marginHorizontal: 10,
                                marginTop: 10,
                                padding: Platform.OS === 'ios' ? 10 : 0,
                                elevation: 5,
                            }}
                        >
                            <Text style={[generalStyles.CardTitle]}>{item?.ApplicationUser?.Company}</Text>
                            <Text style={[generalStyles.CardTitle]}>{item?.ApplicationUser?.FirstName} {item?.ApplicationUser?.LastName}</Text>
                            <Text style={[generalStyles.CardSubtitle]}>{item?.order_type}</Text>
                            <Text style={[generalStyles.CardSubtitle]}>{item?.address}</Text>
                            <Text style={[generalStyles.CardTitle]}>{item?.address_type}</Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'column',
                            }}
                        >
                            {/* amount details */}
                            <View>
                                <Text style={[generalStyles.CardSubtitle]}>UGX {parseInt(item?.delivery_cost + item?.purchase_cost)?.toLocaleString()}</Text>
                            </View>
                            {/* amoun details */}
                        </View>
                        <Pressable>
                            {/* add chevron icon */}
                            <Ionicons
                                name="chevron-forward"
                                size={24}
                                color={COLORS.primaryWhiteHex}
                            />
                            {/* icon */}
                        </Pressable>
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
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 50,
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5
    },
})