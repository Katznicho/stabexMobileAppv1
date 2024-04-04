import { } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../theme/theme';
import { generalStyles } from '../screens/utils/generatStyles';
import ArrowBack from '../components/ArrowBack';
import Cart from '../components/Cart';
import GasItems from '../screens/Gas/GasItems';
import GasCartItem from '../screens/Gas/GasCartItem';
import GasStationLIst from '../screens/Gas/GasStationLIst';
import GasStationDetails from '../screens/Gas/GasStationDetails';
import PaymentMethod from '../screens/Gas/PaymentMethod';
import DeliveryLocation from '../screens/Gas/DeliveryLocation';
import ConfirmOrderScreen from '../screens/Gas/ConfirmOrderScreen';
import AddCustomerAddress from '../screens/Gas/AddCustomerAddress';




const Stack = createNativeStackNavigator();

const GasStack = () => {

    //GasStationLIst
    const navigation = useNavigation<any>();

    return (
        <Stack.Navigator initialRouteName="GasStationLIst">

            <Stack.Screen
                name="GasStationList"
                component={GasStationLIst}
                options={{
                    headerShown: false

                }}
            />
            <Stack.Screen
                name="StabexProductList"
                component={GasItems}
                options={{
                    title: 'Station Products',
                    headerStyle: generalStyles.headerStyle,
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTintColor: COLORS.primaryBlackHex,
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <ArrowBack />
                    ),
                    headerRight: () => (
                        <Cart />
                    ),
                }}
            />

            {/* add address */}
            <Stack.Screen
                name="AddAddress"
                component={AddCustomerAddress}
                options={{
                    title: 'Add Address',
                    headerStyle: generalStyles.headerStyle,
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTintColor: COLORS.primaryBlackHex,
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <ArrowBack />
                    ),

                }}
            />
            {/* add address */}

            {/* cart items */}
            <Stack.Screen
                name="CartItems"
                component={GasCartItem}
                options={{
                    title: 'Cart',
                    headerStyle: generalStyles.headerStyle,
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTintColor: COLORS.primaryBlackHex,
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <ArrowBack />
                    ),
                    headerRight: () => (
                        <Cart />
                    ),
                }}
            />
            {/* cart items */}
            <Stack.Screen
                name="StationGasDetails"
                component={GasStationDetails}
                options={{
                    headerShown: false,

                }}
            />

            {/* delivery location */}
            <Stack.Screen
                name="DeliveryLocation"
                component={DeliveryLocation}
                options={{
                    title: 'Delivery Location',
                    headerStyle: generalStyles.headerStyle,
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTintColor: COLORS.primaryBlackHex,
                    headerTitleAlign: 'center',
                    headerShown: false,
                    headerLeft: () => (
                        <ArrowBack />
                    ),
                    headerRight: () => (
                        <Cart />
                    ),
                }}
            />

            {/* delivery location */}

            {/* confirm order */}
            <Stack.Screen
                name="ConfirmOrder"
                component={ConfirmOrderScreen}
                options={{
                    title: 'Confirm Order',
                    headerStyle: generalStyles.headerStyle,
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTintColor: COLORS.primaryBlackHex,
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <ArrowBack />
                    ),
                    headerRight: () => (
                        <Cart />
                    ),
                }}
            />
            {/* confirm order */}

            {/* payment method */}
            <Stack.Screen
                name="PaymentMethod"
                component={PaymentMethod}
                options={{
                    title: 'Payment Method',
                    headerStyle: generalStyles.headerStyle,
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTintColor: COLORS.primaryBlackHex,
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <ArrowBack />
                    ),
                    headerRight: () => (
                        <Cart />
                    ),
                }}
            />
            {/* payment method */}

        </Stack.Navigator>
    );
};

export default GasStack;
