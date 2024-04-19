import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator, Text, SafeAreaView, TouchableOpacity, RefreshControl } from 'react-native';
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
            setSortedStations(stations);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
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