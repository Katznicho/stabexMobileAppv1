import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { COLORS } from '../../theme/theme';
import Active from './Active';
import Past from './Past';
import MyOrders from './MyOrders';



const Tab = createMaterialTopTabNavigator();
const OrderTabs = () => {

    return (
        <Tab.Navigator
            initialRouteName="MyOrders"
            backBehavior="order"
            sceneContainerStyle={{
                backgroundColor: COLORS.primaryBlackHex,
                flex: 1,
            }}
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: COLORS.primaryBlackHex,
                    elevation: 0, // Remove shadow on Android
                    shadowOpacity: 0, // Remove shadow on iOS
                    borderBottomWidth: 0, // Remove the bottom border
                    borderTopWidth: 0,
                    borderColor: COLORS.primaryBlackHex,
                    // paddingHorizontal: 20,
                },
                tabBarAndroidRipple: { borderless: true },
                tabBarActiveTintColor: COLORS.primaryWhiteHex,
                tabBarInactiveTintColor: COLORS.primaryWhiteHex,

                tabBarIndicatorStyle: {
                    backgroundColor: COLORS.primaryOrangeHex,
                    height: 4,
                    marginHorizontal: 25,
                },
                tabBarPressColor: COLORS.primaryBlackHex,
                tabBarScrollEnabled: true,
                tabBarShowIcon: true,
                tabBarShowLabel: true,
            }}
        >

            <Tab.Screen
                name="Active"
                component={ MyOrders}
                options={{
                    tabBarLabel: 'Active Orders',
                    tabBarAccessibilityLabel: 'Active Orders',
                    //add some styling here
                }}
            />

            <Tab.Screen
                name="Past"
                component={MyOrders}
                options={{
                    tabBarLabel: 'Past Orders',
                    tabBarAccessibilityLabel: 'Past Orders',
                    //add some styling here
                }}
            />


        </Tab.Navigator>
    );
};

export default OrderTabs;
