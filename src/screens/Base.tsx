import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from '../navigators/DrawerNavigator';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/dev';
import AuthStack from '../navigators/AuthStack';

const Stack = createNativeStackNavigator();

const Base = () => {
    const { isLoggedIn, isGuest } = useSelector((state: RootState) => state.user);
    return (
        <NavigationContainer>
            {
                isGuest || isLoggedIn ? <DrawerNavigator /> : <AuthStack />

            }
        </NavigationContainer>
    )
}

export default Base

