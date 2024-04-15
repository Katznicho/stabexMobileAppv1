import { View, } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import TransactionCard from './TransactionCard';
import { generalStyles } from '../screens/utils/generatStyles';

const PaymentFlatList = ({ paymentData, loadMoreData }: any) => {

    const navigation = useNavigation<any>();

    return (
        <FlatList
            data={paymentData}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => String(item?.Id)}
            renderItem={({ item, index }: any) => (
                <View style={[generalStyles.viewStyles]} key={index}>
                    <TransactionCard
                        data={item}
                    />
                </View>
            )}
            // onEndReached={() => {
            //     loadMoreData()
            // }}
            //onEndReachedThreshold={0.5}
            // ListFooterComponent={isFetching && <ActivityIndicator />}
            // refreshControl={isFetching && <ActivityIndicator />}
            // onRefresh={loadMoreData}
            // refreshing={isFetching}
            contentContainerStyle={{ paddingBottom: 50 }}
        />
    )
}

export default PaymentFlatList

