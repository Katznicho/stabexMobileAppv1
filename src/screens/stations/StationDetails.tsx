import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, Linking } from 'react-native'
import React from 'react'
import { generalStyles } from '../utils/generatStyles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation, useRoute } from '@react-navigation/native'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../../theme/theme'
import GradientBGIcon from '../../components/GradientBGIcon'
import { calculateDistance } from '../utils/helpers/helpers'


const StationDetails = () => {

  const navigation = useNavigation<any>();

  const { data, position } = useRoute<any>().params;



  const openMapsForDirections = () => {
    const destination = `${data?.latitude},${data?.longitude}`;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
    return Linking.openURL(url);
  };

  return (
    <KeyboardAwareScrollView
      style={[{ flex: 1, width: '100%' }, generalStyles.ScreenContainer]}
      keyboardShouldPersistTaps="always"
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        // contentContainerStyle={{ paddingBottom: tabBarHeight }}
        keyboardShouldPersistTaps="always"
      >
        {/* show background image */}
        <ImageBackground
          source={require("../../assets/app_images/stabex_station.jpg")}
          style={styles.ItemBackgroundImage}
        >
          {/* back handler */}
          <View style={styles.ImageHeaderBarContainerWithBack}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                navigation.goBack()
              }}>
              <GradientBGIcon
                name="left"
                color={COLORS.primaryOrangeHex}
                size={FONTSIZE.size_16}
              />
            </TouchableOpacity>


          </View>

          {/* back handler */}

          {/* more details */}

          {/* more details */}
        </ImageBackground>
        {/* show background */}
        <View style={styles.cardContainer}>
          <TouchableOpacity
            activeOpacity={1}
            style={[generalStyles.loginContainer, {
              marginTop: 5,
            }]}
            onPress={() => openMapsForDirections()}
          >
            <Text style={generalStyles.loginText}>{'Take me there'}</Text>
          </TouchableOpacity>

          <View style={[generalStyles.bottomHairline, styles.hairLineStyles]} />
          <View style={[generalStyles.flexStyles, { justifyContent: 'space-between', alignItems: "center" }]}>
            <View>
              <Text style={styles.CardTitle} >Name</Text>
              <Text style={styles.CardSubtitle}>{data?.station_name }</Text>
            </View>
            <View>
              <Text style={styles.CardTitle} >Distance</Text>
              <Text style={styles.CardSubtitle}>
                {calculateDistance(position?.latitude, position?.longitude, parseFloat(data?.latitude), parseFloat(data?.longitude))} kms away
              </Text>
            </View>

          </View>

        </View>
        {/* {renderMap()} */}

      </ScrollView>

    </KeyboardAwareScrollView>
  )
}

export default StationDetails

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.primaryBlackHex,
    borderRadius: 10,
    padding: 10,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
    margin: 5,
    // marginHorizontal: 5
  },
  hairLineStyles: {
    width: "80%",
    marginVertical: 10
  },
  CardTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_14,
  },
  CardSubtitle: {
    fontFamily: FONTFAMILY.poppins_light,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_10,
    // marginHorizontal: SPACING.space_10
  },
  ImageHeaderBarContainerWithBack: {
    padding: SPACING.space_30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ItemBackgroundImage: {
    width: '100%',
    aspectRatio: 25 / 15,
    justifyContent: 'space-between',
  },
  // Add a style for the map
  map: {
    height: 300,
    marginVertical: 10,
  },
})