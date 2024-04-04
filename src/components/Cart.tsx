import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../theme/theme';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/dev';

const Cart = () => {
    const navigation = useNavigation<any>()
    const { cartList } = useSelector((state: RootState) => state.cart)

    return (
        <TouchableOpacity
            activeOpacity={1}
            style={[{ marginLeft: 10 }]}
            onPress={() => navigation.navigate('CartItems')}
        >
            <AntDesign
                name="shoppingcart"
                color={COLORS.primaryBlackHex}
                size={30}
            />
            <View style={styles.viewStyles}>
                <Text style={styles.textStyles}>{cartList.length}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default Cart

const styles = StyleSheet.create({
    viewStyles: {
        position: 'absolute',
        top: -10,
        right: -5,
        zIndex: 1000,
        backgroundColor: COLORS.primaryRedHex,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 1,
        borderRadius: 10,
        width: 20,
        height: 20
    },
    textStyles: {
        color: COLORS.primaryBlackHex,
        fontSize: 12,
        fontWeight: "bold",
    }
})