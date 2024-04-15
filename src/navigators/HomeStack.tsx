import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import { generalStyles } from '../screens/utils/generatStyles';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import { RootState } from '../redux/store/dev';
import { useSelector } from 'react-redux';
import StationSiteList from '../screens/PayOnSite/StationSiteList';
import StationListDetails from '../screens/PayOnSite/StationListDetails';
import GasStationLIst from '../screens/Gas/GasStationLIst';



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
                 headerShown:false
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

        </Stack.Navigator>
    )
}

export default HomeStack

