import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import { generalStyles } from '../utils/generatStyles'
import { useNavigation } from '@react-navigation/native'
import EmptyContainer from '../../components/EmptyContainer'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../../theme/theme'
import OrdersFlatList from '../../components/OrdersFlatList'
import { usePostQuery } from '../../hooks/usePostQuery'
import { ActivityIndicator } from '../../components/ActivityIndicator'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

const MyOrders = () => {

    const { data, error, isLoading, refetch } = usePostQuery<any>({
        endpoint: '/api/Orders/MyOrders',
        queryOptions: {
            enabled: true,
            // refetchInterval: 20000,
            // refetchOnWindowFocus: true,
            // refetchOnMount: true,
        },
    })

    console.log("============================")
    console.log(data)
    console.log("============================")


    console.log("=======================")
    console.log(error)
    console.log("=======================")

    const navigation = useNavigation<any>();


    if (isLoading) {
        return <ActivityIndicator />
    }
    const tabBarHeight = useBottomTabBarHeight();


    return (
        <SafeAreaView style={[generalStyles.ScreenContainer, { paddingBottom: tabBarHeight }]}>
            {
                data?.data?.length === 0 && (
                    <View style={[generalStyles.centerContent, styles.viewStyles]} >
                        <EmptyContainer
                            title={'You dont have any orders currently'}
                        />
                        <View >

                            <TouchableOpacity
                                style={[generalStyles.loginContainer, styles.buttonStyles]}
                                activeOpacity={1}
                                onPress={() => navigation.navigate('Gas')}
                            >
                                <Text style={generalStyles.loginText}>{'Create Order'}</Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                )

            }

            {
                data?.data?.length > 0 && (
                    <OrdersFlatList
                        ordersData={data?.data}
                    />
                )
            }

        </SafeAreaView>
    )
}

export default MyOrders

const styles = StyleSheet.create({
    ScreenTitle: {
        fontSize: FONTSIZE.size_28,
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryBlackHex,
        paddingLeft: SPACING.space_30,
    },
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
    viewStyles: {
        marginHorizontal: 10,
        marginVertical: 10
    },
    buttonStyles: {
        width: 150,
        marginTop: 10,
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 10
    },
})