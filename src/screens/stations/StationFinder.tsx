import { View, } from 'react-native'
import React from 'react'
import { generalStyles } from '../utils/generatStyles'
import Maps from '../../components/Maps';
import MapHeader from '../../components/MapHeader';
import StationsLIst from '../../components/StationsLIst';
import { ActivityIndicator } from '../../components/ActivityIndicator';
import useGetUserLocation from '../../hooks/useGetUserLocation';
import { usePostQuery } from '../../hooks/usePostQuery';


const StationFinder: React.FC<any> = () => {

    const { position } = useGetUserLocation()

    const { data, error, isLoading, refetch } = usePostQuery<any>({
        endpoint: '/api/Stations/StationsList',
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
        <View style={[{ flex: 1 }, generalStyles.ScreenContainer]}>
            <View>
                <MapHeader 
                                   stations={data?.data}
                                   position={position}
                />
            </View>

              <Maps
                stations={data?.data}
                position={position}
            />  
            <StationsLIst
                stations={data?.data}
                position={position}
            />

        </View>
    )
}

export default StationFinder

