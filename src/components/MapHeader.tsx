import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useState } from 'react';
import { COLORS, SPACING } from '../theme/theme';
import { useNavigation } from '@react-navigation/native';
import SearchBar from './SearchBar';
import { generalStyles } from '../screens/utils/generatStyles';

const MapHeader = ({ stations, position }: any) => {
    const navigation = useNavigation<any>();
    const [searchText, setSearchText] = useState('');
    const [filteredStations, setFilteredStations] = useState(stations);

    const resetSearch = () => {
        setSearchText('');
        setFilteredStations(stations);
    };

    const handleSearch = (text: string) => {
        setSearchText(text);
        if (text === '') {
            // If search text is empty, reset filtered stations to default list
            setFilteredStations(stations);
        } else {
            // Otherwise, filter the stations based on the search text
            const filtered = stations?.filter((station: any) =>
                station.station_name?.toLowerCase().includes(text?.toLowerCase())
            );
            setFilteredStations(filtered);
        }
    };

    return (
        <View style={styles.headerContainer}>
            <SearchBar
                searchText={searchText}
                setSearchText={handleSearch}
                resetSearch={resetSearch}
            />
            {searchText.length > 0 && (
                <FlatList
                    style={styles.flatList}
                    data={filteredStations}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{
                        marginHorizontal: 10,
                        borderRadius: 10,
                    }}
                    renderItem={({ item }) => (
                        <View
                            style={{
                                paddingVertical: 10,
                                paddingHorizontal: SPACING.space_10,
                                borderColor:COLORS.primaryBlackHex,
                                // borderWidth: 0.5,
                                borderBottomWidth: 0.5,
                                backgroundColor: COLORS.primaryBlackHex,
                                // alignItems: 'center',
                            
                            }}
                        >
                            <Text
                                onPress={() =>
                                    navigation.navigate('StationDetails', {
                                        data: item,
                                        position,
                                    })
                                }
                                style={[generalStyles.CardTitle, {fontSize:22}]}
                            >
                                {item?.station_name}
                            </Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
};

export default MapHeader;

const styles = StyleSheet.create({
    headerContainer: {
        position: 'absolute',
        zIndex: 10,
        // padding: 5,
        width: '100%',
    },
    flatList: {
        maxHeight: 400, // Specify the maximum height for the FlatList
    },
});
