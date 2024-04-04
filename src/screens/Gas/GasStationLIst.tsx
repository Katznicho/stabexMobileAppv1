import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ActivityIndicator } from '../../components/ActivityIndicator';
import { generalStyles } from '../utils/generatStyles';
import StationsFlatList from '../../components/StationsFlatList';
import useGetUserLocation from '../../hooks/useGetUserLocation';
import { COLORS, FONTSIZE } from '../../theme/theme';
import ArrowBack from '../../components/ArrowBack';
import SearchBar from '../../components/SearchBar';
import { usePostQuery } from '../../hooks/usePostQuery';
import Entypo from 'react-native-vector-icons/Entypo';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/dev';
import { GET_STATIONS_LIST } from '../utils/constants/routes';

const GasStationLIst = () => {

    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(true);
    const { authToken, user } = useSelector((state: RootState) => state.user);

    const resetSearch = () => {
        setSearchText('');
    };
    // const { position } = useGetUserLocation()
    const [position, setPosition] = useState<any>({});


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
        <View style={[{ paddingBottom: 5 }, generalStyles.ScreenContainer]}>

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

        </View>
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