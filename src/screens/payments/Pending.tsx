import { SafeAreaView, StyleSheet, View } from 'react-native'
import React from 'react'
import { PAYMENT_STATUS } from '../utils/constants/constants';
import useFetchInfinite from '../../hooks/useFetchInfinite';
import { USERPAYMENTS } from '../utils/constants/routes';
import { generalStyles } from '../utils/generatStyles';
import PaymentFlatList from '../../components/PaymentFlatList';
import EmptyContainer from '../../components/EmptyContainer';
import { usePostQuery } from '../../hooks/usePostQuery';



const Pending = () => {

    const { data, error, isLoading, refetch } = usePostQuery<any>({
        endpoint: '/api/Statements/MyTransactions',
        queryOptions: {
            enabled: true,
            // refetchInterval: 20000,
            // refetchOnWindowFocus: true,
            // refetchOnMount: true,
        },
    })




    return (
        <SafeAreaView style={[generalStyles.ScreenContainer]}>
            {
                data?.data?.length === 0 &&
                <View style={[generalStyles.centerContent, styles.viewStyles]} >
                    <EmptyContainer
                        title={'You dont have any completed payments'}
                    />


                </View>
            }

            <PaymentFlatList
                paymentData={data?.data}
            />

        </SafeAreaView >
    )
}

export default Pending

const styles = StyleSheet.create({

    viewStyles: {
        marginHorizontal: 10,
        marginVertical: 10
    },
})

