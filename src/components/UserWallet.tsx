import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, FONTFAMILY, SPACING } from '../theme/theme'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { generalStyles } from '../screens/utils/generatStyles';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/dev';
import { useApi } from '../hooks/useApi';



const UserWallet = ({ card }: any) => {

    const { user } = useSelector((state: RootState) => state.user);
    const [showEye, setShowEye] = useState<boolean>(true);

    //get current balance 
    //get current balance
    //getCurrentCustomerCardBalance



    const { data, error, isLoading, refetch } = useApi<any>({
        endpoint: `/getCurrentCustomerCardBalance`,
        params: {
            "card_id": card?.card?.id
        },
        queryOptions: {
            enabled: card ? true : false,
            refetchInterval: 2000,
            refetchOnWindowFocus: true,
            refetchOnMount: true,
        },
    });





    return (
        <View>

            <View
                style={{
                    // marginVertical: 10,
                    // marginHorizontal: 15,
                    elevation: 5,
                    // borderRadius: 10,
                    paddingBottom: 5,
                    backgroundColor: COLORS.primaryOrangeHex,
                }}
            >
                <View style={[generalStyles.flexStyles, { alignItems: "center", justifyContent: "center", marginHorizontal: 5 }]}>
                    <View style={[generalStyles.flexStyles, { alignItems: "center", justifyContent: "center" }]}>
                        <Text style={[styles.avaialableText]}>
                            {`Available Balance`}
                        </Text>
                        <MaterialCommunityIcons
                            name={showEye ? 'eye-off' : 'eye'}
                            size={24}
                            color={COLORS.primaryBlackHex}
                            // style={styles.icon}
                            onPress={() => setShowEye(!showEye)}
                        />

                    </View>

                </View>


                <View style={[generalStyles.flexStyles, { alignItems: "center", justifyContent: "center", marginHorizontal: 10 }]}>
                    <View>
                        <Text >
                            <Text style={[styles.avaialableText, { fontWeight: "bold" }]}>UGX   </Text>
                            <Text style={[styles.avaialableText, { fontFamily: FONTFAMILY.poppins_bold, fontSize: 20, }]}>
                                {`${showEye ? parseInt(data?.data)?.toLocaleString() : "****"}`}</Text>

                        </Text>

                    </View>

                </View>


            </View>
        </View>
    )
}


export default UserWallet

const styles = StyleSheet.create({
    avaialableText: {
        fontSize: 12,
        marginVertical: 10,
        fontFamily: FONTFAMILY.poppins_light,
        color: COLORS.primaryBlackHex,
        paddingHorizontal: SPACING.space_10,
    },
    viewStyles: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
})