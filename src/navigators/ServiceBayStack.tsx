
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import MyOrders from '../screens/OrderScreen/MyOrders';
import { generalStyles } from '../screens/utils/generatStyles';
import { COLORS } from '../theme/theme';
import ArrowBack from '../components/ArrowBack';
import ServiceBay from '../screens/ServiceBayScreens/ServiceBay';


const Stack = createNativeStackNavigator();


const ServiceBayStack = () => {
    const navigation = useNavigation<any>();

    return (
        <Stack.Navigator initialRouteName="ServiceBay">
            <Stack.Screen

                name="ServiceBay"
                component={ServiceBay}
                options={{
                    animation: 'slide_from_bottom',
                    title: 'Service Bay',
                    headerStyle: generalStyles.headerStyle,
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTintColor: COLORS.primaryBlackHex,
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <ArrowBack />
                    ),
                }}>

            </Stack.Screen>



        </Stack.Navigator>
    );
};

export default ServiceBayStack;
