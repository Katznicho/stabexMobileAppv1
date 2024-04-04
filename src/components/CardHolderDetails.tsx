import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../theme/theme'
import { generalStyles } from '../screens/utils/generatStyles'

const CardHolderDetails = () => {
    return (
        <View style={styles.cardContainer}>
            <View>
                <Text style={[generalStyles.CardSubtitle]}>CARD HOLDER NAME</Text>
                <Text style={[generalStyles.CardTitle]}>KATENDE NICHOLAS</Text>
            </View>
            <View>
                <Text style={[generalStyles.CardSubtitle]}>CARD NUMBER</Text>
                <Text style={[generalStyles.CardTitle]}>650072128</Text>
            </View>

            <View>
                <Text style={[generalStyles.CardSubtitle]}>AMOUNT</Text>
                <Text style={[generalStyles.CardTitle]}>UGX 1,000</Text>
            </View>
        </View>
    )
}

export default CardHolderDetails

const styles = StyleSheet.create({
    cardContainer: {
        // flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: COLORS.primaryBlackHex,
        elevation: 5,
        borderRadius: 10,
        // borderWidth: 0.5,
        // borderColor: COLORS.secondaryLightGreyHex
    }
})