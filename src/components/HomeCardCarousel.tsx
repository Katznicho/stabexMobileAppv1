import {  Text, View, Image, Alert, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY } from '../theme/theme'
import { generalStyles } from '../screens/utils/generatStyles';
import Carousel from 'react-native-reanimated-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store/dev';
import { logoutUser, showAuthScreen } from '../redux/store/slices/UserSlice';
import { useNavigation } from '@react-navigation/native';


const HomeCardCarousel = ({ cards , cardIndex, height , width, carouselHeight, IconComponent, iconName}: any) => {

    const dispatch = useDispatch<AppDispatch>();
    const { user,  isGuest } = useSelector((state: RootState) => state.user);

    const handleShowAlert = () => {
        try {
            Alert.alert(
                'Login',
                "You need to login first to see this screen",
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'OK',
                        onPress: () => {
                            dispatch(logoutUser());
                            return dispatch(showAuthScreen(true));
                        },
                    },
                ],
                { cancelable: false },
            );
        } catch (error) {
            console.error('Error handling alert:', error);
        }
    }
    const navigation = useNavigation<any>();

    return (
        <TouchableOpacity
         activeOpacity={1}
         onPress={() =>isGuest ? handleShowAlert() :cardIndex==6|| cardIndex==7 ? null : navigation.navigate(cards[cardIndex].route)}
        // onPress={() => isGuest ? handleShowAlert() : (cardIndex[cardIndex]?.isDisabled ? null : navigation.navigate(cards[cardIndex].route))}

        >
            <Carousel
                loop
                width={width}
                height={carouselHeight}
                autoPlay={cardIndex==6|| cardIndex==7 ? true : false}
                data={cards[cardIndex].arrayImages}
                scrollAnimationDuration={1000}
                style={{
                    borderRadius: 10,
                    opacity: 0.8,
                    backgroundColor: COLORS.primaryWhiteHex,
                    elevation: 5,
                }}

                renderItem={({ index }) => 
                 {
                     return     (
                        <Image
                            source={cards[cardIndex].arrayImages[index]}
                            style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: 10,
                                opacity: 0.65,
                                // backgroundColor: COLORS.primaryWhiteHex,
                            }}
                        />
                    )
                 }
            }
            />
            {/* absolute pos */}
            <View
                style={{
                    position: 'absolute',
                    bottom: 5,
                    left: 8,
                    padding: 5,
                    borderRadius: 10,
                    // backgroundColor: theme.colors.primary
                }}
            >
                <View
                    style={{
                        borderTopColor: COLORS.primaryOrangeHex,
                        borderTopWidth: 5,
                        borderStyle: 'solid',
                        // width: 82,
                        marginBottom: -5,
                    }}
                />
                <View style={[
                    generalStyles.flexStyles, {
                        marginVertical: 5,
                        // marginBottom: -8,
                        // marginLeft: -5
                    }
                ]}>
                    {/* Render the passed IconComponent */}
                   
                    <Text style={{
                        color: COLORS.primaryBlackHex,
                        fontFamily: FONTFAMILY.Lovato_Bold,
                        fontSize: 18,
                    }}>
                        {cards[cardIndex]?.name}
                    </Text>
                </View>

            </View>
            {/* absolute pos */}
        </TouchableOpacity>
    )
}

export default HomeCardCarousel

