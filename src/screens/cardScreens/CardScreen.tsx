import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { generalStyles } from '../utils/generatStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import UserWallet from '../../components/UserWallet';
import { COLORS, FONTFAMILY, FONTSIZE } from '../../theme/theme';
import QuickActions from '../../components/QuickActions';
import TransactionCard from '../../components/TransactionCard';
import TopUpModal from '../../components/Modals/TopUpModal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation, useRoute } from '@react-navigation/native';
import CardBackGroundImage from '../../components/CardBackGroundImage';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/dev';
import { useApi } from '../../hooks/useApi';



const CardScreen: React.FC = () => {
    const tabBarHeight = useBottomTabBarHeight();

    const { card } = useRoute<any>().params

    const [openTopUpModal, setOpenTopUpModal] = React.useState<boolean>(false);

    const navigation = useNavigation<any>();
    const { user } = useSelector((state: RootState) => state.user);



    const { data, error, isLoading, refetch } = useApi<any>({
        endpoint: '/getUserPayments',
        params: {
            "account": "hasWalletAccount"
        },
        queryOptions: {
            enabled: true,
            refetchInterval: 2000,
            refetchOnWindowFocus: true,
            refetchOnMount: true,
        },
    });





    const onSelectTopUp = () => {
        return navigation.navigate('CardTopUP', { card })
    }


    return (
        <KeyboardAwareScrollView
            style={[{ flex: 1, width: '100%' }, generalStyles.ScreenContainer]}
            keyboardShouldPersistTaps="always"
            contentContainerStyle={{ paddingBottom: tabBarHeight }}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: tabBarHeight }}
                keyboardShouldPersistTaps="always"
            >
                {/* user wallet */}
                <UserWallet
                    card={card}
                    openPicker={openTopUpModal}
                    setOpenPicker={setOpenTopUpModal}

                />
                {/* user wallet */}

                {/* card image */}
                <CardBackGroundImage
                    card={card}
                />
                {/* card image */}

                {/* quick actions */}

                <QuickActions
                    onSelectTopUp={onSelectTopUp}
                />

                {/* quick actions */}

                {/* last 5 transactions */}
                <View style={[generalStyles.flexStyles, { alignItems: 'center', justifyContent: 'space-between' }]}>
                    <View style={[generalStyles.viewStyles]}>
                        <Text style={[styles.CardTitle, { fontSize: 22 }]}>Transactions</Text>
                    </View>

                    <TouchableOpacity style={[generalStyles.viewStyles]}>
                        <AntDesign
                            name="arrowright"
                            size={25}
                            color={COLORS.primaryGreenHex}
                            onPress={() => navigation.navigate("CardTransactions", { card })}
                        />

                    </TouchableOpacity>

                </View>

                <View style={[generalStyles.viewStyles]}>
                    {
                        data?.data?.data != null && data?.data?.data?.length > 0 ? data?.data?.data?.slice(0, 10).map((item: any, index: number) => {
                            return <TransactionCard
                                key={index}
                                data={item}
                                cardDetails={card?.card}
                            />
                        }) : <View style={[generalStyles.centerContent]}>
                            <Text style={[generalStyles.CardPriceCurrency]}>
                                {isLoading ? "loading.." : "No Transactions"}
                            </Text>
                        </View>
                    }
                </View>

                {/* last 5 transactions */}

                {/* top up modal */}
                <TopUpModal
                    openPicker={openTopUpModal}
                    setOpenPicker={setOpenTopUpModal}
                    card={card}
                />
                {/* top up modal */}

            </ScrollView>
        </KeyboardAwareScrollView>
    )
}

export default CardScreen

const styles = StyleSheet.create({
    CardTitle: {
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_16,
    },
    viewStyles: {
        marginHorizontal: 20,
        marginVertical: 10
    },
    buttonStyles: {
        width: 150,
        marginTop: 10,
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 10
    },

})