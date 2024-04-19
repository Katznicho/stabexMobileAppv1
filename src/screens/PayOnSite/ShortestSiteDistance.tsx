import {  StyleSheet, Text, View, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import useGetUserLocation from '../../hooks/useGetUserLocation'
import { usePostQuery } from '../../hooks/usePostQuery'
import { generalStyles } from '../utils/generatStyles'
import { calculateDistance } from '../utils/helpers/helpers'
import { ActivityIndicator } from '../../components/ActivityIndicator';
import { COLORS } from '../../theme/theme';

const ShortestSiteDistance = () => {
    const navigation = useNavigation<any>(); // Initialize navigation
    const { position } = useGetUserLocation()

    const { data, error, isLoading, refetch } = usePostQuery<any>({
        endpoint: '/api/Stations/StationsList',
        queryOptions: {
            enabled: true,
            refetchInterval: 20000,
            refetchOnWindowFocus: true,
            refetchOnMount: true,
        },
    })

    const [sortedStations, setSortedStations] = useState<any>([]); // State to store sorted stations

    useEffect(() => {
        const sortAndNavigate = async () => {
            if (data && position) {
                const sorted = await sortStations(data?.data, position);
                setSortedStations(sorted);
                // Navigate to distance details page
                if (sorted.length > 0) {
                    navigation.navigate('HomeStationDetails', { station: sorted[0] ,data:sorted[0] , position: position });
                }
            }
        };
        sortAndNavigate();
    }, [data, position]);

    if (isLoading) {
        return (
            <View style={[{ flex: 1 , backgroundColor:COLORS.primaryOrangeHex}]}>
                <ActivityIndicator />
            </View>
        );
    }

    const sortStations = async (stationsToSort: any[], userPosition: any) => {
        const sorted = await Promise.all(
            stationsToSort.map(async (station) => {
                const distance = calculateDistance(
                    userPosition?.latitude,
                    userPosition?.longitude,
                    parseFloat(station?.latitude),
                    parseFloat(station?.longitude)
                );
                return { ...station, distance };
            })
        );

        sorted.sort((a, b) => {
            return a.distance - b.distance;
        });

        return sorted;
    };

    return   <View style={[{ flex: 1 , backgroundColor:COLORS.primaryOrangeHex}]}>
    <ActivityIndicator />
</View>
}

export default ShortestSiteDistance

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
