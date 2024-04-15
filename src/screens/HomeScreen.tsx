import React, { useEffect } from 'react';
import { ScrollView, Dimensions,  Text } from 'react-native';
import { generalStyles } from './utils/generatStyles';
import { RootState } from '../redux/store/dev';
import { useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import HomeCards from '../components/HomeCards';
import DeviceInfo from 'react-native-device-info';
// import { SAVE_DEVICE_INFO } from './utils/constants/routes';
import HomeScroller from '../components/HomeScroller';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

const width = Dimensions.get('window').width;

const HomeScreen = () => {
  const { isGuest, authToken } = useSelector((state: RootState) => state.user);

  const tabBarHeight = useBottomTabBarHeight();



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

    // fetch(`${SAVE_DEVICE_INFO}`, {
    //   headers,
    //   method: 'POST',
    //   body,
    // })
    //   .then(response => response.json())
    //   .then(result => {

    //   })
    //   .catch(error => {

    //   });
  }

  return (
    <KeyboardAwareScrollView
      style={[generalStyles.ScreenContainer]}
      keyboardShouldPersistTaps="always"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{ paddingBottom: tabBarHeight }}
      >
        {/* Home cards */}
        <HomeCards />
        {/* Home scroller */}
        <Text style={[generalStyles.CardTitle, { marginHorizontal: 20 }]}>For You</Text>
        <HomeScroller />
        {/* Home Scroller */}
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

export default HomeScreen;
