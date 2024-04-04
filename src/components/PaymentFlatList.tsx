import { View, } from 'react-native'
import React from 'react'
import { ActivityIndicator } from './ActivityIndicator'
import { FlatList } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import TransactionCard from './TransactionCard';
import { generalStyles } from '../screens/utils/generatStyles';

const PaymentFlatList = ({ paymentData, loadMoreData, isFetching }: any) => {

    const navigation = useNavigation<any>();

    if (paymentData == undefined || paymentData == null) {
        return <ActivityIndicator />
    }


    return (
        <FlatList
            data={paymentData}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => String(item?.id)}
            renderItem={({ item, index }: any) => (
                <View style={[generalStyles.viewStyles]}>
                    <TransactionCard
                        data={item}
                        cardDetails={paymentData.customer_card}

                    />
                </View>
            )}
            onEndReached={() => {
                loadMoreData()
            }}
            onEndReachedThreshold={0.5}
            // ListFooterComponent={isFetching && <ActivityIndicator />}
            // refreshControl={isFetching && <ActivityIndicator />}
            onRefresh={loadMoreData}
            refreshing={isFetching}
            contentContainerStyle={{ paddingBottom: 50 }}
        />
    )
}

export default PaymentFlatList

