import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../theme/theme';
import { generalStyles } from '../screens/utils/generatStyles';
import StationFinder from '../screens/stations/StationFinder';
import ArrowBack from '../components/ArrowBack';
import StationDetails from '../screens/stations/StationDetails';
import StationFinderHeader from '../components/StationFinderHeader';

const Stack = createNativeStackNavigator();

const StationStack = () => {
    const navigation = useNavigation<any>();

    return (
        <Stack.Navigator initialRouteName="StationFinder">
            <Stack.Screen
                name="StationFinder"
                component={StationFinder}
                options={{
                    // title: 'Station Finder',
                    // headerStyle: [generalStyles.headerStyle],
                    // headerTitleStyle: generalStyles.titleHeaderStyles,
                    // headerTintColor: COLORS.primaryBlackHex,
                    // headerTitleAlign: 'center',
                    // headerLeft: () => (
                    //     <ArrowBack />
                    // ),
                    header: () => <StationFinderHeader
                    />
                }}
            />
            <Stack.Screen

                name="StationDetails"
                component={StationDetails}
                options={{
                    headerShown: false,

                }}
            />

        </Stack.Navigator>
    );
};

export default StationStack;
