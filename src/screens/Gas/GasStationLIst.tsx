import { StyleSheet, View, Text, SafeAreaView, StatusBar, Platform } from 'react-native'
import React, { useState } from 'react'
import { ActivityIndicator } from '../../components/ActivityIndicator';
import { generalStyles } from '../utils/generatStyles';
import StationsFlatList from '../../components/StationsFlatList';
import { COLORS, FONTSIZE } from '../../theme/theme';
import ArrowBack from '../../components/ArrowBack';
import SearchBar from '../../components/SearchBar';
import { usePostQuery } from '../../hooks/usePostQuery';
import useGetUserLocation from '../../hooks/useGetUserLocation';


const GasStationLIst = () => {

    const [searchText, setSearchText] = useState('');
    

    const resetSearch = () => {
        setSearchText('');
    };
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


    if (error) {
        console.log("error", error)
    }



    if (isLoading) {
        return <View style={[{ flex: 1 }, generalStyles.ScreenContainer]}>
            <ActivityIndicator />

        </View>
    }

    return (
        <SafeAreaView style={[generalStyles.ScreenContainer]}>
            <View
                style={{
                    backgroundColor: COLORS.primaryOrangeHex,
                    height: Platform.OS == "ios" ? 40 : StatusBar.currentHeight
                }}
            >
                <StatusBar backgroundColor={COLORS.primaryOrangeHex} />
            </View>

            <View style={styles.containerStyle}>
                <View style={[generalStyles.absoluteStyles, { left: 10, top: 25 }]}>
                    <ArrowBack />
                </View>
                <View style={[generalStyles.flexStyles, { alignItems: "center", justifyContent: "center", }]}>

                    <Text style={[generalStyles.CardTitle, styles.textColor]}>Stations</Text>
                </View>
                <View style={[generalStyles.flexStyles, { alignItems: "center", justifyContent: "center" }]}>
                    <Text style={[generalStyles.CardSubtitle, styles.textColor, { fontSize: FONTSIZE.size_16 }]}>{data?.data?.length} Results</Text>
                </View>
                <SearchBar
                    searchText={searchText}
                    setSearchText={setSearchText}
                    resetSearch={resetSearch}
                />
            </View>
            {
                data?.data?.length && (
                    <StationsFlatList
                        stations={data?.data}
                        position={position}
                        screen="StationGasDetails"
                        searchText={searchText}
                        setSearchText={setSearchText}
                        resetSearch={resetSearch}
                    />
                )
            }


        </SafeAreaView>
    )
}

export default GasStationLIst

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: COLORS.primaryOrangeHex,
        padding: 20
    },
    textColor: {
        color: COLORS.primaryBlackHex,
        fontSize: FONTSIZE.size_28
    },
})