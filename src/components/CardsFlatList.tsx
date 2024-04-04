import { Pressable, StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from './ActivityIndicator';
import { COLORS } from '../theme/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { generalStyles } from '../screens/utils/generatStyles';

const CardsFlatList = ({ cardsData, loadMoreData, isFetching }: any) => {


    const navigation = useNavigation<any>();

    if (cardsData == undefined || cardsData == null) {
        return <ActivityIndicator />
    }

    return (
        <FlatList
            data={cardsData}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => String(item?.id)}
            renderItem={({ item, index }: any) => (
                <Pressable style={styles.container}
                    key={index}

                    onPress={() => 
                        navigation.navigate('CardDetails', {
                        card: item
                    }
                    )}
                >


                    <View
                        style={{
                            flexDirection: 'column',
                            flex: 1,
                            marginHorizontal: 10,
                            marginTop: 10,
                        }}
                    >
                        <Text style={[generalStyles.CardTitle]}>{item?.card.card_number}</Text>
                        <Text style={[generalStyles.CardSubtitle]}>{item?.customer?.name}</Text>
                        <Text style={[generalStyles.CardTitle]}>{'active'}</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'column',
                        }}
                    >
                        {/* amount details */}
                        <View>
                            <Text style={[generalStyles.CardSubtitle]}>UGX {item?.amount}</Text>
                        </View>
                        {/* amoun details */}
                    </View>
                    <Pressable>
                        {/* add chevron icon */}
                        <Ionicons
                            name="chevron-forward"
                            size={24}
                            color={COLORS.primaryWhiteHex}
                        />
                        {/* icon */}
                    </Pressable>
                </Pressable>
            )}
            onEndReached={() => {
                loadMoreData()
            }}
            onEndReachedThreshold={0.5}
            // ListFooterComponent={isFetching && <ActivityIndicator />}
            // refreshControl={isFetching && <ActivityIndicator />}
            onRefresh={loadMoreData}
            refreshing={isFetching}
            contentContainerStyle={{ paddingBottom: 50 }}



        />
    )
}

export default CardsFlatList

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.primaryBlackHex,
        borderRadius: 10,
        padding: 10,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 5,
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5
    },
})