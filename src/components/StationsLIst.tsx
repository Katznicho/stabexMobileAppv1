import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import StationCard from './StationCard';


const StationsList: React.FC<any> = ({ stations, position }: any) => {
    const [sortedStations, setSortedStations] = useState<any[]>([]);

    const [refreshing, setRefreshing] = useState(false);


    useEffect(() => {
        fetchData();
    }, [stations, position]); // Include searchText as a dependency

    const fetchData = async () => {
        try {
            setSortedStations(stations);
        } finally {
        }
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
