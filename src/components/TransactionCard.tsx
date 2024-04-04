import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { generalStyles } from '../screens/utils/generatStyles'
import { COLORS, FONTFAMILY, FONTSIZE } from '../theme/theme'
import { changeNumberToMonth } from '../screens/utils/helpers/helpers'
import { PAYMENT_STATUS } from '../screens/utils/constants/constants'


const TransactionCard: React.FC<{ data: any, cardDetails: any }> = ({ data, cardDetails }: any) => {

    const createdAtDate = new Date(data.created_at);

    // Extract year, month, day, hour, and minutes
    const year = createdAtDate.getFullYear();
    const month = createdAtDate.getMonth() + 1; // Month is zero-based, so we add 1
    const day = createdAtDate.getDate();
    const hour = createdAtDate.getHours();
    const minutes = createdAtDate.getMinutes();


    return (
        <View style={{ elevation: 2, backgroundColor: COLORS.primaryBlackHex, marginVertical: 5, marginHorizontal: 1, borderRadius: 10, padding: 5 }}>
            <View style={[generalStyles.flexStyles, { justifyContent: 'space-between' }]}>
                <View>
                    <Text style={styles.CardTitle}>{changeNumberToMonth(month)}</Text>
                    <Text style={styles.CardSubtitle}>{day}</Text>
                    <Text style={styles.CardSubtitle}>/{year}</Text>
                </View>
                <View style={[styles.cardContainer]}>
                    <Text style={styles.CardTitle}>{data.transaction_type}</Text>
                    <Text style={[styles.CardSubtitle, { color: COLORS.secondaryDarkGreyHex }]}>{data.payment_method}</Text>
                    <Text style={[styles.CardSubtitle, { color: COLORS.secondaryDarkGreyHex }]}>{cardDetails?.card_number}</Text>
                    <Text style={[styles.CardSubtitle, {
                        fontWeight: "bold",
                        color: data?.transaction_status == PAYMENT_STATUS.FAILED ? COLORS.primaryRedHex :
                            data?.transaction_status == PAYMENT_STATUS.PENDING ? COLORS.primaryGoldHex :
                                COLORS.primaryGreenHex
                    }]}>{data?.transaction_status}</Text>
                </View>
                <View style={[{ alignItems: 'center' }]}>
                    <Text style={styles.CardPriceCurrency}>UGX </Text>
                    <Text style={styles.CardPriceCurrency}> {parseInt(data.amount)?.toLocaleString()} </Text>
                </View>
            </View>
        </View>
    )
}

export default TransactionCard

const styles = StyleSheet.create({
    cardContainer: {
        flex: 0.7
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
    CardPriceCurrency: {
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryOrangeHex,
        fontSize: FONTSIZE.size_12,
    },
})