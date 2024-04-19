import { StyleSheet, SafeAreaView, TouchableOpacity, View, Text, ImageBackground, Dimensions, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { generalStyles } from '../utils/generatStyles'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../../theme/theme'
import { useNavigation } from '@react-navigation/native'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import LinkCardModal from '../../components/Modals/LinkCardModal'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useApi } from '../../hooks/useApi'
import { ActivityIndicator } from '../../components/ActivityIndicator'
import { useDispatch, useSelector } from 'react-redux'
import { storedLinkedCard } from '../../redux/store/slices/UserSlice'
import { RootState } from '../../redux/store/dev'


const { width, height } = Dimensions.get('screen');

const Index = () => {

    const dispatch = useDispatch<any>();

    const { linkedCard } = useSelector((state: RootState) => state.user);

    const navigation = useNavigation<any>();
    const { data, error, isLoading, refetch } = useApi<any>({
        endpoint: '/customerLinkedCards',
        params: {
            "account": "hasWalletAccount"
        },
        queryOptions: {
            enabled: true,
            refetchInterval: false,
            refetchOnWindowFocus: true,
            refetchOnMount: true,
        },
    });

    const tabBarHeight = useBottomTabBarHeight();
    const [openPicker, setOpenPicker] = useState<boolean>(false);

    useEffect(() => {
        if (linkedCard) {
            navigation.navigate('CardDetails', { card: linkedCard });
            return

        }
        if (error) {
            return;
        }

        if (isLoading) {
            return;
        }

        if (data && data.response === 'success') {
            
            dispatch(storedLinkedCard(data.data));
            navigation.navigate('CardDetails', { card: data?.data });
        }
    }, [data, error, isLoading, navigation]);

    if (isLoading) {
        return (
            <SafeAreaView style={[{ flex: 1, width: '100%' }, generalStyles.ScreenContainer]}>
                <ActivityIndicator />
            </SafeAreaView>
        );
    }






    return (
        <KeyboardAwareScrollView
            style={[{ flex: 1, width: '100%' }, generalStyles.ScreenContainer]}
            keyboardShouldPersistTaps="always"
        >

            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    generalStyles.centerContent,
                    styles.viewStyles,
                    {
                        paddingBottom: tabBarHeight
                    }
                ]}

            >

                {/* <EmptyContainer
                            title={'You dont have any linked cards'}
                        /> */}
                <ImageBackground
                    source={require("../../assets/app_images/card_image.jpeg")}
                    style={{
                        width: width - 20,
                        height: height / 2,
                        borderRadius: 10
                    }}
                >
                </ImageBackground>
                <View style={[generalStyles.resideViews, generalStyles.centerContent, generalStyles.viewStyles, { marginVertical: 25 }]}>
                    <Text style={[generalStyles.CardTitle, { fontSize: FONTSIZE.size_18 }]}>
                        Get access to more with Stabex Card.
                    </Text>
                </View>



                <View style={[generalStyles.flexStyles, { alignItems: 'center', justifyContent: "center" }]}>

                    <TouchableOpacity
                        activeOpacity={1}
                        style={[generalStyles.loginContainer, styles.buttonStyles]}
                        onPress={() => setOpenPicker(true)}
                    >
                        <Text style={[generalStyles.loginText, { fontSize: FONTSIZE.size_18 }, generalStyles.centerContent]}>{'Link Card'}</Text>
                    </TouchableOpacity>

                    <View style={[generalStyles.centerContent, styles.viewStyles]} >
                        <Text style={[generalStyles.CardTitle]}>OR</Text>
                    </View>

                    <TouchableOpacity
                        activeOpacity={1}
                        style={[generalStyles.loginContainer, styles.buttonStyles]}
                        onPress={() => navigation.navigate('ApplyForCard')}
                    >
                        <Text style={[generalStyles.loginText, { fontSize: FONTSIZE.size_18,}, generalStyles.centerContent]}>{'Apply'}</Text>
                    </TouchableOpacity>

                </View>
                <LinkCardModal
                    openPicker={openPicker}
                    setOpenPicker={setOpenPicker}
                />

            </ScrollView>

        </KeyboardAwareScrollView>
    )

}



export default Index

const styles = StyleSheet.create({
    ScreenTitle: {
        fontSize: FONTSIZE.size_28,
        fontFamily: FONTFAMILY.Lovato_Bold,
        color: COLORS.primaryBlackHex,
        paddingLeft: SPACING.space_30,
    },
    buttonCardStyles: {
        width: "40%",
        marginHorizontal: 20,
        backgroundColor: COLORS.primaryBlackHex,
    },
    formInput: {
        color: COLORS.primaryWhiteHex,
        fontSize: 15,
        borderWidth: 0.4,
        borderColor: COLORS.primaryLightGreyHex,
        borderRadius: 10,
    },
    viewStyles: {
        marginHorizontal: 10,
        marginVertical: 10
    },
    buttonStyles: {
        // width: 100,
        width: "40%",
        marginTop: 10,
        height: 50,
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 10
    },
})