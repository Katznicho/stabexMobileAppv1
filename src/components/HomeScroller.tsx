import { View, Image, Text } from 'react-native'
import React from 'react'
import { Carousel } from 'react-native-ui-lib';
import { Dimensions } from 'react-native';
import { generalStyles } from '../screens/utils/generatStyles';
import { COLORS } from '../theme/theme';


const data = [
    require('../assets/app_images/cooking_gas.jpeg'),
    require('../assets/app_images/apply_for_card.jpeg'),
    require('../assets/app_images/spend_less.jpeg'),
    // Add more celebrities here if needed
];






const HomeScroller = () => {
    const width = Dimensions.get('window').width;
    return (
        <View style={{ flex: 1 }}>
            <Carousel
                autoplay={true}
                loop
                pageHeight={width}
                pageWidth={width}
                itemSpacings={0}

                style={[{
                    flex: 1,
                    backgroundColor: COLORS.primaryLightWhiteGrey,
                    width: width - 40,
                    height: width / 2.3,
                    borderRadius: 20,
                    // marginTop: -2
                }, generalStyles.viewStyles]}
            >
                {
                    data.map((item) => (
                        <Image
                            style={{ width: width - 40, height: width / 2.3, borderRadius: 20 }}
                            source={item}
                            key={item}
                        />
                    ))
                }
            </Carousel>
        </View>
    )
}

export default HomeScroller

