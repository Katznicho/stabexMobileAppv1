import { View, Image, Text } from 'react-native'
import React from 'react'
import { Dimensions } from 'react-native';
import { generalStyles } from '../screens/utils/generatStyles';
import { COLORS } from '../theme/theme';
import Carousel from 'react-native-reanimated-carousel';


const data = [
    require('../assets/app_images/cooking_gas.jpeg'),
    require('../assets/app_images/apply_for_card.jpeg'),
    require('../assets/app_images/spend_less.jpeg')
    // Add more celebrities here if needed
];




const HomeScroller = () => {
    const {width, height} = Dimensions.get('window').width;
    return (
        <View style={{ flex: 1 }}>
            <Carousel
                loop
                width={width}
                height={width/2.3}
                autoPlay={true}
                data={data}
                scrollAnimationDuration={1000}
                style={{
                    borderRadius: 10,
                    opacity: 0.8,
                    backgroundColor: COLORS.primaryWhiteHex,
                    elevation: 5,
                }}

                renderItem={({ index }) => (
                    <Image
                        source={index}
                        style={{
                            width: width ,
                            height: height,
                            borderRadius: 10,
                            opacity: 0.8,
                            backgroundColor: COLORS.primaryWhiteHex,
                        }}
                    />
                )}
            />
            <Carousel/>
        </View>
    )
}

export default HomeScroller

