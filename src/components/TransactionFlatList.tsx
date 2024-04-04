import { View, FlatList } from 'react-native'
import React from 'react'
import TransactionCard from './TransactionCard'
import { generalStyles } from '../screens/utils/generatStyles'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { ActivityIndicator } from './ActivityIndicator'
import { COLORS } from '../theme/theme'

const TransactionFlatList = ({ paymentData, loadMoreData, isFetching, card }: any) => {
    const tabBarHeight = useBottomTabBarHeight();

    if (paymentData == undefined || paymentData == null) {
        return <ActivityIndicator />
    }

    return (
        <FlatList
            data={paymentData}
            onEndReached={() => {
                loadMoreData()
            }}
            onEndReachedThreshold={0.5}
            // ListFooterComponent={isFetching && <ActivityIndicator />}
            // refreshControl={isFetching && <ActivityIndicator />}
            onRefresh={loadMoreData}
            refreshing={isFetching}
            contentContainerStyle={{ paddingBottom: tabBarHeight }}
            renderItem={({ item }) =>
                <View>
                    <TransactionCard
                        data={item}
                        cardDetails={card?.card}

                    />
                </View>}
            keyExtractor={(item) => item.id}
        />
    )
}

export default TransactionFlatList

