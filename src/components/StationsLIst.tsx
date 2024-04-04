import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import StationCard from './StationCard';

const StationsList: React.FC<any> = ({ stations, position }: any) => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStations = async () => {
            setLoading(true);
            // No sorting is done here, just set the stations directly
            setLoading(false);
        };

        fetchStations();
    }, [stations, position]);

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                horizontal={true}
                data={stations}
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
