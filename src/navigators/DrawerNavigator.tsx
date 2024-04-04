import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import { COLORS } from '../theme/theme';
import CustomIcon from '../components/CustomIcon';
import PaymentStack from './PaymentStack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DrawerContent from '../components/DrawerContent';
import SupportStack from './SupportStack';
import AboutUsStack from './AboutUsStack'
import StationStack from './StationStack';
import GasStack from './GasStack';
import LubricantStack from './LubricantStack';
import ServiceBayStack from './ServiceBayStack';


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {



  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        overlayColor: 'transparent',
        drawerStatusBarAnimation: 'slide',
        headerShown: false,
        drawerStyle: {
          backgroundColor: COLORS.primaryLightWhiteGrey,
          borderTopColor: COLORS.primaryBlackHex,
          borderTopWidth: 0,
          width: 250


        },
        drawerLabelStyle: {
          fontSize: 18,
          fontWeight: 'bold',
          color: COLORS.primaryWhiteHex,
        },
        drawerItemStyle: {
          marginVertical: 10,
          marginHorizontal: 20,
          borderRadius: 20,
        },
        drawerActiveBackgroundColor: COLORS.primaryOrangeHex,
        drawerActiveTintColor: COLORS.primaryWhiteHex,
        drawerInactiveBackgroundColor: COLORS.primaryBlackHex,
        drawerInactiveTintColor: COLORS.primaryWhiteHex,
      }}

      drawerContent={props => <DrawerContent {...props} />}

    >
      <Drawer.Screen name="Home"
        component={TabNavigator}

        options={{
          drawerIcon: ({ focused, color, size }) => (
            <CustomIcon
              name="home"
              size={25}
              color={COLORS.primaryWhiteHex}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Payments"
        component={PaymentStack}
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <AntDesign
              name="creditcard"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Support"
        component={SupportStack}
      />

      <Drawer.Screen
        name="AboutUs"
        component={AboutUsStack}
      />

      <Drawer.Screen
        name="Stations"
        component={StationStack}
      />

      <Drawer.Screen
        name="Gas"
        component={GasStack}
      />

      <Drawer.Screen
        name="LubricantStack"
        component={LubricantStack}
      />

      <Drawer.Screen
        name="ServiceBayStack"
        component={ServiceBayStack}
      />

    </Drawer.Navigator>
  )
}

export default DrawerNavigator

