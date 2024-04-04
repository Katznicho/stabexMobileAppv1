import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS } from '../theme/theme';
import { BlurView } from '@react-native-community/blur';
import CustomIcon from '../components/CustomIcon';
import HomeStack from './HomeStack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import OrderStack from './OrderStack';
import CardStack from './CardStack';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ProfileStack from './ProfileStack';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/dev';
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { user, isGuest, authToken } = useSelector((state: RootState) => state.user);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: COLORS.primaryOrangeHex,
        tabBarInactiveTintColor: COLORS.primaryLightGreyHex,
        tabBarStyle: styles.tabBarStyle,
        tabBarLabelStyle: {
          fontSize: 12,
          paddingBottom: 5
        }

      }
      }
      >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color, size }) => (
            <CustomIcon
              name="home"
              size={25}
              color={
                focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
              }
            />
          ),
        }}></Tab.Screen>

      {
        !isGuest && (
          <Tab.Screen
            name="Orders"
            component={OrderStack}
            options={{
              title: "My Orders",
              tabBarIcon: ({ focused, color, size }) => (
                <Ionicons
                  name="reorder-four-outline"
                  size={26}
                  color={
                    focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
                  }
                />
              ),
            }}></Tab.Screen>
        )
      }


      {
        !isGuest && (
          <Tab.Screen
            name="Card"
            component={CardStack}
            options={{
              title: "My Cards",
              tabBarIcon: ({ focused, color, size }) => (
                <Entypo
                  name="credit-card"
                  size={25}
                  color={
                    focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
                  }
                />
              ),
            }}></Tab.Screen>
        )
      }


      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          title: "Profile",
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign
              name="user"
              size={25}
              color={
                focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
              }
            />
          ),
        }}></Tab.Screen>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 60,
    position: 'absolute',
    backgroundColor: COLORS.primaryLightWhiteGrey,
    borderTopWidth: 0,
    elevation: 10,
    borderTopColor: 'transparent',
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 20
  },

});


export default TabNavigator;
