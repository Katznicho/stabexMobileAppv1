import { View } from 'react-native'
import React from 'react'
import { generalStyles } from '../utils/generatStyles'
import { ActivityIndicator } from '../../components/ActivityIndicator'
import useGetUserLocation from '../../hooks/useGetUserLocation'
import { useApi } from '../../hooks/useApi'
import StationsFlatList from '../../components/StationsFlatList'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { usePostQuery } from '../../hooks/usePostQuery'

const StationSiteList = () => {


    const { position } = useGetUserLocation()
    const tabBarHeight = useBottomTabBarHeight();



    const { data, error, isLoading, refetch } = usePostQuery<any>({
        endpoint: '/Stations/StationsList',
        params: {
            "account": "hasWalletAccount"
        },
        queryOptions: {
            enabled: true,
            refetchInterval: 20000,
            refetchOnWindowFocus: true,
            refetchOnMount: true,
        },
    })



    if (error) {

    }

    if (isLoading || position === null) {
        return <View style={[{ flex: 1 }, generalStyles.ScreenContainer]}>
            <ActivityIndicator />

        </View>
    }

    return (
        <View style={[{ paddingBottom: tabBarHeight }, generalStyles.ScreenContainer]}>

            <StationsFlatList
                stations={data?.data}
                position={position}
            />

        </View>
    )
}

export default StationSiteList

