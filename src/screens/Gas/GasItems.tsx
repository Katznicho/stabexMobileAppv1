import { SafeAreaView, View } from 'react-native'
import React from 'react'
import { generalStyles } from '../utils/generatStyles'
import ProductsFlatList from '../../components/ProductsFlatList'
import { useRoute } from '@react-navigation/native'
import EmptyContainer from '../../components/EmptyContainer'
import { usePostQuery } from '../../hooks/usePostQuery'
import { ActivityIndicator } from '../../components/ActivityIndicator'

const GasItems = () => {
    const { station, category } = useRoute<any>().params;



    const { data, error, isLoading, refetch } = usePostQuery<any>({
        endpoint: '/api/Products/ProductsList',
        params: {
            "station_id": station?.Id,
            "category_id": category?.Id
        },
        queryOptions: {
            enabled: true,
            // refetchInterval: 20000,
            // refetchOnWindowFocus: true,
            // refetchOnMount: true,
        },
    })


    if (error) {
        console.log("error", error)
    }


    if (isLoading) {
        return (
            <View style={[{ flex: 1 }, generalStyles.ScreenContainer]}>
                <ActivityIndicator />
            </View>
        )
    }


    return (
        <SafeAreaView style={[generalStyles.ScreenContainer]}>
            {data?.data?.length > 0 ? (
                <ProductsFlatList
                    station={station}
                    category={category}
                    products={data?.data}
                />


            ) : (
                <View style={[generalStyles.centerContent, generalStyles.viewStyles]}>
                    <EmptyContainer
                        title={`${station?.station_name} station has no ${category?.category_name} currently available`}
                    />
                </View>
            )}
        </SafeAreaView>
    )
}

export default GasItems
