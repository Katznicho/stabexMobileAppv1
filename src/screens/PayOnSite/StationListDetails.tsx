import { StyleSheet, Text, View, ScrollView, ImageBackground, TouchableOpacity } from 'react-native'
import React , {useEffect, useState} from 'react';
import { generalStyles } from '../utils/generatStyles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation, useRoute } from '@react-navigation/native'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../../theme/theme'
import GradientBGIcon from '../../components/GradientBGIcon'
import { calculateDistance } from '../utils/helpers/helpers'
import SitePay from '../../components/Modals/SitePay';
import { GET_PRODUCT_CATEGORIES, PAYMENT_METHODS } from '../utils/constants/routes';
import { RootState } from '../../redux/store/dev';
import { useSelector } from 'react-redux';
import { Checkbox } from 'react-native-ui-lib';

const StationListDetails = () => {

    const navigation = useNavigation<any>();

    const { data, position } = useRoute<any>().params;
    const { authToken } = useSelector((state: RootState) => state.user);

    const [openTopUpModal, setOpenTopUpModal] = React.useState<boolean>(true);
    const [products, setProducts] = useState<any>([]);
    const [paymentMethods , setPaymentMethods]=  useState<any>([]);

    useEffect(() => {
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append("Content-Type", "application/json");
        headers.append('Authorization', `Bearer ${authToken}`);
    
        fetch(GET_PRODUCT_CATEGORIES, {
          method: 'POST',
          headers
        })
          .then((response) => response.json())
          .then((result) => {
            setProducts(result?.data)
          })
          .catch((err) => {
            console.log(err)
          })
    
          fetch(PAYMENT_METHODS, {
            method: 'POST',
            headers
          })
          .then((response) => response.json())
          .then((result) => {
            setPaymentMethods(result?.data)
          })
          .catch((err) => {
            console.log(err)
          })
    
      
      }, [])


  
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


          {/* more details */}
        </ImageBackground>
        {/* show background */}
        <View style={styles.cardContainer}>
          <View style={[generalStyles.bottomHairline, styles.hairLineStyles]} />
          <View style={[generalStyles.flexStyles, { justifyContent: 'space-between', alignItems: "center" }]}>
            <View>
              <Text style={[generalStyles.CardTitle, {color:COLORS.primaryBlackRGBA}]} >Station Name</Text>
              <Text style={[generalStyles.CardSubtitle, {fontSize:20}]}>{data?.station_name}</Text>
            </View>
            <View>
              <Text style={[generalStyles.CardTitle, {color:COLORS.primaryBlackRGBA}]} >Distance</Text>
              <Text style={[generalStyles.CardSubtitle, {fontSize:15}]}>
                {calculateDistance(position?.latitude, position?.longitude, parseFloat(data?.latitude), parseFloat(data?.longitude))} km(s) away
              </Text>
            </View>

          </View>
     
          <TouchableOpacity
            activeOpacity={1}
            style={[generalStyles.loginContainer, {
              marginTop: 15,
            }]}
            // onPress={() => openMapsForDirections()}
            onPress={() => setOpenTopUpModal(true)}
          >
            <Text style={generalStyles.loginText}>{'Pay Now'}</Text>
          </TouchableOpacity>

        </View>

        <View style={[generalStyles.bottomHairline, styles.hairLineStyles]} />
        {/* products  */}
        <View>

          <Text style={[generalStyles.authTitle, { fontSize: 18, color: COLORS.primaryBlackRGBA }]}>
            Products
          </Text>
          <View style={styles.formContainer}>
            <View style={styles.columnContainer}>
              {
                products
                  ? products.slice(0, Math.ceil(products.length / 2)).map((item: any) => (
                    <Checkbox
                      key={item?.Id}
                      label={item?.category_name}
                      value={true} // Assuming you have a property named "products" in your state
                      color={COLORS.primaryOrangeHex}
                      containerStyle={generalStyles.viewStyles}
                      labelStyle={styles.labelStyles}
                    />
                  ))
                  : null
              }
            </View>
            <View style={styles.columnContainer}>
              {
                products
                  ? products.slice(Math.ceil(products.length / 2)).map((item: any) => (
                    <Checkbox
                      key={item?.Id}
                      label={item?.category_name}
                      value={true} // Assuming you have a property named "products" in your state
                      color={COLORS.primaryOrangeHex}
                      containerStyle={generalStyles.viewStyles}
                      labelStyle={styles.labelStyles}
                    />
                  ))
                  : null
              }
            </View>
          </View>
        </View>

        {/* products */}

         {/* Accepted Methods */}
         <View>

          <Text style={[generalStyles.authTitle, { fontSize: 18, color: COLORS.primaryBlackRGBA }]}>
            We Accept
          </Text>
          <View style={styles.formContainer}>
            <View style={styles.columnContainer}>
              {
                paymentMethods
                  ? paymentMethods.slice(0, Math.ceil(products.length / 2)).map((item: any) => (
                    <Checkbox
                      key={item?.Id}
                      label={item?.description}
                      value={true} // Assuming you have a property named "products" in your state
                      color={COLORS.primaryOrangeHex}
                      containerStyle={generalStyles.viewStyles}
                      labelStyle={styles.labelStyles}
                    />
                  ))
                  : null
              }
            </View>
            <View style={styles.columnContainer}>
              {
                paymentMethods
                  ? paymentMethods.slice(Math.ceil(products.length / 2)).map((item: any) => (
                    <Checkbox
                      key={item?.Id}
                      label={item?.description}
                      value={true} // Assuming you have a property named "products" in your state
                      color={COLORS.primaryOrangeHex}
                      containerStyle={generalStyles.viewStyles}
                      labelStyle={styles.labelStyles}
                    />
                  ))
                  : null
              }
            </View>
          </View>
        </View>
         {/* Accepted Methods */}

      </ScrollView>

            {/* top up modal */}
            <SitePay
                openPicker={openTopUpModal}
                setOpenPicker={setOpenTopUpModal}
                station={data}

            />
            {/* top up modal */}

        </KeyboardAwareScrollView>
    )
}

export default StationListDetails

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
        // marginHorizontal: 40,
        marginVertical: 10
    },
    CardTitle: {
        fontFamily: FONTFAMILY.Lovato_Regular,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_14,
    },
    CardSubtitle: {
        fontFamily: FONTFAMILY.Lovato_Light,
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
    formContainer: {
        flexDirection: 'row', // This will make the columns side by side
        justifyContent: 'space-between', // Adjust as needed
      },
      // Add a style for the map
      map: {
        height: 300,
        marginVertical: 10,
      },
      columnContainer: {
        flex: 1, // This will make both columns take equal width
      },
      labelStyles: {
        fontFamily: FONTFAMILY.Lovato_Demi, color: COLORS.primaryWhiteHex
      }

})