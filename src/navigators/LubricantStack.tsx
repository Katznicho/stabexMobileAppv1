
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import MyOrders from '../screens/OrderScreen/MyOrders';
import { generalStyles } from '../screens/utils/generatStyles';
import { COLORS } from '../theme/theme';
import LubricantScreen from '../screens/LubricantScreens/LubricantScreen';
import ArrowBack from '../components/ArrowBack';


const Stack = createNativeStackNavigator();


const LubricantStack = () => {
    const navigation = useNavigation<any>();

    return (
        <Stack.Navigator initialRouteName="LubricantScreen">
            <Stack.Screen

                name="LubricantScreen"
                component={LubricantScreen}
                options={{
                    animation: 'slide_from_bottom',
                    title: 'Lubricants',
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

export default LubricantStack;
