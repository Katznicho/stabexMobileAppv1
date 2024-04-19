import React, { useEffect } from 'react';
import { ScrollView, Dimensions, Text, FlatList, TouchableOpacity, Image, Linking } from 'react-native';
import { generalStyles } from './utils/generatStyles';
import { AppDispatch, RootState } from '../redux/store/dev';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DeviceInfo from 'react-native-device-info';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import useGetUserLocation from '../hooks/useGetUserLocation';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HomeCardCarousel from '../components/HomeCardCarousel';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { usePostQuery } from '../hooks/usePostQuery';
import { storeStations } from '../redux/store/slices/UserSlice';
import { sortStations } from './utils/helpers/helpers';

const { width, height } = Dimensions.get('window');

const cards = [
  {
    name: "Find Stations",
    route: "Stations",
    isBig: false,
    isDisabled: false,
    mode: ['contain', 'cover'],
    arrayImages: [
      require("../assets/app_images/station_finder_one.jpeg"),

    ]
  },
  {
    name: " Stabex Card",
    route: "Card",
    isDisabled: false,
    isBig: false,
    arrayImages: [
      require("../assets/app_images/card_one.jpeg"),
      require("../assets/app_images/stabex_station.jpg")
    ]
  },
  {
    name: "Pay on Site",
    route: "ShortestSiteDistance",
    isDisabled: false,
    isBig: false,
    arrayImages: [
      require("../assets/app_images/stabex_station.jpg"),
      require("../assets/app_images/stabex_station.jpg")
    ]
  },
  {
    name: "Stabex Gas",
    route: "Gas",
    isDisabled: false,
    isBig: false,
    // image: require("../../assets/home/second.jpeg"),
    arrayImages: [
      require("../assets/app_images/gas_one.jpeg"),
    ]
  },
  {
    name: "Lubricants",
    route: "LubricantStack",
    isBig: true,
    isDisabled: false,
    arrayImages: [
      require("../assets/app_images/lubricant_one.jpeg"),
    ]
  },
  {
    name: "Service Bay",
    route: "ServiceBayStack",
    isBig: false,
    isDisabled: false,
    arrayImages: [
      require("../assets/app_images/service_bay.jpeg"),
    ]
  },
  {
    isDisabled: true,
    arrayImages: [
      require("../assets/app_images/advertising_one.jpeg"),
      // require("../assets/app_images/advertising_two.jpeg"),
      require("../assets/app_images/advertising_three.jpeg"),
      require("../assets/app_images/advertising_four.jpeg"),
    ]
  },
  {
    isDisabled: true,
    arrayImages: [
      require('../assets/app_images/cooking_gas.jpeg'),
      require('../assets/app_images/apply_for_card.jpeg'),
      require('../assets/app_images/spend_less.jpeg'),
      require("../assets/app_images/cooking_gas.jpeg")
    ]
  },
]

const HomeScreen = () => {
  const { position } = useGetUserLocation()
  const { isGuest, authToken } = useSelector((state: RootState) => state.user);

  const tabBarHeight = useBottomTabBarHeight();
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<AppDispatch>();

  //fetch stations
  const { data, error, isLoading, refetch } = usePostQuery<any>({
    endpoint: '/api/Stations/StationsList',
    queryOptions: {
        enabled: true,
        refetchInterval: 20000,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
    },
})

useEffect(() => {
  if (data) {
    // const sorted = await sortStations(data?.data, position);
     const sortByDistance = async()=>{
        const sorted =  await sortStations(data?.data, position);
        dispatch(storeStations(sorted));
     }

    sortByDistance();
  }
}, [data, dispatch]);
  //fetch stations



  // User device and push token
  useEffect(() => {
    if (!isGuest) { // Check if the user is not a guest
      (async () => {
        try {
          let deviceId = DeviceInfo.getDeviceId();
          let model = DeviceInfo.getModel();
          const manufacture = await DeviceInfo.getManufacturer();
          let readableVersion = DeviceInfo.getReadableVersion();
          let systemName = DeviceInfo.getSystemName();
          let systemVersion = DeviceInfo.getSystemVersion();
          const userAgent = await DeviceInfo.getUserAgent();
          let type = DeviceInfo.getDeviceType();
          const devicePushToken = "546468dfmklykerkfkrrl";

          if (
            deviceId &&
            model &&
            manufacture &&
            readableVersion &&
            systemName &&
            systemVersion &&
            userAgent &&
            type
          ) {
            saveDeviceInfo(
              devicePushToken,
              deviceId,
              model,
              manufacture,
              readableVersion,
              systemName,
              systemVersion,
              userAgent,
              type,
            );
          }
        } catch (error) {
          console.error('Error fetching device info:', error);
        }
      })();
    }
  }, [isGuest, authToken]); // Include isGuest and authToken as dependencies

  function saveDeviceInfo(
    push_token: string,
    device_id: string,
    device_model: string,
    device_manufacturer: string,
    app_version: string,
    device_os: string,
    device_os_version: string,
    device_user_agent: string,
    device_type: string,
  ) {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Authorization', `Bearer ${authToken}`);

    const body = new FormData();
    body.append('push_token', push_token);
    body.append('device_id', device_id);
    body.append('device_model', device_model);
    body.append('device_manufacturer', device_manufacturer);
    body.append('app_version', app_version);
    body.append('device_os', device_os);
    body.append('device_os_version', device_os_version);
    body.append('device_user_agent', device_user_agent);
    body.append('device_type', device_type);
  }

  return (
    <KeyboardAwareScrollView
      style={[generalStyles.ScreenContainer]}
      keyboardShouldPersistTaps="always"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{ paddingBottom: tabBarHeight + 50 }}
      >

        {/* first section */}
        <View style={[generalStyles.flexStyles, { alignItems: "center", justifyContent: "center", marginVertical: 10 }]}>
          <TouchableOpacity
            style={{ marginLeft: 10, marginRight: 10 }}
            activeOpacity={1}
            onPress={() => Linking.openURL("https://stabexinternational.com/")}
          >
            <HomeCardCarousel
              cards={cards}
              cardIndex={6}
              width={width / 2.2}
              height={height / 2.4}
              carouselHeight={210}
              IconComponent={AntDesign}
              iconName="find"
            />
          </TouchableOpacity>

          <View style={{ marginRight: 10 }}>
            <TouchableOpacity
              style={{ marginBottom: 10 }}
              activeOpacity={1}
              onPress={() => navigation.navigate("Stations")}
            >
              <HomeCardCarousel
                cards={cards}
                cardIndex={0}
                width={width / 2.2}
                height={height / 2.4}
                carouselHeight={100}
              />

            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => navigation.navigate("Card")}
            >
              <HomeCardCarousel
                cards={cards}
                cardIndex={1}
                width={width / 2.2}
                height={height / 2.4}
                carouselHeight={100}
              />

            </TouchableOpacity>
          </View>
        </View>
        {/* first section */}

        {/* second section */}
        <View style={[generalStyles.flexStyles, { alignItems: "center", justifyContent: "center", marginVertical: 10 }]}>
          <TouchableOpacity
            style={{ marginLeft: 0, marginRight: 10 }}
            activeOpacity={1}
            onPress={() => navigation.navigate("ShortestSiteDistance")}
          >
            <HomeCardCarousel
              cards={cards}
              cardIndex={2}
              width={width / 2.2}
              height={height / 2.4}
              carouselHeight={100}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate("Gas")}
          >
            <HomeCardCarousel
              cards={cards}
              cardIndex={3}
              width={width / 2.2}
              height={height / 2.4}
              carouselHeight={100}
            />
          </TouchableOpacity>
        </View>
        {/* second section */}

        {/* third section */}
        <View style={[generalStyles.flexStyles, { alignItems: "center", justifyContent: "center", marginVertical: 10 }]}>
          <TouchableOpacity
            style={{ marginLeft: 0, marginRight: 10 }}
            activeOpacity={1}
            onPress={() => navigation.navigate("LubricantStack")}
          >
            <HomeCardCarousel
              cards={cards}
              cardIndex={4}
              width={width / 2.2}
              height={height / 2.4}
              carouselHeight={100}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate("ServiceStack")}
          >
            <HomeCardCarousel
              cards={cards}
              cardIndex={5}
              width={width / 2.2}
              height={height / 2.4}
              carouselHeight={100}
            />
          </TouchableOpacity>
        </View>
        {/* third section */}

        {/* Home scroller */}
        <Text style={[generalStyles.CardTitle, { marginHorizontal: 20 }]}>For You</Text>

        {/* <HomeScroller /> */}
        <TouchableOpacity
          style={{ marginLeft: 10, marginRight: 10 }}
          activeOpacity={1}
        >
          <HomeCardCarousel
            cards={cards}
            cardIndex={7}
            width={width - 20}
            height={height / 1.5}
            carouselHeight={180}
          />
        </TouchableOpacity>
        {/* Home Scroller */}

      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

export default HomeScreen;
