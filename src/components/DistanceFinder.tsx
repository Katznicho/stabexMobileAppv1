import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useApi } from '../hooks/useApi'

const DistanceFinder = ({ station }: any) => {

    const { data, error, isLoading, refetch } = useApi<any>({
        endpoint: `getDeliveryZoneWithCharges/${station.id}`,
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


    return (
        <View>
            <Text>DistanceFinder</Text>
        </View>
    )
}

export default DistanceFinder

const styles = StyleSheet.create({})