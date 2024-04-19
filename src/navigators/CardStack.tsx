import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../theme/theme';
import { generalStyles } from '../screens/utils/generatStyles';
import Index from '../screens/cardScreens/Index';
import ApplyForCard from '../screens/cardScreens/ApplyForCard';
import CardScreen from '../screens/cardScreens/CardScreen';
import CardTransactions from '../screens/cardScreens/CardTransactions';
import ArrowBack from '../components/ArrowBack';
import LinkCard from '../screens/cardScreens/LinkCard';
import VerifyCardOtp from '../screens/cardScreens/VerifyCardOtp';
import ResendCardOtp from '../screens/cardScreens/ResendCardOtp';
import TopCardScreen from '../screens/cardScreens/TopCardScreen';




const Stack = createNativeStackNavigator();

const CardStack = () => {
    const navigation = useNavigation<any>();

    return (
        <Stack.Navigator initialRouteName="CardScreen">
            <Stack.Screen

                name="CardScreen"
                component={Index}
                options={{
                    animation: 'slide_from_bottom',
                    title: 'Stabex Card',
                    headerStyle: generalStyles.headerStyle,
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTintColor: COLORS.primaryBlackHex,
                    headerTitleAlign: 'center',
                }}
            />

            <Stack.Screen
                name="ApplyForCard"
                component={ApplyForCard}
                options={{
                    animation: 'slide_from_bottom',
                    title: 'Card Application',
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

            {/* link my card */}
            <Stack.Screen
                name="LinkCard"
                component={LinkCard}
                options={{
                    animation: 'slide_from_bottom',
                    title: 'Link Card',
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
            {/* link my card */}

            {/* linked card */}
            <Stack.Screen
                name="CardDetails"
                component={CardScreen}
                options={{
                    animation: 'slide_from_bottom',
                    headerShown: false,
                    headerLeft: () => (
                        <ArrowBack />
                    ),
                }}
            ></Stack.Screen>
            {/* linked card */}

            {/* card transactions */}
            <Stack.Screen
                name="CardTransactions"
                component={CardTransactions}
                options={{
                    animation: 'slide_from_bottom',
                    title: 'Card Transactions',
                    headerStyle: generalStyles.headerStyle,
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTintColor: COLORS.primaryBlackHex,
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <ArrowBack />
                    ),
                }}>

            </Stack.Screen>
            {/* card transactions */}



            {/* verification */}
            <Stack.Screen
                name="VerifyCardOtp"
                component={VerifyCardOtp}
                options={{
                    title: 'Verification',
                    headerStyle: {
                        backgroundColor: COLORS.primaryOrangeHex
                    },
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTitleAlign: 'center',
                    headerTintColor: COLORS.primaryBlackHex,
                }}
            />
            {/* verification */}

            {/* card top up */}
            <Stack.Screen
                name="CardTopUP"
                component={TopCardScreen}
                options={{
                    title: 'Top Up Card',
                    headerStyle: {
                        backgroundColor: COLORS.primaryOrangeHex
                    },
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTitleAlign: 'center',
                    headerTintColor: COLORS.primaryBlackHex,
                }}
            />
            {/* card top up */}

            {/* resend verification code */}
            <Stack.Screen
                name="ResendCardOtp"
                component={ResendCardOtp}
                options={{
                    title: 'Resend Verification Code',
                    headerStyle: {
                        backgroundColor: COLORS.primaryOrangeHex
                    },
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTitleAlign: 'center',
                    headerTintColor: COLORS.primaryBlackHex,
                }}
            />

            {/* resend verification code */}


        </Stack.Navigator>
    );
};

export default CardStack;
