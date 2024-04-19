import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator, Text, SafeAreaView, TouchableOpacity, RefreshControl } from 'react-native';
import { calculateDistance } from '../screens/utils/helpers/helpers';
import StationListCard from './StationListCard';
import { generalStyles } from '../screens/utils/generatStyles';
import EmptyContainer from './EmptyContainer';

const StationsFlatList = ({ stations, position, screen = "HomeStationDetails", searchText, resetSearch, setSearchText }: any) => {
    const [sortedStations, setSortedStations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);


    useEffect(() => {
        fetchData();
    }, [stations, position, searchText]); // Include searchText as a dependency

    const fetchData = async () => {
        try {
            setLoading(true);
            let sorted;
            if (searchText) {
                sorted = await sortStations(stations.filter((station: { station_name: string }) =>
                    station?.station_name?.toLowerCase()?.includes(searchText.toLowerCase())), position);
            } else {
                sorted = await sortStations(stations, position);
            }
            setSortedStations(sorted);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const sortStations = async (stationsToSort: any[], userPosition: any) => {
        const sorted = await Promise.all(
            stationsToSort.map(async (station) => {
                const distance = 
                      calculateDistance(
                        userPosition?.latitude,
                        userPosition?.longitude,
                        parseFloat(station?.latitude),
                        parseFloat(station?.longitude)
                    )
                    // Set distance to infinity if lat or lon is null
                return { ...station, distance };
            })
        );

        sorted.sort((a, b) => {
            return a.distance - b.distance;
        });

        return sorted;
    };

    const handleRefresh = () => {
        setRefreshing(true);
        fetchData();
    };

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (sortedStations.length === 0) {
        return (
            <SafeAreaView style={[generalStyles.ScreenContainer]}>
                <View style={[generalStyles.centerContent, generalStyles.viewStyles]} >
                    <EmptyContainer
                        title={'No stations found'}
                    />
                    <TouchableOpacity
                        style={[generalStyles.loginContainer, styles.buttonStyles]}
                        onPress={() => resetSearch()}
                    >
                        <Text style={generalStyles.loginText}>{'Refresh'}</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={sortedStations}
            renderItem={({ item })=>
            {
                return  (<StationListCard
                    data={item}
                    position={position}
                    screen={screen}
                />)
            }
        }
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                />
            }
            keyExtractor={(item) => item?.Id?.toString()}
        />
    );
}

export default StationsFlatList;

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonStyles: {
        width: 150,
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: 'lightblue', // Added for visibility, you can adjust the color
        paddingVertical: 10,
        alignItems: 'center',
    },
});