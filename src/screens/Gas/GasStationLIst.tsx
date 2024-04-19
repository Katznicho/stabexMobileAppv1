import { StyleSheet, View, Text, SafeAreaView, StatusBar, Platform } from 'react-native'
import React, { useState } from 'react'
import { generalStyles } from '../utils/generatStyles';
import StationsFlatList from '../../components/StationsFlatList';
import { COLORS, FONTSIZE } from '../../theme/theme';
import ArrowBack from '../../components/ArrowBack';
import SearchBar from '../../components/SearchBar';
import useGetUserLocation from '../../hooks/useGetUserLocation';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/dev';


const GasStationLIst = () => {

    const [searchText, setSearchText] = useState('');
    

    const resetSearch = () => {
        setSearchText('');
    };
    const { position } = useGetUserLocation()
    const {   station } = useSelector((state: RootState) => state.user);

    

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
                    <Text style={[generalStyles.CardSubtitle, styles.textColor, { fontSize: FONTSIZE.size_16 }]}>{station?.length} Results</Text>
                </View>
                <SearchBar
                    searchText={searchText}
                    setSearchText={setSearchText}
                    resetSearch={resetSearch}
                />
            </View>
            {
                station?.length && (
                    <StationsFlatList
                        stations={station}
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