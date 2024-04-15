import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import StationCard from './StationCard';
import { calculateDistance } from '../screens/utils/helpers/helpers';

const StationsList: React.FC<any> = ({ stations, position }: any) => {
    const [sortedStations, setSortedStations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);


    useEffect(() => {
        fetchData();
    }, [stations, position]); // Include searchText as a dependency

    const fetchData = async () => {
        try {
            setLoading(true);
            let sorted;
            sorted = await sortStations(stations, position);
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

    return (
        <View style={styles.container}>
            <FlatList
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                horizontal={true}
                data={sortedStations}
                renderItem={({ item }) => <StationCard
                    data={item}
                    position={position}
                />}
                keyExtractor={(item) => item?.station_id?.toString()}
            />
        </View>
    );
};

export default StationsList;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        zIndex: 10,
        padding: 5,
        width: '100%',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
