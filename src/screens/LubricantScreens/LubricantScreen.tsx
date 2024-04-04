import { View, SafeAreaView } from 'react-native'
import React from 'react'
import { generalStyles } from '../utils/generatStyles';
import EmptyContainer from '../../components/EmptyContainer';
import LubricantFlatList from '../../components/LubricantFlatList';
import { usePostQuery } from '../../hooks/usePostQuery';
import { ActivityIndicator } from '../../components/ActivityIndicator';

const LubricantScreen = () => {

    const { data, error, isLoading, refetch } = usePostQuery<any>({
        endpoint: '/api/Products/LubricantsList',
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
                            title={'No lubricants found'}
                        />
                        <View >

                        </View>

                    </View>
                )

            }
            {
                data?.data?.length > 0 && (
                    <LubricantFlatList
                        lubricantData={data?.data}

                    />
                )
            }
        </SafeAreaView>
    )
}

export default LubricantScreen

