import { } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../screens/ProfileScreens/Profile';
import { useNavigation } from '@react-navigation/native';
import PrivatePolicy from '../screens/ProfileScreens/PrivatePolicy';
import AboutUs from '../screens/ProfileScreens/AboutUs';
import { COLORS } from '../theme/theme';
import Entypo from 'react-native-vector-icons/Entypo';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SupportScreen from '../screens/ProfileScreens/SupportScreen';
import EditProfile from '../screens/ProfileScreens/EditProfile';
import { generalStyles } from '../screens/utils/generatStyles';
import AddAddress from '../screens/ProfileScreens/AddAddress';
import SavedAddresses from '../screens/ProfileScreens/SavedAddresses';




const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  const navigation = useNavigation<any>();

  return (
    <Stack.Navigator initialRouteName="ProfileScreen">
      <Stack.Screen

        name="ProfileScreen"
        component={Profile}
        options={{
          title: 'Settings',
          headerStyle: generalStyles.headerStyle,
          headerTitleStyle: generalStyles.titleHeaderStyles,
          headerTintColor: COLORS.primaryBlackHex,
          headerTitleAlign: 'center',

        }}
      />
      <Stack.Screen
        name="PrivatePolicy"
        component={PrivatePolicy}
        options={{
          title: 'Private Policy',
          headerStyle: generalStyles.headerStyle,
          headerTitleStyle: generalStyles.titleHeaderStyles,
          headerTintColor: COLORS.primaryBlackHex,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('ProfileScreen')}
              style={{ marginLeft: 10 }}
            >
              <Entypo
                name="chevron-left"
                color={COLORS.primaryBlackHex}
                size={28}
              />
            </TouchableOpacity>

          ),
        }}
      />
      <Stack.Screen
        name="AboutUs"
        component={AboutUs}
        options={{
          title: 'About Us',
          headerStyle: generalStyles.headerStyle,
          headerTitleStyle: generalStyles.titleHeaderStyles,
          headerTintColor: COLORS.primaryBlackHex,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('ProfileScreen')}
              style={{ marginLeft: 10 }}
            >
              <Entypo
                name="chevron-left"
                color={COLORS.primaryBlackHex}
                size={28}
              />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="Support"
        component={SupportScreen}
        options={{
          title: 'Support',
          headerStyle: generalStyles.headerStyle,
          headerTitleStyle: generalStyles.titleHeaderStyles,
          headerTintColor: COLORS.primaryBlackHex,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('ProfileScreen')}
              style={{ marginLeft: 10 }}
            >
              <Entypo
                name="chevron-left"
                color={COLORS.primaryBlackHex}
                size={28}
              />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          title: 'Account Settings',
          headerStyle: generalStyles.headerStyle,
          headerTitleStyle: generalStyles.titleHeaderStyles,
          headerTintColor: COLORS.primaryBlackHex,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('ProfileScreen')}
              style={{ marginLeft: 10 }}
            >
              <Entypo
                name="chevron-left"
                color={COLORS.primaryBlackHex}
                size={28}
              />
            </TouchableOpacity>
          ),
        }}
      />
      {/* saved address */}
      <Stack.Screen
        name="SavedAddresses"
        component={SavedAddresses}
        options={{
          title: 'Saved Addresses',
          headerStyle: generalStyles.headerStyle,
          headerTitleStyle: generalStyles.titleHeaderStyles,
          headerTintColor: COLORS.primaryBlackHex,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('ProfileScreen')}
              style={{ marginLeft: 10 }}
            >
              <Entypo
                name="chevron-left"
                color={COLORS.primaryBlackHex}
                size={28}
              />
            </TouchableOpacity>
          ),
        }}
      />
      {/* saved address */}

      {/* add address */}
      <Stack.Screen
        name="AddAddress"
        component={AddAddress}
        options={{
          title: 'Add Address',
          headerStyle: generalStyles.headerStyle,
          headerTitleStyle: generalStyles.titleHeaderStyles,
          headerTintColor: COLORS.primaryBlackHex,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('ProfileScreen')}
              style={{ marginLeft: 10 }}
            >
              <Entypo
                name="chevron-left"
                color={COLORS.primaryBlackHex}
                size={28}
              />
            </TouchableOpacity>
          ),
        }}
      />
      {/* add address */}

    </Stack.Navigator>
  );
};

export default ProfileStack;
