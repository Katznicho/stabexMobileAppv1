import { SafeAreaView, StyleSheet, View } from 'react-native'
import React from 'react'
import { generalStyles } from '../utils/generatStyles';
import PaymentFlatList from '../../components/PaymentFlatList';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../../theme/theme';
import EmptyContainer from '../../components/EmptyContainer';
import { usePostQuery } from '../../hooks/usePostQuery';
import { ActivityIndicator } from '../../components/ActivityIndicator';


const Completed = () => {

    const { data, error, isLoading, refetch } = usePostQuery<any>({
        endpoint: '/api/Statements/MyTransactions',
        queryOptions: {
            enabled: true,
            // refetchInterval: 20000,
            // refetchOnWindowFocus: true,
            // refetchOnMount: true,
        },
    })



    if (isLoading) {
        return <ActivityIndicator />
    }



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

export default Completed

const styles = StyleSheet.create({

    viewStyles: {
        marginHorizontal: 10,
        marginVertical: 10
    },
})

