import { StyleSheet, Text, View, FlatList, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from './ActivityIndicator';
import { generalStyles } from '../screens/utils/generatStyles';
import { COLORS } from '../theme/theme';

const ServiceBayFlatList = ({ serviceBayData }: any) => {

    const navigation = useNavigation<any>();



    return (
        <FlatList
            data={serviceBayData}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => String(item?.id)}
            renderItem={({ item, index }: any) => (
                <View style={[styles.cardContainer]}>
                    <View>
                        <Image
                            source={{ uri: item?.image }}
                            style={{ width: "100%", height: 150, borderRadius: 10 }}
                        />
                    </View>
                    <View style={[generalStyles.centerContent]}>
                        <Text style={[generalStyles.CardTitle]}>{item?.name}</Text>
                    </View>
                    <View style={[generalStyles.centerContent, { marginHorizontal: 10 }]}>
                        <Text style={[generalStyles.CardSubtitle]}>{item?.description}</Text>
                    </View>
                </View>
            )}
            // onEndReached={() => {
            //     loadMoreData()
            // }}
            onEndReachedThreshold={0.5}
            // ListFooterComponent={isFetching && <ActivityIndicator />}
            // refreshControl={isFetching && <ActivityIndicator />}
            // onRefresh={loadMoreData}
            // refreshing={isFetching}
            contentContainerStyle={{ paddingBottom: 50 }}
        />
    )
}

export default ServiceBayFlatList

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: COLORS.primaryBlackHex,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginHorizontal: 10,
        marginVertical: 10,
        paddingBottom: 20
    }
})