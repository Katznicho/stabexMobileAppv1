import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator, Text, SafeAreaView, TouchableOpacity, RefreshControl } from 'react-native';
import { generalStyles } from '../screens/utils/generatStyles';
import EmptyContainer from './EmptyContainer';
import StationListCard from './StationListCard';

const StationsFlatList = ({ stations, position, screen = "HomeStationDetails", searchText, resetSearch, setSearchText }: any) => {
    const [filteredStations, setFilteredStations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        filterStations();
    }, [stations, searchText]); // Include searchText as a dependency

    const filterStations = () => {
        setLoading(true);
        const filtered = stations?.filter((station: { station_name: string }) =>
            station?.station_name?.toLowerCase().includes(searchText?.toLowerCase())
        );
        setFilteredStations(filtered);
        setLoading(false);
        setRefreshing(false);
    };

    const handleRefresh = () => {
        setRefreshing(true);
        filterStations();
    };

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (filteredStations.length === 0) {
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
            data={filteredStations}
            renderItem={({ item, index }) => <StationListCard
                key={index}
                data={item}
                position={position}
                screen={screen}
            />}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                />
            }
            keyExtractor={(item) => item?.station_id?.toString()}
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
