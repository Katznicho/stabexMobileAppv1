import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { generalStyles } from '../screens/utils/generatStyles'
import { COLORS, FONTFAMILY, FONTSIZE } from '../theme/theme'
import { changeNumberToMonth } from '../screens/utils/helpers/helpers'
import { PAYMENT_STATUS } from '../screens/utils/constants/constants'


const TransactionCard: React.FC<{ data: any }> = ({ data}: any) => {

    const createdAtDate = new Date(data.transaction_date);

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
                    <Text style={generalStyles.CardTitle}>{changeNumberToMonth(month)}</Text>
                    <Text style={generalStyles.CardSubtitle}>{day}</Text>
                    <Text style={generalStyles.CardSubtitle}>/{year}</Text>
                </View>
                <View style={[styles.cardContainer]}>
                    <Text style={generalStyles.CardTitle}>{data.transaction_type}</Text>
                    <Text style={[generalStyles.CardSubtitle, { color: COLORS.secondaryDarkGreyHex }]}>{data.comments}</Text>
                    <Text style={[generalStyles.CardSubtitle, { color: COLORS.secondaryDarkGreyHex }]}>{data?.card_number}</Text>
                    <Text style={[generalStyles.CardSubtitle, {
                        fontWeight: "bold",
                        color: data?.transaction_status == PAYMENT_STATUS.FAILED ? COLORS.primaryRedHex :
                            data?.transaction_status == PAYMENT_STATUS.PENDING ? COLORS.primaryGoldHex :
                                COLORS.primaryGreenHex
                    }]}>{data?.transaction_status}</Text>
                </View>
                <View style={[{ alignItems: 'center' }]}>
                    <Text style={generalStyles.CardPriceCurrency}>UGX </Text>
                    <Text style={generalStyles.CardPriceCurrency}> {parseInt(data?.amount)?.toLocaleString()} </Text>
                </View>
            </View>
        </View>
    )
}

export default TransactionCard

const styles = StyleSheet.create({
    cardContainer: {
        flex: 0.7
    }
})