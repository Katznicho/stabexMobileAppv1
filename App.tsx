import React, { useEffect, useState, useRef} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import Base from './src/screens/Base';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { persistor, store } from './src/redux/store/dev';
import { PersistGate } from 'redux-persist/integration/react';
import FlashMessage from 'react-native-flash-message';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Platform, StatusBar } from 'react-native';
import { COLORS } from './src/theme/theme';
import NetInfo from '@react-native-community/netinfo';
import NoInternet from './src/screens/NoInternet';
import LottieView from "lottie-react-native";
import { Animated, Easing } from "react-native";

const Stack = createNativeStackNavigator();
const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

const App = () => {

  const [connected, setIsConnected] = useState<boolean | null>(false);
  const [showSplash, setShowSplash] = useState<boolean>(true); 

  const animationProgress = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animationProgress.current, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, []);


  const checkInternet = () => {
    NetInfo.addEventListener((state: { isConnected: boolean | ((prevState: boolean | null) => boolean | null) | null; }) => {
      return setIsConnected(state?.isConnected);
    });
  };

  useEffect(() => { }, [connected]);
  useEffect(() => {
    if(Platform.OS === 'android') {
      SplashScreen.hide();
    }
    //  SplashScreen.hide();
  }, []);

  //  const hanldeAnimatedSplashScreen = () => {
  //    //hide after 1 second
  //     setTimeout(() => setShowSplash(false), 1000);
  //  }

  //hide after 1 second
  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 10000);

  }, []);

   return showSplash ? (
    <AnimatedLottieView
      source={require("./src/assets/splash/stabex_splash.json")}
      progress={animationProgress.current}
      style={{width: "100%", height: "100%"}}
    />
) : !connected ? (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <QueryClientProvider client={new QueryClient()}>
                    <StatusBar backgroundColor={COLORS.primaryOrangeHex} />
                    <Base />
                </QueryClientProvider>
                <FlashMessage position="top" animated />

            </PersistGate>
        </Provider>
    </GestureHandlerRootView>
) : (
    <NoInternet checkInternet={checkInternet} />
)
};

export default App;
