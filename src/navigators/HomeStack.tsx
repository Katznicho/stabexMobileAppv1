import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import { useNavigation } from '@react-navigation/native';
import HeaderBar from '../components/HeaderBar';
import { RootState } from '../redux/store/dev';
import { useSelector } from 'react-redux';
import StationSiteList from '../screens/PayOnSite/StationSiteList';
import StationListDetails from '../screens/PayOnSite/StationListDetails';
import PaymentSiteSummary from '../screens/PayOnSite/PaymentSiteSummary';
import { generalStyles } from '../screens/utils/generatStyles';
import ArrowBack from '../components/ArrowBack';
import { COLORS } from '../theme/theme';




const Stack = createNativeStackNavigator();

const HomeStack = () => {
    const navigation = useNavigation<any>();
    const { user, isGuest } = useSelector((state: RootState) => state.user);

    return (
        <Stack.Navigator initialRouteName="HomeScreen" >
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    animation: 'slide_from_bottom',
                    header: () => <HeaderBar
                        title={`${isGuest ? 'Guest' : user?.fullName}`}
                    />
                }}
            >

            </Stack.Screen>

            <Stack.Screen
                name="PayOnSite"
                component={StationSiteList}
                options={{
                    headerShown: false
                }}>

            </Stack.Screen>

            <Stack.Screen
                name="HomeStationDetails"
                component={StationListDetails}
                options={{
                    headerShown: false,
                    animation: 'slide_from_bottom',
                }}>
            </Stack.Screen>
            {/* pay on site summary */}
            <Stack.Screen
                name="PayOnSiteSummary"
                component={PaymentSiteSummary}
                options={{
                    animation: 'slide_from_bottom',
                    title: 'Payment Summary',
                    headerStyle: generalStyles.headerStyle,
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTintColor: COLORS.primaryBlackHex,
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <ArrowBack />
                    ),
                }}
                >
            </Stack.Screen>
            {/* pay on site summary */}


        </Stack.Navigator>
    )
}

export default HomeStack

