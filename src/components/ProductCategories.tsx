import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { generalStyles } from '../screens/utils/generatStyles'
import { COLORS } from '../theme/theme'
import { useNavigation } from '@react-navigation/native'
import { usePostQuery } from '../hooks/usePostQuery'

const ProductCategories = ({ station }: any) => {



    const { data, error, isLoading, refetch } = usePostQuery<any>({
        endpoint: '/api/Products/ProductCategories',
        params: {
            "account": "hasWalletAccount"
        },
        queryOptions: {
            enabled: true,
            refetchInterval: 20000,
            refetchOnWindowFocus: true,
            refetchOnMount: true,
        },
    })


    const navigation = useNavigation<any>();



    return (
        <View>
            <View>
                <Text style={[generalStyles.CardTitle]}>Product Categories</Text>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                horizontal
            >
                {
                    data?.data?.map((item: any) => (
                        <TouchableOpacity
                            activeOpacity={1}
                            key={item.Id}
                            style={[styles.touchableStyles]}
                            onPress={() => navigation.navigate('StabexProductList', { station, category: item })}
                        >
                            <Text style={[generalStyles.CardTitle, { color: COLORS.primaryBlackHex }]}>{item?.category_name}</Text>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        </View>

    )
}

export default ProductCategories

const styles = StyleSheet.create({
    touchableStyles: {
        marginHorizontal: 5,
        marginVertical: 5,
        width: 100,
        height: 50,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.primaryOrangeHex,
        color: COLORS.primaryBlackHex
    },
})