import { View, SafeAreaView } from 'react-native'
import React from 'react'
import { generalStyles } from '../utils/generatStyles';
import EmptyContainer from '../../components/EmptyContainer';
import ServiceBayFlatList from '../../components/ServiceBayFlatList';
import { usePostQuery } from '../../hooks/usePostQuery';
import { ActivityIndicator } from '../../components/ActivityIndicator';

const ServiceBay = () => {


    const { data, error, isLoading, refetch } = usePostQuery<any>({
        endpoint: '/api/Products/ServiceBayList',
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
                data?.data?.length === 0 && (
                    <View style={[generalStyles.centerContent, generalStyles.viewStyles]} >
                        <EmptyContainer
                            title={'No service bays found'}
                        />
                        <View >

                        </View>

                    </View>
                )

            }
            {
                data?.data?.length > 0 && (
                    <ServiceBayFlatList
                        serviceBayData={data?.data}

                    />
                )
            }
        </SafeAreaView>
    )
}

export default ServiceBay

