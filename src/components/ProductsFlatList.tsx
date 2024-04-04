import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { generalStyles } from '../screens/utils/generatStyles';
import { COLORS } from '../theme/theme';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/store/slices/CartSlice';
import { AppDispatch, RootState } from '../redux/store/dev';
import { showMessage } from 'react-native-flash-message';
import { formatCurrency } from '../screens/utils/helpers/helpers';
import { useNavigation } from '@react-navigation/native';



const ProductsFlatList = ({ station, category, products }: any) => {


    const dispatch = useDispatch<AppDispatch>();
    const { cartList } = useSelector((state: RootState) => state.cart)
    const totalPrice = cartList.reduce((acc: number, item: any) => acc + item.unit_price * item.quantity, 0);


    const checkIfItemExistsInCart = (productId: string) => {
        return cartList.some((product) => product.Id === productId);
    };

    const navigation = useNavigation<any>();


    const renderProductItem = ({ item }: any) => {


        return (
            <View style={styles.productContainer}>
                <Image source={{ uri: item?.image ? `${item.base_url}/${item.image}` : item?.image }} style={styles.productImage} />
                <Text style={[generalStyles.CardTitle]}>{item?.name}</Text>
                <Text style={[generalStyles.CardSubtitle]}> {formatCurrency(item?.unit_price)}</Text>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={[generalStyles.loginContainer, {
                            marginTop: 5,
                            width: "100%",
                            padding: 5,
                            backgroundColor: checkIfItemExistsInCart(item.Id) ? COLORS.primaryRedHex : COLORS.primaryOrangeHex,

                        }]}
                        onPress={() => {
                            showMessage({
                                message: checkIfItemExistsInCart(item?.Id) ? 'Item removed from cart' : 'Item added to cart',
                                type: "success",
                                icon: checkIfItemExistsInCart(item?.Id) ? "success" : "success",
                                autoHide: true,
                                duration: 3000,
                                // position: "bottom",
                            })
                            return checkIfItemExistsInCart(item?.Id) ? dispatch(removeFromCart(item)) : dispatch(addToCart(item))
                        }}
                    >
                        <Text style={[generalStyles.loginText, {
                            textAlign: "center",
                            fontSize: 12,

                        }]}>{
                                checkIfItemExistsInCart(item.Id) ? 'Remove ' : 'Add to cart'
                            }</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {
                cartList?.length > 0 && (
                    <View style={[generalStyles.absoluteStyles, { bottom: 20, right: 20, left: 20 }]}>
                        <TouchableOpacity
                            activeOpacity={1}
                            style={[generalStyles.loginContainer, {
                                // marginTop: 5,
                                width: "95%",
                                padding: 15,
                                // paddingHorizontal: 30,
                                marginHorizontal: 20,
                                backgroundColor: COLORS.primaryGreenHex,

                            }]}
                            onPress={() => navigation.navigate('CartItems')}
                        >
                            <Text style={[generalStyles.loginText, {
                                textAlign: "center",
                                fontSize: 12,

                            }]}>{`${cartList?.length} ITEMS`} | {formatCurrency(totalPrice)}</Text>
                        </TouchableOpacity>

                    </View>
                )
            }



            <FlatList
                data={products}
                renderItem={renderProductItem}
                keyExtractor={(item) => item.Id.toString()}
                numColumns={2}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 20
    },
    productContainer: {
        flex: 1,
        margin: 8,
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#ddd',
        padding: 16,
        borderRadius: 20
    },
    productImage: {
        width: 100,
        height: 100,
        marginBottom: 8,
        // backgroundColor: '#f0f0f0',
        backgroundColor: COLORS.primaryLightWhiteGrey,
    },
    quantityContainer: {
        flexDirection: 'row',
        marginTop: 8,
        alignItems: 'center',
    },
    quantityButton: {
        fontSize: 18,
        paddingHorizontal: 8,
        color: COLORS.primaryBlackHex,
        backgroundColor: COLORS.primaryOrangeHex,
        borderRadius: 5,
        // width: 30,
        // height: 30,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default ProductsFlatList;
