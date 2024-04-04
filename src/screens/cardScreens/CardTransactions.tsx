import { SafeAreaView } from 'react-native'
import React from 'react'
import { generalStyles } from '../utils/generatStyles'
import TransactionFlatList from '../../components/TransactionFlatList'
import { useRoute } from '@react-navigation/native'
import useFetchInfinite from '../../hooks/useFetchInfinite'
import { USERPAYMENTS } from '../utils/constants/routes'

const CardTransactions = () => {

    const { card } = useRoute<any>().params

    //pull transactions
    //pull transatons
    const { isError, data, error, fetchNextPage, hasNextPage, isFetching } = useFetchInfinite("payments", USERPAYMENTS);


    //flat the data
    // const flattenedData = data?.pages.flatMap(page => page.results) || [];
    const paymentData = data?.pages.flatMap(page => page.data);

    const loadMoreData = () => {
        if (hasNextPage && !isFetching && data?.pages[0].total !== paymentData?.length) return fetchNextPage()
    };


    return (
        <SafeAreaView style={[generalStyles.ScreenContainer]}>
            <TransactionFlatList
                card={card}
                paymentData={paymentData}
                loadMoreData={loadMoreData}
                isFetching={isFetching}
            />
        </SafeAreaView>
    )
}

export default CardTransactions

